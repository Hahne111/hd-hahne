/* ==========================================================================
   HAHNE DIGITAL – Angebots-PDF
   --------------------------------------------------------------------------
   Erzeugt ein DIN-A4-Angebot (595 × 842 pt) direkt im Browser.
   Ohne externe Bibliothek, ohne Server, ohne Datenübertragung.

   Aufbau: Die Datei wird als PDF 1.4 zusammengesetzt – Katalog, Seitenbaum,
   Seiten, Inhaltsströme und die beiden Standardschriften Helvetica und
   Helvetica-Bold. Umlaute werden nach WinAnsi kodiert.
   ========================================================================== */
(function () {
  "use strict";

  var A4 = { breite: 595.28, hoehe: 841.89 };
  var RAND = 56;
  var PETROL = [0.055, 0.435, 0.478];
  var SAND = [0.70, 0.44, 0.12];
  var GRAU = [0.35, 0.42, 0.47];
  var LINIE = [0.87, 0.90, 0.91];

  /* --- Zeichenkodierung (WinAnsi) -------------------------------------------- */
  var SONDER = { "€": 128, "‚": 130, "„": 132, "…": 133, "†": 134, "‰": 137, "‹": 139,
                 "‘": 145, "’": 146, "“": 147, "”": 148, "•": 149, "–": 150, "—": 151, "›": 155 };

  function kodieren(text) {
    var aus = "";
    for (var i = 0; i < text.length; i++) {
      var z = text[i], c = text.charCodeAt(i);
      if (SONDER[z] !== undefined) c = SONDER[z];
      else if (c > 255) { aus += "?"; continue; }
      if (c === 40 || c === 41 || c === 92) aus += "\\" + z;          // ( ) \
      else if (c < 32 || c > 126) aus += "\\" + ("00" + c.toString(8)).slice(-3);
      else aus += z;
    }
    return aus;
  }

  /* --- Textbreite messen (Helvetica-Metriken, gerundet) ----------------------- */
  var BREITEN = { " ": 278, "!": 278, '"': 355, "#": 556, "$": 556, "%": 889, "&": 667, "'": 191,
    "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278, ":": 278,
    ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015, "[": 278, "\\": 278, "]": 278,
    "^": 469, "_": 556, "`": 333, "{": 334, "|": 260, "}": 334, "~": 584 };
  var ZIFFER = 556;

  function breite(text, groesse, fett) {
    var summe = 0;
    for (var i = 0; i < text.length; i++) {
      var z = text[i];
      var w;
      if (BREITEN[z] !== undefined) w = BREITEN[z];
      else if (z >= "0" && z <= "9") w = ZIFFER;
      else if (z >= "A" && z <= "Z") w = fett ? 722 : 667;
      else if ("ilj".indexOf(z) > -1) w = fett ? 278 : 222;
      else if ("mw".indexOf(z) > -1) w = fett ? 889 : 833;
      else if ("ft".indexOf(z) > -1) w = fett ? 333 : 278;
      else w = fett ? 611 : 556;
      summe += w;
    }
    return summe * groesse / 1000;
  }

  function umbrechen(text, maxBreite, groesse, fett) {
    var woerter = String(text).split(" ");
    var zeilen = [], zeile = "";
    woerter.forEach(function (w) {
      var versuch = zeile ? zeile + " " + w : w;
      if (breite(versuch, groesse, fett) > maxBreite && zeile) { zeilen.push(zeile); zeile = w; }
      else zeile = versuch;
    });
    if (zeile) zeilen.push(zeile);
    return zeilen;
  }

  /* --- Zeichenbefehle --------------------------------------------------------- */
  function Seite() {
    this.befehle = [];
    this.y = A4.hoehe - RAND;
  }
  Seite.prototype.text = function (t, x, y, groesse, fett, farbe) {
    var f = farbe || [0.07, 0.13, 0.16];
    this.befehle.push("BT /" + (fett ? "F2" : "F1") + " " + groesse + " Tf " +
      f.map(function (v) { return v.toFixed(3); }).join(" ") + " rg " +
      x.toFixed(2) + " " + y.toFixed(2) + " Td (" + kodieren(t) + ") Tj ET");
  };
  Seite.prototype.rechts = function (t, xRechts, y, groesse, fett, farbe) {
    this.text(t, xRechts - breite(t, groesse, fett), y, groesse, fett, farbe);
  };
  Seite.prototype.kasten = function (x, y, b, h, farbe) {
    this.befehle.push(farbe.map(function (v) { return v.toFixed(3); }).join(" ") + " rg " +
      x.toFixed(2) + " " + y.toFixed(2) + " " + b.toFixed(2) + " " + h.toFixed(2) + " re f");
  };
  Seite.prototype.linie = function (x1, y, x2, farbe) {
    var f = farbe || LINIE;
    this.befehle.push(f.map(function (v) { return v.toFixed(3); }).join(" ") + " RG 0.7 w " +
      x1.toFixed(2) + " " + y.toFixed(2) + " m " + x2.toFixed(2) + " " + y.toFixed(2) + " l S");
  };

  /* --- PDF zusammensetzen ------------------------------------------------------ */
  function bauen(seiten, titel) {
    var objekte = [];
    function obj(inhalt) { objekte.push(inhalt); return objekte.length; }

    var schrift1 = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    var schrift2 = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

    var seitenIds = [], inhaltIds = [];
    seiten.forEach(function (s) {
      var strom = s.befehle.join("\n");
      inhaltIds.push(obj("<< /Length " + strom.length + " >>\nstream\n" + strom + "\nendstream"));
      seitenIds.push(0);
    });

    var elternId = objekte.length + seiten.length + 1;
    seiten.forEach(function (s, i) {
      seitenIds[i] = obj("<< /Type /Page /Parent " + elternId + " 0 R /MediaBox [0 0 " +
        A4.breite.toFixed(2) + " " + A4.hoehe.toFixed(2) + "] /Resources << /Font << /F1 " +
        schrift1 + " 0 R /F2 " + schrift2 + " 0 R >> >> /Contents " + inhaltIds[i] + " 0 R >>");
    });

    var seitenbaum = obj("<< /Type /Pages /Kids [" +
      seitenIds.map(function (id) { return id + " 0 R"; }).join(" ") +
      "] /Count " + seiten.length + " >>");
    var info = obj("<< /Title (" + kodieren(titel) + ") /Producer (Hahne Digital) /Creator (Hahne Digital Website) >>");
    var katalog = obj("<< /Type /Catalog /Pages " + seitenbaum + " 0 R >>");

    var kopf = "%PDF-1.4\n";
    var teile = [kopf], pos = kopf.length, versaetze = [];
    objekte.forEach(function (o, i) {
      var t = (i + 1) + " 0 obj\n" + o + "\nendobj\n";
      versaetze.push(pos);
      teile.push(t);
      pos += t.length;
    });
    var xrefPos = pos;
    var xref = "xref\n0 " + (objekte.length + 1) + "\n0000000000 65535 f \n" +
      versaetze.map(function (v) { return ("0000000000" + v).slice(-10) + " 00000 n \n"; }).join("");
    teile.push(xref);
    teile.push("trailer\n<< /Size " + (objekte.length + 1) + " /Root " + katalog + " 0 R /Info " +
      info + " 0 R >>\nstartxref\n" + xrefPos + "\n%%EOF");

    var text = teile.join("");
    var bytes = new Uint8Array(text.length);
    for (var i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i) & 0xff;
    return bytes;
  }

  /* --- Inhalt des Angebots ------------------------------------------------------ */
  function euro(n) {
    return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }

  function nummer() {
    var d = new Date();
    return "AN-" + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) +
      ("0" + d.getDate()).slice(-2) + "-" + Math.floor(Math.random() * 900 + 100);
  }

  function kopfzeile(s, S, angebot) {
    s.kasten(0, A4.hoehe - 118, A4.breite, 118, PETROL);
    // Logo: H und D
    s.kasten(RAND, A4.hoehe - 78, 5, 34, [1, 1, 1]);
    s.kasten(RAND + 17, A4.hoehe - 78, 5, 34, [1, 1, 1]);
    s.kasten(RAND + 5, A4.hoehe - 63, 12, 5, [0.94, 0.79, 0.53]);
    s.kasten(RAND + 22, A4.hoehe - 78, 12, 5, [1, 1, 1]);
    s.kasten(RAND + 22, A4.hoehe - 49, 12, 5, [1, 1, 1]);
    s.kasten(RAND + 29, A4.hoehe - 78, 5, 34, [1, 1, 1]);

    s.text("HAHNE DIGITAL", RAND + 46, A4.hoehe - 62, 15, true, [1, 1, 1]);
    s.text("Internetpräsenzen · Shops · Firmenmodule · KI", RAND + 46, A4.hoehe - 76, 8, false, [0.85, 0.93, 0.94]);
    s.rechts("ANGEBOT", A4.breite - RAND, A4.hoehe - 58, 20, true, [1, 1, 1]);
    s.rechts(angebot.nummer, A4.breite - RAND, A4.hoehe - 76, 9, false, [0.85, 0.93, 0.94]);
    s.y = A4.hoehe - 150;
  }

  function fusszeile(s, S, seitenNr, gesamt) {
    var y = 52;
    s.linie(RAND, y + 22, A4.breite - RAND);
    var z1 = (S.firma || "Hahne Digital") + " · " + (S.strasse || "") + " · " + (S.plz || "") + " " + (S.ort || "");
    var z2 = "Tel. " + (S.telefon || "") + " · " + (S.email || "") + " · " + (S.domain || "");
    s.text(z1, RAND, y + 8, 7.5, false, GRAU);
    s.text(z2, RAND, y - 2, 7.5, false, GRAU);
    s.rechts("Seite " + seitenNr + " von " + gesamt, A4.breite - RAND, y + 8, 7.5, false, GRAU);
  }

  function erstellen(angebot) {
    var S = window.SITE || {};
    var MIETE = window.MIETE || { grundgebuehr: 79, mindestlaufzeit: 24, einrichtung: 149 };
    var seiten = [];
    var s = new Seite();
    seiten.push(s);
    kopfzeile(s, S, angebot);

    var rechts = A4.breite - RAND;
    var spalteMenge = rechts - 150;
    var spaltePreis = rechts;

    function platzPruefen(brauche) {
      if (s.y - brauche > 90) return;
      s = new Seite();
      seiten.push(s);
      s.y = A4.hoehe - RAND;
      s.text("Angebot " + angebot.nummer + " · Fortsetzung", RAND, s.y, 9, false, GRAU);
      s.y -= 26;
    }

    /* Empfänger und Eckdaten */
    s.text("Für", RAND, s.y, 8, true, GRAU);
    s.text(angebot.kunde || "Interessent", RAND, s.y - 16, 12, true);
    if (angebot.ort) s.text(angebot.ort, RAND, s.y - 31, 10, false, GRAU);

    var rx = rechts - 175;
    s.text("Datum", rx, s.y, 8, true, GRAU);
    s.text(angebot.datum, rx + 70, s.y, 8, false);
    s.text("Gültig bis", rx, s.y - 13, 8, true, GRAU);
    s.text(angebot.gueltig, rx + 70, s.y - 13, 8, false);
    s.text("Modell", rx, s.y - 26, 8, true, GRAU);
    s.text(angebot.modell === "miete" ? "Miete (monatlich)" : "Kauf (einmalig)", rx + 70, s.y - 26, 8, false);
    s.y -= 62;

    /* Einleitung */
    s.text("Ihre Zusammenstellung", RAND, s.y, 14, true);
    s.y -= 18;
    var einleitung = angebot.modell === "miete"
      ? "vielen Dank für Ihr Interesse. Auf Grundlage Ihrer Auswahl im Modulkatalog haben wir " +
        "folgendes unverbindliches Angebot für das Mietmodell zusammengestellt."
      : "vielen Dank für Ihr Interesse. Auf Grundlage Ihrer Auswahl im Modulkatalog haben wir " +
        "folgendes unverbindliches Angebot zum Kauf zusammengestellt.";
    umbrechen(einleitung, rechts - RAND, 9.5, false).forEach(function (z) {
      s.text(z, RAND, s.y, 9.5, false, GRAU);
      s.y -= 13;
    });
    s.y -= 12;

    /* Tabellenkopf */
    s.kasten(RAND, s.y - 6, rechts - RAND, 22, [0.93, 0.96, 0.96]);
    s.text("Position", RAND + 8, s.y, 8.5, true, PETROL);
    s.rechts(angebot.modell === "miete" ? "monatlich" : "einmalig", spaltePreis - 8, s.y, 8.5, true, PETROL);
    s.y -= 26;

    /* Positionen */
    angebot.positionen.forEach(function (p, i) {
      platzPruefen(46);
      if (i % 2 === 1) s.kasten(RAND, s.y - 20, rechts - RAND, 34, [0.975, 0.982, 0.985]);
      s.text(p.name, RAND + 8, s.y, 10, true);
      s.rechts(p.betrag === 0 ? "inklusive" : euro(p.betrag), spaltePreis - 8, s.y, 10.5, true);
      s.y -= 13;
      if (p.hinweis) {
        umbrechen(p.hinweis, rechts - RAND - 140, 8.5, false).forEach(function (z) {
          s.text(z, RAND + 8, s.y, 8.5, false, GRAU);
          s.y -= 11;
        });
      }
      if (p.zusatz) {
        s.rechts(p.zusatz, spaltePreis - 8, s.y + 11, 8, false, GRAU);
      }
      s.y -= 9;
      s.linie(RAND, s.y + 4, rechts);
      s.y -= 14;
    });

    /* Summen */
    platzPruefen(120);
    s.y -= 6;
    angebot.summen.forEach(function (z) {
      if (z.hervor) {
        s.y -= 8;
        s.kasten(RAND, s.y - 10, rechts - RAND, 28, [0.93, 0.96, 0.96]);
        s.text(z.text, RAND + 8, s.y, 11, true, PETROL);
        s.rechts(z.wert, spaltePreis - 8, s.y - 1, 14, true, PETROL);
        s.y -= 32;
      } else {
        s.text(z.text, RAND + 8, s.y, 9.5, false, GRAU);
        s.rechts(z.wert, spaltePreis - 8, s.y, 9.5, z.fett, z.fett ? undefined : GRAU);
        s.y -= 16;
      }
    });

    /* Hinweise */
    platzPruefen(170);
    s.y -= 10;
    s.text("Hinweise", RAND, s.y, 11, true);
    s.y -= 16;
    angebot.hinweise.forEach(function (h) {
      platzPruefen(30);
      umbrechen("- " + h, rechts - RAND, 8.8, false).forEach(function (z, i) {
        s.text(z, RAND + (i ? 8 : 0), s.y, 8.8, false, GRAU);
        s.y -= 11.5;
      });
      s.y -= 2;
    });

    /* Abschluss */
    platzPruefen(90);
    s.y -= 12;
    s.kasten(RAND, s.y - 34, rechts - RAND, 46, [0.98, 0.95, 0.89]);
    s.text("Nächster Schritt", RAND + 10, s.y, 9.5, true, SAND);
    umbrechen("Antworten Sie einfach auf dieses Angebot oder rufen Sie an – wir klären offene Punkte " +
      "und machen daraus ein verbindliches Festpreisangebot.", rechts - RAND - 20, 8.8, false)
      .forEach(function (z, i) { s.text(z, RAND + 10, s.y - 14 - i * 11, 8.8, false, GRAU); });
    s.y -= 60;

    seiten.forEach(function (seite, i) { fusszeile(seite, S, i + 1, seiten.length); });
    return bauen(seiten, "Angebot " + angebot.nummer + " - Hahne Digital");
  }

  /* --- Angebot aus einer Modulauswahl aufbauen ----------------------------------- */
  function ausAuswahl(auswahl, modell, kunde, ort, domain) {
    var MODULE = window.MODULE || [];
    var MIETE = window.MIETE || { grundgebuehr: 79, mindestlaufzeit: 24, einrichtung: 149 };
    var gewaehlt = MODULE.filter(function (m) { return auswahl.indexOf(m.id) > -1; });

    var heute = new Date();
    var bis = new Date(heute.getTime() + 30 * 864e5);
    var fmt = function (d) { return d.toLocaleDateString("de-DE"); };

    var positionen = [], summen = [], hinweise = [];

    if (modell === "miete") {
      positionen.push({ name: "Einrichtungspauschale", betrag: MIETE.einrichtung, zusatz: "einmalig",
        hinweis: "Einrichtung, Grundkonfiguration, Datenübernahme im üblichen Umfang und Einweisung." });
      positionen.push({ name: "Grundgebühr", betrag: MIETE.grundgebuehr, zusatz: "je Monat",
        hinweis: "Hosting in Deutschland, Wartung, Updates, tägliche Sicherung und Support." });
      gewaehlt.forEach(function (m) {
        if (m.nurKauf) {
          positionen.push({ name: m.name, betrag: m.preis, zusatz: "einmalig", hinweis: m.kurz });
        } else if (m.miete > 0) {
          positionen.push({ name: m.name, betrag: m.miete, zusatz: "je Monat",
            hinweis: m.kurz + (m.monat ? " Zzgl. " + euro(m.monat) + " je Monat Nutzungskosten." : "") });
        } else {
          positionen.push({ name: m.name, betrag: 0, hinweis: "In der Grundgebühr enthalten." });
        }
      });

      var mtl = MIETE.grundgebuehr + gewaehlt.reduce(function (a, m) { return a + (m.miete || 0) + (m.monat || 0); }, 0);
      var einmal = MIETE.einrichtung + gewaehlt.reduce(function (a, m) { return a + (m.nurKauf ? m.preis : 0); }, 0);
      summen.push({ text: "Einmalig zu Beginn", wert: euro(einmal), fett: true });
      summen.push({ text: "Monatlich ab Bereitstellung", wert: euro(mtl), hervor: true });
      summen.push({ text: "Gesamt über die Vertragslaufzeit von " + MIETE.mindestlaufzeit + " Monaten",
        wert: euro(einmal + mtl * MIETE.mindestlaufzeit) });

      hinweise.push("Vertragslaufzeit: " + MIETE.mindestlaufzeit + " Monate ab Bereitstellung. Danach Verlängerung um jeweils 12 Monate, sofern nicht 3 Monate zum Laufzeitende gekündigt wird.");
      hinweise.push("Das Nutzungsrecht ist auf die Vertragsdauer beschränkt. Ihre Daten bleiben Ihr Eigentum und können jederzeit exportiert werden.");
      hinweise.push("Ein Wechsel in den Kauf ist jederzeit möglich; 50 Prozent der Modulmieten der letzten 12 Monate werden angerechnet.");
    } else {
      gewaehlt.forEach(function (m) {
        if (m.preis > 0) {
          positionen.push({ name: m.name, betrag: m.preis, zusatz: "einmalig",
            hinweis: m.kurz + (m.monat ? " Zzgl. " + euro(m.monat) + " je Monat Nutzungskosten." : "") });
        } else {
          positionen.push({ name: m.name, betrag: m.monat, zusatz: "je Monat", hinweis: m.kurz });
        }
      });
      var kauf = gewaehlt.reduce(function (a, m) { return a + (m.preis || 0); }, 0);
      var laufend = gewaehlt.reduce(function (a, m) { return a + (m.preis > 0 ? (m.monat || 0) : m.monat || 0); }, 0);
      summen.push({ text: "Summe einmalig (netto)", wert: euro(kauf), hervor: true });
      if (laufend) summen.push({ text: "Laufende Kosten", wert: euro(laufend) + " je Monat" });
      summen.push({ text: "Zzgl. Betrieb: Hosting ab 29 € und Wartung ab 49 € je Monat, monatlich kündbar", wert: "optional" });

      hinweise.push("Nach vollständiger Zahlung erhalten Sie ein unbeschränktes Nutzungsrecht an den für Sie erstellten Arbeitsergebnissen.");
      hinweise.push("Zahlungsplan bei Projekten: 40 Prozent bei Auftragserteilung, 30 Prozent nach Freigabe des Entwurfs, 30 Prozent nach Abnahme.");
    }

    if (domain && domain.name) {
      positionen.push({
        name: "Wunschdomain " + domain.name,
        betrag: 0,
        zusatz: "Registrierung beim Anbieter",
        hinweis: "Verfügbarkeit vorgeprüft" + (domain.geprueft ? " am " + domain.geprueft : "") +
          ". Wir richten die Domain ein und verbinden sie mit Ihrem System. Die Registrierungsgebühr " +
          "zahlen Sie direkt beim Anbieter, je nach Endung meist 10 bis 30 € im Jahr."
      });
      hinweise.push("Die Wunschdomain " + domain.name + " war zum Zeitpunkt der Prüfung frei. " +
        "Verbindlich ist erst die Bestätigung des Registrars bei der Beauftragung – Domains können " +
        "jederzeit von Dritten registriert werden.");
    }
    hinweise.push("Alle Beträge verstehen sich netto zzgl. der gesetzlichen Umsatzsteuer.");
    hinweise.push("Dieses Angebot ist unverbindlich und beruht auf Ihrer Auswahl im Modulkatalog. Der verbindliche Preis ergibt sich nach einem kurzen Gespräch über Umfang und Rahmenbedingungen.");
    hinweise.push("Es gelten unsere Allgemeinen Geschäftsbedingungen, einsehbar unter " + ((window.SITE || {}).domain || "") + "/agb.html");
    hinweise.push("Gültigkeit: 30 Tage ab Ausstellungsdatum.");

    return {
      nummer: nummer(),
      datum: fmt(heute),
      gueltig: fmt(bis),
      kunde: kunde,
      ort: ort,
      modell: modell,
      domain: domain,
      positionen: positionen,
      summen: summen,
      hinweise: hinweise,
      module: gewaehlt
    };
  }

  /* --- Kurzfassung als Text (für E-Mail und WhatsApp) ----------------------------- */
  function alsText(a) {
    var t = "Angebot " + a.nummer + " – Hahne Digital\n" +
      "Datum: " + a.datum + " · gültig bis " + a.gueltig + "\n" +
      "Modell: " + (a.modell === "miete" ? "Miete (monatlich)" : "Kauf (einmalig)") + "\n\n";
    a.positionen.forEach(function (p) {
      t += "· " + p.name + ": " + (p.betrag === 0 ? "inklusive" : euro(p.betrag) + (p.zusatz ? " " + p.zusatz : "")) + "\n";
    });
    t += "\n";
    a.summen.forEach(function (z) { t += z.text + ": " + z.wert + "\n"; });
    t += "\nAlle Beträge netto zzgl. USt. Unverbindliches Angebot.\n";
    return t;
  }

  window.ANGEBOT = {
    ausAuswahl: ausAuswahl,
    erstellen: erstellen,
    alsText: alsText,
    euro: euro
  };
})();
