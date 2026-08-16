/* ==========================================================================
   HAHNE DIGITAL – Serverseitiger Formularversand
   --------------------------------------------------------------------------
   Cloudflare-Pages-Function (Workers-Runtime): POST /api/contact

   Diese Datei wird NICHT automatisch aktiv. Sie greift erst, wenn:
     1. die Website über Cloudflare Pages ausgeliefert wird (statt reinem
        FTP/SFTP-Hosting – siehe README, Abschnitt "Kontaktformular"),
     2. die unten genannten Umgebungsvariablen im Cloudflare-Projekt gesetzt
        sind (Dashboard -> Settings -> Environment variables; NIEMALS im
        Repository speichern),
     3. in assets/site-config.js unter "formEndpoint" der Wert "/api/contact"
        eingetragen ist.

   Erforderliche Umgebungsvariablen:
     RESEND_API_KEY   API-Schlüssel eines Transaktions-E-Mail-Dienstes
                      (Beispiel: resend.com; jeder andere Dienst mit
                      HTTP-API lässt sich analog anbinden)
     CONTACT_TO       Empfängeradresse, z. B. service@hd-hahne.de
     CONTACT_FROM     Absenderadresse, muss beim E-Mail-Dienst als eigene
                      Domain verifiziert sein, z. B. formular@hd-hahne.de

   Optionale Umgebungsvariable / Bindung:
     RATE_LIMIT_KV    KV-Namespace-Bindung für die Rate-Begrenzung. Ohne
                      diese Bindung läuft die Funktion weiter, aber ohne
                      serverseitige Rate-Begrenzung.

   Schutzmaßnahmen in dieser Datei:
     · Serverseitige Pflichtfeldprüfung (Name, E-Mail, Nachricht, Zustimmung)
       – das Frontend prüft zusätzlich, ersetzt die Serverprüfung aber nicht,
       da Formulardaten auch ohne Browser gesendet werden können.
     · Serverseitige Honeypot-Prüfung (Feld "website" muss leer sein).
     · Rate-Begrenzung je IP-Adresse (Standard: 5 Anfragen pro Stunde).
     · Keine Zugangsdaten im Code – ausschließlich über Umgebungsvariablen.
   ========================================================================== */

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_SECONDS = 3600;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ ok: false, error: "Ungültige Anfrage." }, 400);
  }

  // Honeypot: dieses Feld darf niemals ausgefüllt sein. Stiller Erfolg,
  // damit automatisierte Absender keine Rückmeldung über die Erkennung erhalten.
  if (body.website) return json({ ok: true });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const telefon = String(body.telefon || "").trim().slice(0, 40);
  const projektart = String(body.projektart || "").trim().slice(0, 80);
  const nachricht = String(body.nachricht || "").trim();
  const consent = body.consent === true;

  const fehler = [];
  if (name.length < 2 || name.length > 200) fehler.push("Name oder Firma fehlt oder ist ungültig.");
  if (!isValidEmail(email) || email.length > 200) fehler.push("E-Mail-Adresse ist ungültig.");
  if (nachricht.length < 15 || nachricht.length > 5000) fehler.push("Nachricht ist zu kurz oder zu lang.");
  if (!consent) fehler.push("Zustimmung zur Verarbeitung fehlt.");
  if (fehler.length) return json({ ok: false, error: fehler.join(" ") }, 422);

  // Rate-Begrenzung je IP-Adresse (nur aktiv, wenn ein KV-Namespace gebunden ist)
  if (env.RATE_LIMIT_KV) {
    const ip = request.headers.get("CF-Connecting-IP") || "unbekannt";
    const key = "rl:" + ip;
    const bisher = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
    if (bisher >= MAX_REQUESTS_PER_WINDOW) {
      return json({ ok: false, error: "Zu viele Anfragen von Ihrer Adresse. Bitte versuchen Sie es später erneut oder schreiben Sie direkt eine E-Mail." }, 429);
    }
    await env.RATE_LIMIT_KV.put(key, String(bisher + 1), { expirationTtl: WINDOW_SECONDS });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    // Bewusst kein Erfolg vortäuschen: fehlt die Konfiguration, ist das ein Serverfehler.
    return json({ ok: false, error: "Der Formularversand ist serverseitig noch nicht vollständig eingerichtet." }, 500);
  }

  const betreff = "Projektanfrage – " + (projektart || "Website");
  const text =
    "Name/Firma: " + name + "\n" +
    "E-Mail: " + email + "\n" +
    (telefon ? "Telefon: " + telefon + "\n" : "") +
    "Projektart: " + projektart + "\n\n" +
    nachricht;
  const html =
    "<p><b>Name/Firma:</b> " + escapeHtml(name) + "</p>" +
    "<p><b>E-Mail:</b> " + escapeHtml(email) + "</p>" +
    (telefon ? "<p><b>Telefon:</b> " + escapeHtml(telefon) + "</p>" : "") +
    "<p><b>Projektart:</b> " + escapeHtml(projektart) + "</p>" +
    '<p style="white-space:pre-wrap">' + escapeHtml(nachricht) + "</p>";

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO,
        reply_to: email,
        subject: betreff,
        text: text,
        html: html
      })
    });
    if (!resp.ok) return json({ ok: false, error: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es erneut." }, 502);
  } catch (e) {
    return json({ ok: false, error: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es erneut." }, 502);
  }

  return json({ ok: true });
}

export async function onRequestGet() {
  return json({ ok: false, error: "Methode nicht erlaubt." }, 405);
}
