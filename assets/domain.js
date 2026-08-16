/* ==========================================================================
   HAHNE DIGITAL – Domainprüfung
   --------------------------------------------------------------------------
   WICHTIG – wie zuverlässig ist die Prüfung?

   Eine Website allein kann eine Domain nicht rechtsverbindlich prüfen. Es
   gibt zwei Wege, und beide sind hier vorbereitet:

   1. VORPRÜFUNG (Standard, ohne Server)
      Wir fragen über DNS-over-HTTPS bei Cloudflare, ob für die Domain
      Einträge bestehen. Findet sich etwas, ist die Domain sicher vergeben.
      Findet sich nichts, ist sie sehr wahrscheinlich frei – registrierte,
      aber ungenutzte Domains erkennt dieses Verfahren nicht.
      Dabei verlässt die eingegebene Domain den Browser. Deshalb wird der
      Besucher vorher darauf hingewiesen.

   2. GENAUE PRÜFUNG (mit eigenem Server)
      Tragt in site-config.js unter domainEndpoint eine URL ein, die eine
      RDAP- oder WHOIS-Abfrage durchführt und JSON im Format
      { "verfuegbar": true|false, "domain": "…" } zurückgibt. Dann wird
      dieser Weg genutzt und die Aussage ist verbindlich.
      Hinweis: Für .de-Domains liefert DENIC keine offene Schnittstelle –
      hier braucht es die Abfrage über den Registrar eures Hosters.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var DOH = "https://cloudflare-dns.com/dns-query";

  var ENDUNGEN = ["de", "com", "net", "org", "eu", "info", "shop", "online", "digital",
                  "dk", "at", "ch", "berlin", "hamburg", "io", "dev", "app", "gmbh"];

  var zustand = { domain: null, stand: null, geprueftAm: null, erlaubt: false };

  /* --- Punycode für Umlautdomains (RFC 3492, vereinfacht) --------------------- */
  function punycode(eingabe) {
    var n = 128, delta = 0, bias = 72, aus = [], basis = [];
    for (var i = 0; i < eingabe.length; i++) {
      var c = eingabe.codePointAt(i);
      if (c < 128) basis.push(eingabe[i]);
    }
    var h = basis.length, b = h;
    if (b) aus.push(basis.join(""), "-");
    var zeichen = Array.from(eingabe);
    var gesamt = zeichen.length;
    if (h === gesamt) return eingabe;

    function ziffer(d) { return "abcdefghijklmnopqrstuvwxyz0123456789".charAt(d); }
    function anpassen(d, zaehler, erst) {
      d = erst ? Math.floor(d / 700) : d >> 1;
      d += Math.floor(d / zaehler);
      var k = 0;
      while (d > 455) { d = Math.floor(d / 35); k += 36; }
      return k + Math.floor(36 * d / (d + 38));
    }

    while (h < gesamt) {
      var m = 0x7fffffff;
      zeichen.forEach(function (z) { var c = z.codePointAt(0); if (c >= n && c < m) m = c; });
      delta += (m - n) * (h + 1);
      n = m;
      for (var j = 0; j < zeichen.length; j++) {
        var c2 = zeichen[j].codePointAt(0);
        if (c2 < n) delta++;
        if (c2 === n) {
          var q = delta;
          for (var k2 = 36; ; k2 += 36) {
            var t = k2 <= bias ? 1 : (k2 >= bias + 26 ? 26 : k2 - bias);
            if (q < t) break;
            aus.push(ziffer(t + (q - t) % (36 - t)));
            q = Math.floor((q - t) / (36 - t));
          }
          aus.push(ziffer(q));
          bias = anpassen(delta, h + 1, h === b);
          delta = 0;
          h++;
        }
      }
      delta++;
      n++;
    }
    return "xn--" + aus.join("");
  }

  function aufbereiten(roh) {
    var t = String(roh).trim().toLowerCase()
      .replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").replace(/\s+/g, "");
    if (!t) return null;
    if (t.indexOf(".") === -1) t = t + ".de";
    var teile = t.split(".");
    var endung = teile.pop();
    var name = teile.join(".");
    if (!name) return null;
    if (!/^[a-z0-9äöüß\-.]+$/.test(name)) return { fehler: "zeichen" };
    if (name.length < 2) return { fehler: "kurz" };
    if (name.length > 63) return { fehler: "lang" };
    if (/^-|-$/.test(name)) return { fehler: "strich" };
    var ascii = /[äöüß]/.test(name) ? punycode(name) : name;
    return { anzeige: name + "." + endung, ascii: ascii + "." + endung, name: name, endung: endung };
  }

  /* --- Prüfung ---------------------------------------------------------------- */
  function ueberEndpoint(domain) {
    return fetch(S.domainEndpoint + (S.domainEndpoint.indexOf("?") > -1 ? "&" : "?") +
      "domain=" + encodeURIComponent(domain), { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        return { stand: d.verfuegbar ? "frei" : "vergeben", genau: true };
      });
  }

  function ueberDns(domain) {
    function frage(typ) {
      return fetch(DOH + "?name=" + encodeURIComponent(domain) + "&type=" + typ,
        { headers: { Accept: "application/dns-json" } })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); });
    }
    return Promise.all([frage("NS"), frage("A")]).then(function (a) {
      var treffer = a.some(function (d) { return d && d.Answer && d.Answer.length; });
      var nxdomain = a.every(function (d) { return d && d.Status === 3; });
      if (treffer) return { stand: "vergeben", genau: false };
      if (nxdomain) return { stand: "frei", genau: false };
      return { stand: "unklar", genau: false };
    });
  }

  function pruefen(domain) {
    if (S.domainEndpoint) return ueberEndpoint(domain);
    return ueberDns(domain);
  }

  /* --- Oberfläche -------------------------------------------------------------- */
  function aufbauen(box) {
    box.innerHTML =
      '<form class="dom-form">' +
        '<div class="dom-feld">' +
          '<label class="visually-hidden" for="domEingabe">Wunschdomain</label>' +
          '<input id="domEingabe" type="text" autocomplete="off" spellcheck="false" ' +
            'placeholder="ihre-firma.de">' +
        "</div>" +
        '<button class="btn btn-primary dom-knopf" type="submit">Technische Vorprüfung starten</button>' +
      "</form>" +
      '<p class="dom-hinweis" id="domHinweis">' +
        (S.domainEndpoint
          ? "Verbindliche Prüfung über unseren Server (RDAP/WHOIS beim Registrar)."
          : "Dies ist nur eine <b>technische Vorprüfung</b> per DNS-Abfrage, keine Registrierungsauskunft. " +
            "Dafür wird die eingegebene Domain an den DNS-Dienst von Cloudflare gesendet – wir speichern nichts davon.") +
      "</p>" +
      '<div class="dom-ergebnis" id="domErgebnis"></div>' +
      '<div class="dom-alternativen" id="domAlternativen"></div>';

    var form = box.querySelector(".dom-form");
    var eingabe = box.querySelector("#domEingabe");
    var ergebnis = box.querySelector("#domErgebnis");
    var alternativen = box.querySelector("#domAlternativen");
    var knopf = box.querySelector(".dom-knopf");

    function melden(art, titel, text, domain) {
      ergebnis.className = "dom-ergebnis an dom-" + art;
      ergebnis.innerHTML = "<b>" + titel + "</b><span>" + text + "</span>" +
        (art === "frei" && domain
          ? '<button class="btn btn-primary dom-uebernehmen" type="button">Diese Domain ins Angebot übernehmen</button>'
          : "");
      var u = ergebnis.querySelector(".dom-uebernehmen");
      if (u) {
        u.addEventListener("click", function () {
          zustand.domain = domain;
          zustand.stand = "frei";
          zustand.geprueftAm = new Date().toLocaleDateString("de-DE");
          u.textContent = "✓ Im Angebot vorgemerkt";
          u.disabled = true;
          document.dispatchEvent(new CustomEvent("domainGewaehlt", { detail: { domain: domain } }));
          uebernahmeAnzeigen();
        });
      }
    }

    function alternativenZeigen(d) {
      var vorschlaege = [];
      ["de", "com", "eu", "digital", "shop", "online"].forEach(function (e) {
        if (e !== d.endung) vorschlaege.push(d.name + "." + e);
      });
      vorschlaege = vorschlaege.slice(0, 5);
      alternativen.innerHTML = '<p class="dom-alt-titel">Andere Endungen prüfen</p>' +
        vorschlaege.map(function (v) {
          return '<button class="dom-alt" type="button" data-dom="' + v + '">' + v + "</button>";
        }).join("");
      alternativen.querySelectorAll(".dom-alt").forEach(function (b) {
        b.addEventListener("click", function () {
          eingabe.value = b.dataset.dom;
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = aufbereiten(eingabe.value);
      alternativen.innerHTML = "";

      if (!d) { melden("fehler", "Bitte etwas eingeben", "Zum Beispiel: ihre-firma.de"); return; }
      if (d.fehler) {
        var texte = {
          zeichen: "Erlaubt sind Buchstaben, Ziffern, Bindestriche und Umlaute.",
          kurz: "Der Name ist zu kurz – mindestens zwei Zeichen.",
          lang: "Der Name ist zu lang – höchstens 63 Zeichen.",
          strich: "Ein Bindestrich darf nicht am Anfang oder Ende stehen."
        };
        melden("fehler", "Das geht so nicht", texte[d.fehler]);
        return;
      }

      knopf.disabled = true;
      knopf.textContent = "Prüfe …";
      ergebnis.className = "dom-ergebnis an dom-laden";
      ergebnis.innerHTML = "<b>Einen Moment</b><span>" + d.anzeige + " wird geprüft …</span>";

      pruefen(d.ascii).then(function (r) {
        if (r.stand === "vergeben") {
          melden("vergeben", d.anzeige + " ist bereits vergeben",
            "Diese Adresse wird schon genutzt. Probieren Sie eine andere Schreibweise oder eine andere Endung.");
          alternativenZeigen(d);
        } else if (r.stand === "frei") {
          melden("frei",
            r.genau ? d.anzeige + " ist frei" : "Keine aktive Nutzung erkannt",
            r.genau
              ? "Die Domain ist aktuell nicht registriert. Wir sichern sie für Sie, sobald Sie den Auftrag erteilen."
              : "Für " + d.anzeige + " bestehen keine DNS-Einträge – das ist nur eine technische Vorprüfung, keine Registrierungsauskunft. Die endgültige Verfügbarkeit muss beim Registrar bestätigt werden. Wir prüfen das verbindlich, sobald Sie die Domain in Ihr Angebot aufnehmen.",
            d.anzeige);
          alternativenZeigen(d);
        } else {
          melden("unklar", "Kein eindeutiges Ergebnis",
            "Die Prüfung war nicht eindeutig. Nehmen Sie die Domain gern trotzdem ins Angebot auf – wir prüfen sie beim Registrar nach.");
          alternativenZeigen(d);
        }
      }).catch(function () {
        melden("unklar", "Prüfung nicht möglich",
          "Die Abfrage hat gerade nicht funktioniert. Schreiben Sie uns die Wunschdomain einfach ins Kontaktformular – wir prüfen sie und melden uns.");
      }).then(function () {
        knopf.disabled = false;
        knopf.textContent = "Verfügbarkeit prüfen";
      });
    });
  }

  function uebernahmeAnzeigen() {
    document.querySelectorAll("[data-domain-anzeige]").forEach(function (el) {
      if (!zustand.domain) { el.hidden = true; return; }
      el.hidden = false;
      el.innerHTML = "<b>Wunschdomain:</b> " + zustand.domain +
        ' <button type="button" class="dom-entfernen" aria-label="Domain entfernen">×</button>';
      var w = el.querySelector(".dom-entfernen");
      if (w) w.addEventListener("click", function () {
        zustand.domain = null;
        uebernahmeAnzeigen();
        document.dispatchEvent(new CustomEvent("domainGewaehlt", { detail: { domain: null } }));
      });
    });
  }

  function start() {
    document.querySelectorAll("[data-domain-suche]").forEach(aufbauen);
    uebernahmeAnzeigen();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  window.DOMAIN = {
    gewaehlt: function () { return zustand.domain; },
    geprueftAm: function () { return zustand.geprueftAm; },
    aufbereiten: aufbereiten,
    punycode: punycode,
    endungen: ENDUNGEN
  };
})();
