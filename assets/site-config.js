/* ==========================================================================
   HAHNE DIGITAL – Zentrale Konfiguration
   --------------------------------------------------------------------------
   NUR DIESE DATEI MUSS AUSGEFÜLLT WERDEN.
   Alle Angaben werden automatisch in Website, Impressum und Datenschutz-
   erklärung eingesetzt. Werte in [eckigen Klammern] sind Platzhalter und
   müssen vor dem Livegang ersetzt werden.
   ========================================================================== */

window.SITE = {

  /* --- Firma & Inhaber ----------------------------------------------------
     Bei zwei Betreibern ist die Rechtsform in der Regel eine Gesellschaft
     bürgerlichen Rechts (GbR). Falls stattdessen ein Einzelunternehmen mit
     nur einem Inhaber besteht, hier anpassen.
  ------------------------------------------------------------------------- */
  firma:        "Hahne Digital",
  inhaber:      "Björn Hahne & Malte Hahne",
  vertretung:   "Björn Hahne, Malte Hahne",
  rechtsform:   "Gesellschaft bürgerlichen Rechts (GbR)",

  /* --- Anschrift (ladungsfähig, kein Postfach) ---------------------------- */
  strasse:      "Schiffbrücke 5",
  plz:          "24340",
  ort:          "Eckernförde",
  land:         "Deutschland",

  /* --- Kontakt ------------------------------------------------------------ */
  telefon:      "0176 20204188",
  email:        "service@hd-hahne.de",
  domain:       "www.hd-hahne.de",

  /* --- Steuer / Register --------------------------------------------------
     ustId:  USt-IdNr. nach §27a UStG. Wenn keine vorhanden ist, hier "" ein-
             tragen – dann wird stattdessen die Steuernummer-Zeile angezeigt.
     kleinunternehmer: true = Hinweis nach §19 UStG (keine USt. ausgewiesen)
  ------------------------------------------------------------------------- */
  ustId:            "[USt-IdNr., z. B. DE123456789]",
  steuernummer:     "[Steuernummer]",
  kleinunternehmer: false,

  /* --- Hosting-Anbieter (für die Datenschutzerklärung) -------------------- */
  hoster:       "[Name des Hosting-Anbieters]",
  hosterAdresse:"[Anschrift des Hosting-Anbieters]",
  hosterAvv:    true,   // Auftragsverarbeitungsvertrag (AVV) abgeschlossen?

  /* --- Kontaktformular ----------------------------------------------------
     formEndpoint leer lassen = Anfrage wird im E-Mail-Programm des Besuchers
     geöffnet (funktioniert sofort, ohne Server, aber weniger zuverlässig).

     Für echten serverseitigen Versand liegt eine fertige Funktion bereit:
     functions/api/contact.js (Cloudflare-Pages-Function mit serverseitiger
     Prüfung, Honeypot und Rate-Begrenzung). Sie wird erst aktiv, wenn
       1. die Seite über Cloudflare Pages statt reinem FTP/SFTP läuft,
       2. dort die Umgebungsvariablen RESEND_API_KEY, CONTACT_TO und
          CONTACT_FROM gesetzt sind (niemals im Repository!),
       3. hier "/api/contact" eingetragen wird.
     Details siehe README, Abschnitt "Kontaktformular – Server-Setup".
     Wird stattdessen ein externer Formular-Dienst genutzt (z. B.
     https://formspree.io/f/xxxxxxx), muss dieser in der
     Datenschutzerklärung ergänzt werden.
  ------------------------------------------------------------------------- */
  formEndpoint: "",

  /* --- Soziale Netzwerke ---------------------------------------------------
     Vollständige Profil-Adresse eintragen, z. B.
       facebook: "https://www.facebook.com/hahnedigital"

     Netzwerke ohne Adresse werden trotzdem angezeigt, aber deutlich als
     „in Vorbereitung" gekennzeichnet und sind nicht anklickbar. Sobald die
     Adresse eingetragen ist, wird daraus automatisch ein aktiver Verweis.

     socialVorschau: false  -> leere Netzwerke werden ausgeblendet
     socialAusblenden: Netzwerke, die gar nicht erscheinen sollen
  ------------------------------------------------------------------------- */
  socialVorschau: true,
  socialAusblenden: [],
  social: {
    facebook:  "",
    instagram: "",
    tiktok:    "",
    linkedin:  "",
    youtube:   "",
    xing:      "",
    whatsappKanal: "https://wa.me/4917620204188"
  },

  /* --- Live-Chat -----------------------------------------------------------
     whatsapp     Nummer im Format 49176... (ohne + und ohne Leerzeichen).
                  Leer lassen, wenn kein WhatsApp genutzt wird.
     chatEndpoint Optional. Ohne Eintrag läuft der Live-Chat über WhatsApp
                  bzw. E-Mail – funktioniert sofort, ohne Server.
                  Mit einem eigenen Backend oder Chat-Dienst hier die URL
                  eintragen; dann werden Nachrichten direkt gesendet und
                  Antworten abgeholt. Ein externer Dienst muss in der
                  Datenschutzerklärung ergänzt werden.
     chatZeiten   Erreichbarkeit für die Statusanzeige (0 = Sonntag).
  ------------------------------------------------------------------------- */
  whatsapp:     "4917620204188",
  chatEndpoint: "",
  chatZeiten:   { tage: [1, 2, 3, 4, 5], von: 8, bis: 17 },
  chatAntwort:  "in der Regel innerhalb einer Stunde",

  /* --- Privatsphäre-Hinweis -------------------------------------------------
     hinweisImmerZeigen: false  Die Entscheidung des Besuchers wird gemerkt,
                                der Hinweis erscheint nur beim ersten Besuch.
                        true    Der Hinweis erscheint bei jedem Seitenaufruf.
                                Ehrlicher wirkt "false" – wer bei jedem Aufruf
                                erneut gefragt wird, klickt irgendwann alles weg.
     Über den Link "Privatsphäre" im Footer sind die Einstellungen jederzeit
     erreichbar; das ist ohnehin verpflichtend.
  ------------------------------------------------------------------------- */
  hinweisImmerZeigen: false,

  /* --- Domainprüfung --------------------------------------------------------
     Ohne Eintrag läuft die Vorprüfung über den öffentlichen DNS-Dienst von
     Cloudflare – zuverlässig für "vergeben", sehr wahrscheinlich für "frei".
     Mit eigener Schnittstelle (RDAP/WHOIS beim Registrar) hier die URL
     eintragen; erwartet wird JSON: { "verfuegbar": true|false }.
     Dann entfällt die Übermittlung an Cloudflare.
  ------------------------------------------------------------------------- */
  domainEndpoint: "",

  /* --- Lernen und Ansprache -------------------------------------------------
     hilfeNachSekunden  Nach so vielen Sekunden aktiver Verweildauer bietet
                        der Assistent von sich aus Hilfe an (einmal je Besuch).
     lernEndpoint       Optional. Ohne Eintrag bleibt alles auf dem Gerät des
                        Besuchers. Mit einer URL werden unbeantwortete Fragen
                        anonym an euch gemeldet, damit die Wissensbasis für
                        ALLE Besucher wächst – dieser Dienst muss dann in der
                        Datenschutzerklärung ergänzt werden.
  ------------------------------------------------------------------------- */
  hilfeNachSekunden: 45,
  lernEndpoint: "",

  /* --- Sprachfunktion ------------------------------------------------------
     sprachEingabe  Mikrofonknopf beim Assistenten anzeigen
     sprachAusgabe  Antworten können vorgelesen werden
     Hinweis: Die Spracherkennung wird vom Browser bereitgestellt. Je nach
     Browser werden die Sprachdaten dafür an dessen Anbieter übertragen –
     deshalb fragt der Assistent vor der ersten Nutzung um Zustimmung.
  ------------------------------------------------------------------------- */
  sprachEingabe: true,
  sprachAusgabe: true,

  /* --- Rechtstexte -------------------------------------------------------- */
  gerichtsstand: "Eckernförde",
  stand:        "August 2026"
};

/* ==========================================================================
   Ab hier nichts mehr ändern – Einsetzen der Werte in die Seiten
   ========================================================================== */
(function () {
  var S = window.SITE;
  S.adresseKurz = S.strasse + ", " + S.plz + " " + S.ort;

  var map = {
    firma: S.firma,
    inhaber: S.inhaber,
    vertretung: S.vertretung || S.inhaber,
    rechtsform: S.rechtsform,
    gerichtsstand: S.gerichtsstand || S.ort,
    strasse: S.strasse,
    plzort: S.plz + " " + S.ort,
    ort: S.ort,
    land: S.land,
    telefon: S.telefon,
    email: S.email,
    domain: S.domain,
    adresse: S.adresseKurz,
    hoster: S.hoster,
    hosterAdresse: S.hosterAdresse,
    stand: S.stand
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Textplatzhalter füllen
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll('[data-site="' + key + '"]').forEach(function (el) {
        el.textContent = map[key];
        if (/^\[.*\]$/.test(map[key])) el.classList.add("todo");
      });
    });

    // E-Mail- und Telefon-Links aktivieren
    document.querySelectorAll('[data-site-link="email"]').forEach(function (a) {
      a.setAttribute("href", "mailto:" + S.email);
    });
    document.querySelectorAll('[data-site-link="telefon"]').forEach(function (a) {
      a.setAttribute("href", "tel:" + S.telefon.replace(/[^+0-9]/g, ""));
    });

    // Steuerangaben: USt-IdNr. oder Kleinunternehmer-Hinweis
    var ust = document.getElementById("ust-block");
    if (ust) {
      if (S.kleinunternehmer) {
        ust.innerHTML = '<h2>Umsatzsteuer</h2><p>Gemäß § 19 UStG wird keine Umsatzsteuer ' +
          'berechnet und daher auch nicht in Rechnungen ausgewiesen (Kleinunternehmerregelung).</p>' +
          '<p>Steuernummer: <span class="' + (/^\[.*\]$/.test(S.steuernummer) ? 'todo' : '') + '">' +
          S.steuernummer + '</span></p>';
      } else {
        ust.innerHTML = '<h2>Umsatzsteuer-Identifikationsnummer</h2>' +
          '<p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>' +
          '<span class="' + (/^\[.*\]$/.test(S.ustId) ? 'todo' : '') + '">' + S.ustId + '</span></p>';
      }
    }

    // Preishinweis abhängig von der Steuerregelung
    document.querySelectorAll('[data-site="preishinweis"]').forEach(function (el) {
      el.textContent = S.kleinunternehmer
        ? "Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen."
        : "Alle Preise verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer. Der endgültige Umfang wird im Angebot festgehalten.";
    });

    // AVV-Satz in der Datenschutzerklärung
    var avv = document.getElementById("avv-satz");
    if (avv && !S.hosterAvv) avv.style.display = "none";

    // Jahreszahl im Footer
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    // Verknüpfungen zu sozialen Netzwerken
    var netze = [
      { id: "facebook",  name: "Facebook",
        pfad: "M14.5 8.5h-2v-1.6c0-.6.4-.8.7-.8h1.3V3.6L12.7 3.6C10.5 3.6 10 5.2 10 6.3v2.2H8.5V11H10v7h2.5v-7h1.7l.3-2.5z" },
      { id: "instagram", name: "Instagram",
        pfad: "M7.5 3h7A4.5 4.5 0 0 1 19 7.5v7a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 3 14.5v-7A4.5 4.5 0 0 1 7.5 3zm0 2A2.5 2.5 0 0 0 5 7.5v7A2.5 2.5 0 0 0 7.5 17h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 14.5 5h-7zM11 7.2A3.8 3.8 0 1 1 11 14.8 3.8 3.8 0 0 1 11 7.2zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM15.4 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
      { id: "tiktok",    name: "TikTok",
        pfad: "M13 3h2.2c.2 1.6 1.2 2.9 2.8 3.2v2.2c-1.1-.05-2-.4-2.8-1v5.3c0 2.9-2.1 5.1-4.9 5.1S5.4 15.6 5.4 12.7c0-2.7 1.9-4.8 4.5-5.05v2.3c-1.3.2-2.2 1.3-2.2 2.75 0 1.6 1.2 2.85 2.8 2.85s2.5-1.25 2.5-2.85V3z" },
      { id: "linkedin",  name: "LinkedIn",
        pfad: "M5.5 4.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM4.3 8.8h2.5V18H4.3V8.8zm4.3 0H11v1.25c.4-.7 1.3-1.45 2.7-1.45 2.1 0 3.3 1.3 3.3 3.9V18h-2.5v-4.9c0-1.3-.5-2.05-1.6-2.05-1 0-1.6.65-1.8 1.3-.1.2-.1.5-.1.8V18H8.6V8.8z" },
      { id: "youtube",   name: "YouTube",
        pfad: "M20 7.5c-.2-1.2-.8-2-2-2.2C16.2 5 11 5 11 5s-5.2 0-7 .3C2.8 5.5 2.2 6.3 2 7.5 1.8 8.8 1.8 11 1.8 11s0 2.2.2 3.5c.2 1.2.8 2 2 2.2 1.8.3 7 .3 7 .3s5.2 0 7-.3c1.2-.2 1.8-1 2-2.2.2-1.3.2-3.5.2-3.5s0-2.2-.2-3.5zM9.3 13.9V8.1l4.7 2.9-4.7 2.9z" },
      { id: "xing",      name: "Xing",
        pfad: "M6.4 6.2h3l2 3.5-3.2 5.6h-3l3.2-5.6-2-3.5zm7.9-3.2h3l-5.4 9.4 3.4 6H12l-3.4-6 5.7-9.4z" },
      { id: "whatsappKanal", name: "WhatsApp",
        pfad: "M11 3a8 8 0 0 0-6.9 12l-1 3.7 3.8-1a8 8 0 1 0 4.1-14.7zm0 2a6 6 0 0 1 0 12 6 6 0 0 1-3.2-.9l-.3-.2-1.7.45.45-1.65-.2-.3A6 6 0 0 1 11 5zm-2.4 2.9c-.15 0-.4.05-.6.3-.2.25-.8.75-.8 1.85s.8 2.15.9 2.3c.15.15 1.55 2.45 3.8 3.3 1.85.7 2.25.55 2.65.5.4-.05 1.3-.5 1.5-1.05.2-.55.2-1 .15-1.1-.05-.1-.2-.15-.45-.3s-1.3-.65-1.5-.7c-.2-.1-.35-.15-.5.1s-.55.7-.7.85c-.1.15-.25.15-.5.05-.25-.15-1.05-.4-2-1.25-.75-.65-1.2-1.45-1.35-1.7-.15-.25 0-.4.1-.5.1-.1.25-.3.35-.45.15-.15.2-.25.3-.4.05-.2 0-.35-.05-.45-.05-.15-.5-1.25-.7-1.7-.15-.4-.35-.35-.5-.35h-.4z" }
    ];

    var aus = S.socialAusblenden || [];
    var liste = netze.filter(function (n) { return aus.indexOf(n.id) === -1; });
    var aktiv = liste.filter(function (n) { return S.social && S.social[n.id]; });
    var zeigen = S.socialVorschau === false ? aktiv : liste;

    document.querySelectorAll("[data-social]").forEach(function (box) {
      if (!zeigen.length) { box.remove(); return; }
      box.innerHTML = zeigen.map(function (n) {
        var symbol = '<svg viewBox="0 0 22 22" aria-hidden="true"><path d="' + n.pfad + '"/></svg>';
        var adresse = S.social && S.social[n.id];
        return adresse
          ? '<a class="social-link" href="' + adresse + '" target="_blank" rel="noopener me" ' +
            'aria-label="' + n.name + '" title="' + n.name + '">' + symbol + "</a>"
          : '<span class="social-link social-bald" role="img" aria-label="' + n.name +
            ' – Profil in Vorbereitung" title="' + n.name + ' – in Vorbereitung">' + symbol + "</span>";
      }).join("");
    });

    // Begleittext je nach Stand
    document.querySelectorAll("[data-social-titel]").forEach(function (el) {
      el.textContent = aktiv.length ? "Folgen Sie uns" : "Demnächst hier";
    });
    document.querySelectorAll("[data-social-hinweis]").forEach(function (el) {
      if (aktiv.length === zeigen.length) { el.remove(); return; }
      el.textContent = aktiv.length
        ? "Die blassen Symbole stehen für Kanäle, die wir gerade aufbauen."
        : "Unsere Kanäle werden gerade aufgebaut – noch sind die Profile nicht online.";
    });

    var vorhanden = aktiv;

    // Profile für Suchmaschinen verknüpfen (schema.org sameAs)
    if (vorhanden.length) {
      var skript = document.querySelector('script[type="application/ld+json"]');
      if (skript) {
        try {
          var daten = JSON.parse(skript.textContent);
          daten.sameAs = vorhanden.map(function (n) { return S.social[n.id]; });
          skript.textContent = JSON.stringify(daten);
        } catch (e) {}
      }
    }
  });
})();
