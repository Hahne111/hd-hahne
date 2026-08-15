/* ==========================================================================
   HAHNE DIGITAL – Modulkatalog
   --------------------------------------------------------------------------
   Hier werden alle einzeln buchbaren Module gepflegt. Änderungen wirken sich
   sofort auf die Seite "Module & Preise" und den Konfigurator aus.

   preis    = einmaliger Richtpreis in Euro (netto, "ab"-Preis)
   monat    = optionale monatliche Kosten in Euro
   aufwand  = grobe Umsetzungsdauer, erscheint auf der Kachel
   badge    = optionale Auszeichnung ("Gefragt", "Neu", "Meist gebucht")
   basis    = true -> Erweiterung, setzt ein Grundmodul voraus

   Kalkulationsgrundlage: rund 95 € je Stunde. Ein Richtpreis von 890 €
   entspricht damit etwa 9 Stunden Umsetzung. Marktüblich sind 2026 bei
   Agenturen 90–150 € je Stunde – die Preise liegen bewusst darunter.
   ========================================================================== */

window.MODULE_KATEGORIEN = [
  { id: "kunde",    name: "Kunden & Vertrieb" },
  { id: "buero",    name: "Büro & Abrechnung" },
  { id: "betrieb",  name: "Betrieb & Außendienst" },
  { id: "lager",    name: "Material & Lager" },
  { id: "personal", name: "Personal" },
  { id: "portal",   name: "Portale & Verkauf" },
  { id: "sichtbar", name: "Sichtbarkeit bei Google" },
  { id: "ki",       name: "KI & Auswertung" },
  { id: "laufend",  name: "Betrieb & Pflege" }
];

window.MODULE = [

  /* --- Kunden & Vertrieb ------------------------------------------------- */
  {
    id: "crm", name: "Kundenverwaltung (CRM)", kategorie: "kunde",
    preis: 890, aufwand: "2–3 Wochen", badge: "Meist gebucht",
    kurz: "Kontakte, Vorgänge und Wiedervorlagen an einem Ort statt in Zetteln, Mails und Excel.",
    punkte: [
      "Kunden- und Ansprechpartnerakte mit vollständiger Historie",
      "Status je Vorgang: Anfrage, Angebot, Auftrag, erledigt",
      "Wiedervorlagen mit Erinnerung",
      "Volltextsuche über alle Kunden und Vorgänge"
    ]
  },
  {
    id: "aufgaben", name: "Aufgaben & Wiedervorlage", kategorie: "kunde",
    preis: 390, aufwand: "1 Woche",
    kurz: "Kleine Ergänzung mit großer Wirkung: nichts fällt mehr zwischen zwei Zuständigkeiten.",
    punkte: [
      "Aufgaben mit Frist und Verantwortlichem",
      "Verknüpfung mit Kunde, Auftrag oder Termin",
      "Tagesübersicht „heute fällig“",
      "Erinnerung per E-Mail"
    ]
  },
  {
    id: "terminbuchung", name: "Online-Terminbuchung", kategorie: "kunde",
    preis: 790, aufwand: "2 Wochen", badge: "Gefragt",
    kurz: "Kunden buchen selbst einen freien Termin – ohne Telefonat, ohne Rückruf, rund um die Uhr.",
    punkte: [
      "Freie Zeiten kommen aus dem eigenen Kalender",
      "Leistungsdauer, Puffer und Sperrzeiten hinterlegbar",
      "Bestätigung und Erinnerung automatisch per E-Mail",
      "Absagen und Verschiebungen durch den Kunden"
    ]
  },
  {
    id: "bewertungen", name: "Bewertungen & Feedback", kategorie: "kunde",
    preis: 390, aufwand: "1 Woche",
    kurz: "Nach erledigtem Auftrag automatisch um eine Rückmeldung bitten.",
    punkte: [
      "Automatische Anfrage nach Auftragsabschluss",
      "Interne Sichtung vor Veröffentlichung",
      "Anzeige ausgewählter Stimmen auf der Website",
      "Weiterleitung zu Google-Bewertungen möglich"
    ]
  },
  {
    id: "newsletter", name: "Newsletter & Mailversand", kategorie: "kunde",
    preis: 590, aufwand: "1–2 Wochen",
    kurz: "Bestandskunden regelmäßig erreichen – rechtssicher mit Anmeldebestätigung.",
    punkte: [
      "Double-Opt-in mit Protokoll",
      "Vorlagen im eigenen Design",
      "Empfängergruppen direkt aus dem CRM",
      "Abmeldelink in jeder Nachricht"
    ]
  },
  {
    id: "leads", name: "Anfragen-Verteilung", kategorie: "kunde",
    preis: 590, aufwand: "1–2 Wochen",
    kurz: "Jede Anfrage bekommt sofort einen Zuständigen und eine Frist – nichts bleibt liegen.",
    punkte: [
      "Automatische Zuordnung nach Gebiet oder Leistung",
      "Eskalation, wenn niemand reagiert",
      "Antwortzeiten werden messbar",
      "Quelle jeder Anfrage nachvollziehbar"
    ]
  },

  /* --- Büro & Abrechnung -------------------------------------------------- */
  {
    id: "angebote", name: "Angebote & Rechnungen", kategorie: "buero",
    preis: 990, aufwand: "2–3 Wochen", badge: "Meist gebucht",
    kurz: "Dokumente im eigenen Layout erstellen, versenden und den Zahlungsstatus nachverfolgen.",
    punkte: [
      "Angebot per Klick in Auftrag und Rechnung überführen",
      "Positionen, Textbausteine und Steuersätze",
      "PDF im eigenen Briefbogen, Versand per E-Mail",
      "Offene-Posten-Übersicht"
    ]
  },
  {
    id: "erechnung", name: "E-Rechnung (XRechnung / ZUGFeRD)", kategorie: "buero",
    preis: 690, aufwand: "1–2 Wochen", badge: "Pflichtthema",
    kurz: "Rechnungen im strukturierten Format nach EN 16931 – im B2B-Geschäft zunehmend Voraussetzung.",
    punkte: [
      "Ausgabe als XRechnung und ZUGFeRD-PDF",
      "Prüfung der Pflichtfelder vor dem Versand",
      "Empfang und Auslesen eingehender E-Rechnungen",
      "Archivierung im geforderten Format"
    ]
  },
  {
    id: "mahnwesen", name: "Mahnwesen & Zahlungslauf", kategorie: "buero",
    preis: 450, basis: true, aufwand: "1 Woche",
    kurz: "Erweiterung: erinnert automatisch, bevor eine offene Rechnung in Vergessenheit gerät.",
    punkte: [
      "Mahnstufen mit eigenen Textvorlagen",
      "Automatischer Versand nach Fristablauf",
      "Zahlungseingänge abgleichen",
      "Setzt „Angebote & Rechnungen“ voraus"
    ]
  },
  {
    id: "abo", name: "Wartungs- & Aborechnungen", kategorie: "buero",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Wiederkehrende Verträge werden automatisch abgerechnet – ohne Terminliste im Kopf.",
    punkte: [
      "Intervalle monatlich, quartalsweise oder jährlich",
      "Preisanpassungen und Laufzeiten je Vertrag",
      "Rechnungslauf auf Knopfdruck",
      "Übersicht der wiederkehrenden Umsätze"
    ]
  },
  {
    id: "dokumente", name: "Dokumente & Ablage (DMS)", kategorie: "buero",
    preis: 590, aufwand: "1–2 Wochen",
    kurz: "Verträge, Pläne, Fotos und Nachweise beim richtigen Kunden statt im Mailpostfach.",
    punkte: [
      "Ablage je Kunde, Auftrag oder Objekt",
      "Upload direkt vom Handy",
      "Versionen und Ablaufdaten für Prüffristen",
      "Rechtebasierter Zugriff"
    ]
  },
  {
    id: "belegscan", name: "Belegerkennung (OCR)", kategorie: "buero",
    preis: 890, monat: 19, aufwand: "2 Wochen", badge: "Neu",
    kurz: "Eingangsrechnung fotografieren – Betrag, Lieferant und Datum werden ausgelesen und zugeordnet.",
    punkte: [
      "Erkennung aus Foto, PDF oder E-Mail-Anhang",
      "Automatische Zuordnung zu Lieferant und Projekt",
      "Freigabe im Vier-Augen-Prinzip",
      "Laufende Kosten je nach Belegmenge"
    ]
  },
  {
    id: "datev", name: "Buchhaltungs-Schnittstelle", kategorie: "buero",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Übergabe an die Steuerberatung, ohne dass jemand Zahlen abtippt.",
    punkte: [
      "Export im DATEV-Format",
      "Anbindung an Lexware, sevDesk oder vergleichbare Systeme",
      "Kontenrahmen und Steuerschlüssel hinterlegt",
      "Preis je Schnittstelle"
    ]
  },
  {
    id: "kasse", name: "Kassenmodul (POS)", kategorie: "buero",
    preis: 1290, monat: 19, aufwand: "3 Wochen",
    kurz: "Verkauf am Tresen mit Bonausgabe und den gesetzlich geforderten Sicherheitsanforderungen.",
    punkte: [
      "Bon, Tagesabschluss und Kassenbuch",
      "Technische Sicherheitseinrichtung (TSE) anbindbar",
      "Barzahlung, Karte und Gutscheine",
      "Übergabe an die Buchhaltung"
    ]
  },

  /* --- Betrieb & Außendienst ---------------------------------------------- */
  {
    id: "kalender", name: "Termine & Kalender-Sync", kategorie: "betrieb",
    preis: 590, aufwand: "1–2 Wochen", badge: "Gefragt",
    kurz: "Termine werden geplant und erscheinen automatisch im Kalender des Smartphones.",
    punkte: [
      "Kalender-Abo (ICS/WebCal) für iPhone, Android und Outlook",
      "Terminbestätigung per E-Mail mit .ics-Anhang",
      "Eigener Kalender je Mitarbeiter oder Fahrzeug",
      "Änderungen und Absagen werden nachgezogen"
    ]
  },
  {
    id: "kalender-api", name: "Kalender-Direktanbindung", kategorie: "betrieb",
    preis: 390, basis: true, aufwand: "1 Woche",
    kurz: "Erweiterung: echter Schreibzugriff auf Google Kalender oder Microsoft 365 statt Abo-Abgleich.",
    punkte: [
      "Termine erscheinen in Sekunden statt nach Abrufintervall",
      "Absagen verschwinden zuverlässig vom Gerät",
      "Einmalige Freigabe je Konto",
      "Setzt „Termine & Kalender-Sync“ voraus"
    ]
  },
  {
    id: "plantafel", name: "Einsatzplanung / Plantafel", kategorie: "betrieb",
    preis: 1190, aufwand: "3–4 Wochen", badge: "Gefragt",
    kurz: "Wer ist wann wo? Die Wochenplanung per Drag-and-drop statt Magnettafel im Büro.",
    punkte: [
      "Mitarbeiter, Fahrzeuge und Aufträge auf einer Zeitachse",
      "Konflikte und Doppelbelegungen werden erkannt",
      "Zuweisung landet direkt im Handy des Mitarbeiters",
      "Tages-, Wochen- und Monatsansicht"
    ]
  },
  {
    id: "service", name: "Serviceaufträge & Wartung", kategorie: "betrieb",
    preis: 890, aufwand: "2–3 Wochen",
    kurz: "Von der Störungsmeldung bis zum unterschriebenen Serviceschein – ein durchgehender Ablauf.",
    punkte: [
      "Auftragsannahme mit Priorität und Terminfenster",
      "Checklisten und Arbeitsbericht am Handy",
      "Fotodokumentation und Unterschrift des Kunden",
      "Wiederkehrende Wartungen mit automatischer Fälligkeit"
    ]
  },
  {
    id: "baustelle", name: "Auftrags- & Baustellendoku", kategorie: "betrieb",
    preis: 790, aufwand: "2 Wochen",
    kurz: "Fotos, Notizen und Abnahmen landen beim richtigen Auftrag statt in der Handygalerie.",
    punkte: [
      "Fotodokumentation mit Zeitstempel",
      "Bautagebuch und Abnahmeprotokoll",
      "Mängel erfassen und nachverfolgen",
      "Export als PDF für den Kunden"
    ]
  },
  {
    id: "aufmass", name: "Aufmaß & Kalkulation", kategorie: "betrieb",
    preis: 990, aufwand: "2–3 Wochen",
    kurz: "Maße vor Ort erfassen, Mengen automatisch ermitteln und direkt ins Angebot übernehmen.",
    punkte: [
      "Eigene Formeln je Gewerk",
      "Materialbedarf aus dem Aufmaß berechnet",
      "Leistungs- und Artikelkatalog mit Preisen",
      "Direkt als Angebotspositionen übernehmbar"
    ]
  },
  {
    id: "zeiterfassung", name: "Zeiterfassung", kategorie: "betrieb",
    preis: 690, aufwand: "2 Wochen", badge: "Meist gebucht",
    kurz: "Arbeitszeiten und Projektzeiten erfassen – am Rechner oder unterwegs am Handy.",
    punkte: [
      "Kommen/Gehen sowie Zeit auf Auftrag oder Projekt",
      "Pausen und Zuschläge nach eigenen Regeln",
      "Auswertung je Mitarbeiter, Projekt und Zeitraum",
      "Export für die Lohnbuchhaltung"
    ]
  },
  {
    id: "fahrtenbuch", name: "Fahrtenbuch", kategorie: "betrieb",
    preis: 490, aufwand: "1–2 Wochen",
    kurz: "Fahrten erfassen, geschäftlich oder privat zuordnen und für die Buchhaltung auswerten.",
    punkte: [
      "Datum, Kilometerstand, Route, Zweck und Fahrer",
      "Mehrere Fahrzeuge und Fahrer",
      "Monats- und Jahresauswertung als PDF oder CSV",
      "Auf Wunsch revisionssicher mit Änderungsprotokoll"
    ]
  },
  {
    id: "fuhrpark", name: "Fuhrpark & Betriebsmittel", kategorie: "betrieb",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Fahrzeuge, Maschinen und Werkzeuge mit Standort, Prüffristen und Zuständigkeit.",
    punkte: [
      "Wer hat gerade welches Gerät?",
      "TÜV-, UVV- und Wartungstermine mit Erinnerung",
      "Kosten je Fahrzeug oder Maschine",
      "Schadensmeldung mit Foto vom Handy"
    ]
  },
  {
    id: "mobil", name: "Mobile Nutzung (PWA)", kategorie: "betrieb",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Das System als App-Symbol auf dem Startbildschirm – ohne App-Store und ohne Installation.",
    punkte: [
      "Für Handy und Tablet optimierte Bedienung",
      "Wichtige Daten auch bei schlechtem Empfang verfügbar",
      "Kamera- und Standortzugriff",
      "Keine laufenden App-Store-Gebühren"
    ]
  },

  /* --- Material & Lager --------------------------------------------------- */
  {
    id: "artikel", name: "Artikel & Materialverwaltung", kategorie: "lager",
    preis: 890, aufwand: "2 Wochen",
    kurz: "Ein sauberer Artikelstamm ist die Grundlage für Kalkulation, Bestellung und Lager.",
    punkte: [
      "Artikel mit Einkaufs- und Verkaufspreisen",
      "Lieferantenzuordnung und Alternativartikel",
      "Preislisten und Staffelpreise",
      "Import aus vorhandenen Listen"
    ]
  },
  {
    id: "lager", name: "Lagerverwaltung", kategorie: "lager",
    preis: 990, aufwand: "2–3 Wochen",
    kurz: "Bestände, Zu- und Abgänge und Mindestmengen – auch für Fahrzeug- und Außenlager.",
    punkte: [
      "Mehrere Lagerorte inklusive Fahrzeuglager",
      "Wareneingang, Entnahme und Umbuchung",
      "Mindestbestand mit Nachbestellhinweis",
      "Inventurunterstützung"
    ]
  },
  {
    id: "einkauf", name: "Einkauf & Bestellwesen", kategorie: "lager",
    preis: 890, aufwand: "2 Wochen",
    kurz: "Bedarf ermitteln, bestellen und den Wareneingang prüfen – nachvollziehbar je Projekt.",
    punkte: [
      "Bestellvorschlag aus Auftrag oder Mindestbestand",
      "Lieferantenverwaltung mit Konditionen",
      "Wareneingang mit Mengen- und Preisprüfung",
      "Bestellhistorie je Projekt"
    ]
  },
  {
    id: "barcode", name: "Barcode & Scanner", kategorie: "lager",
    preis: 590, basis: true, aufwand: "1 Woche",
    kurz: "Erweiterung: Entnahme und Inventur per Handykamera statt per Strichliste.",
    punkte: [
      "Scannen mit dem Smartphone, kein Spezialgerät nötig",
      "Etiketten mit Barcode oder QR-Code drucken",
      "Serien- und Chargennummern",
      "Setzt die Lagerverwaltung voraus"
    ]
  },

  /* --- Personal ----------------------------------------------------------- */
  {
    id: "personal", name: "Personalakte & Urlaub", kategorie: "personal",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Stammdaten, Qualifikationen und Abwesenheiten an einer Stelle statt in mehreren Ordnern.",
    punkte: [
      "Digitale Personalakte mit Dokumenten",
      "Urlaubsantrag mit Freigabe durch die Leitung",
      "Abwesenheitskalender für das Team",
      "Erinnerung an ablaufende Nachweise und Schulungen"
    ]
  },
  {
    id: "schicht", name: "Schicht- & Dienstplanung", kategorie: "personal",
    preis: 790, aufwand: "2 Wochen",
    kurz: "Dienstpläne erstellen, veröffentlichen und Tauschwünsche geregelt abwickeln.",
    punkte: [
      "Planung nach Qualifikation und Verfügbarkeit",
      "Veröffentlichung direkt an das Team",
      "Tausch- und Vertretungsanfragen",
      "Geplante gegen geleistete Zeit vergleichbar"
    ]
  },

  /* --- Portale & Verkauf --------------------------------------------------- */
  {
    id: "kundenportal", name: "Kundenportal", kategorie: "portal",
    preis: 1190, aufwand: "3 Wochen",
    kurz: "Kunden sehen ihren Auftragsstatus selbst – das spart Rückfragen am Telefon.",
    punkte: [
      "Eigener Login je Kunde",
      "Auftragsstatus, Termine und Dokumente einsehbar",
      "Anfragen und Freigaben direkt im Portal",
      "Design passend zur Website"
    ]
  },
  {
    id: "mitarbeiterportal", name: "Mitarbeiterportal", kategorie: "portal",
    preis: 990, aufwand: "2–3 Wochen",
    kurz: "Der interne Arbeitsplatz fürs Team – am Handy genauso nutzbar wie am Rechner.",
    punkte: [
      "Tagesplan, Aufträge und Ansprechpartner",
      "Rollen und Rechte je Mitarbeiter",
      "Interne Mitteilungen und Dateien",
      "Läuft im Browser, ohne App-Installation"
    ]
  },
  {
    id: "shop", name: "Shop & Bestellabwicklung", kategorie: "portal",
    preis: 1490, aufwand: "3–5 Wochen",
    kurz: "Produkte verkaufen und Bestellungen vom Eingang bis zum Versand sauber verarbeiten.",
    punkte: [
      "Produktverwaltung mit Varianten und Staffelpreisen",
      "Checkout, Zahlungsarten und Versandregeln",
      "Bestellstatus, Rechnung und Lieferschein",
      "Pflichtangaben und Rechtstexte eingebunden"
    ]
  },
  {
    id: "konfigurator", name: "Produktkonfigurator", kategorie: "portal",
    preis: 1290, aufwand: "3 Wochen",
    kurz: "Für erklärungsbedürftige Produkte: der Kunde stellt zusammen, das System rechnet mit.",
    punkte: [
      "Schrittweise Auswahl mit Live-Preis",
      "Abhängigkeiten und Ausschlüsse zwischen Optionen",
      "Ergebnis als Angebot oder Bestellung",
      "Auch für Maß- und Sonderanfertigungen"
    ]
  },
  {
    id: "vermietung", name: "Vermietung & Reservierung", kategorie: "portal",
    preis: 1190, aufwand: "3 Wochen",
    kurz: "Geräte, Räume oder Fahrzeuge zeitbasiert vergeben – mit Verfügbarkeit und Rückgabe.",
    punkte: [
      "Verfügbarkeitskalender je Objekt",
      "Reservierung mit Kaution und Vertrag",
      "Übergabe- und Rückgabeprotokoll",
      "Abrechnung nach Stunden, Tagen oder Wochen"
    ]
  },
  {
    id: "zahlung", name: "Zahlungsanbindung", kategorie: "portal",
    preis: 590, basis: true, aufwand: "1 Woche",
    kurz: "Erweiterung: Rechnungen und Bestellungen direkt online bezahlbar machen.",
    punkte: [
      "Kartenzahlung, Lastschrift und Sofortüberweisung",
      "Zahlungsstatus fließt automatisch zurück",
      "Zahlungslink in jeder Rechnung",
      "Gebühren des Zahlungsdienstes fallen zusätzlich an"
    ]
  },

  /* --- Sichtbarkeit bei Google --------------------------------------------- */
  {
    id: "seo-einrichtung", name: "Einrichtung bei Suchmaschinen", kategorie: "sichtbar",
    preis: 499, nurKauf: true, aufwand: "1–2 Wochen", badge: "Empfohlen",
    kurz: "Damit Ihre Website bei Google und Co. überhaupt auftaucht – vollständig eingerichtet und angemeldet.",
    punkte: [
      "Anmeldung bei Google, Bing und Ecosia inklusive Inhaberbestätigung",
      "Google Unternehmensprofil eingerichtet: Adresse, Öffnungszeiten, Leistungen, Fotos",
      "Titel, Beschreibungen und Seitenstruktur für jede Seite optimiert",
      "Eintrag in relevante Branchen- und Kartendienste",
      "Technische Grundlagen: Sitemap, Ladezeit, mobile Darstellung, Datenstruktur"
    ]
  },
  {
    id: "seo-betreuung", name: "Laufende Sichtbarkeits-Betreuung", kategorie: "sichtbar",
    preis: 0, monat: 89, aufwand: "laufend",
    kurz: "Sichtbarkeit ist kein Zustand, sondern eine Pflege. Monatliche Betreuung statt einmaliger Aktion.",
    punkte: [
      "Monatsbericht: Wo stehen Sie, wonach wurde gesucht, wer hat angerufen",
      "Laufende Anpassung von Texten und Suchbegriffen",
      "Pflege des Unternehmensprofils, Reaktion auf Bewertungen",
      "Überwachung technischer Fehler, die die Auffindbarkeit stören",
      "Monatlich kündbar"
    ]
  },
  {
    id: "lokal", name: "Lokale Sichtbarkeit erweitern", kategorie: "sichtbar",
    preis: 390, nurKauf: true, aufwand: "1 Woche",
    kurz: "Für Betriebe mit festem Einzugsgebiet: gezielt in der eigenen Region gefunden werden.",
    punkte: [
      "Eigene Seiten für Ihre Einsatzorte und Leistungen",
      "Einheitliche Firmendaten über alle Verzeichnisse hinweg",
      "Karteneinbindung und Anfahrtsangaben",
      "Bewertungsaufforderung nach Auftragsabschluss vorbereitet"
    ]
  },

  /* --- KI & Auswertung ----------------------------------------------------- */
  {
    id: "auswertung", name: "Auswertungen & Dashboard", kategorie: "ki",
    preis: 690, aufwand: "1–2 Wochen",
    kurz: "Die Zahlen, die tatsächlich zu Entscheidungen führen – nicht die, die gut aussehen.",
    punkte: [
      "Kennzahlen zu Anfragen, Aufträgen und Umsatz",
      "Zeitvergleiche und Entwicklung",
      "Auswertung nach Kunde, Projekt oder Mitarbeiter",
      "Export als PDF oder Tabelle"
    ]
  },
  {
    id: "ki-assistent", name: "KI-Kundenassistent", kategorie: "ki",
    preis: 1490, monat: 29, aufwand: "2–3 Wochen", badge: "Neu",
    kurz: "Beantwortet wiederkehrende Kundenfragen auf Basis Ihrer eigenen Inhalte – rund um die Uhr.",
    punkte: [
      "Antworten ausschließlich aus freigegebenen Texten",
      "Übergabe an das Kontaktformular bei echten Anfragen",
      "Protokoll aller Konversationen",
      "Laufende Kosten je nach Nutzungsvolumen"
    ]
  },
  {
    id: "ki-wissen", name: "Internes KI-Wissenssystem", kategorie: "ki",
    preis: 1290, monat: 29, aufwand: "2–3 Wochen",
    kurz: "Das Firmenwissen wird durchsuchbar: Anleitungen, Preise, Abläufe, Vorlagen.",
    punkte: [
      "Suche in eigenen Dokumenten und Handbüchern",
      "Antworten mit Quellenangabe zum Nachlesen",
      "Zugriff nur für berechtigte Mitarbeiter",
      "Getrennt von öffentlichen Inhalten"
    ]
  },
  {
    id: "ki-anfragen", name: "KI-Anfragenerfassung", kategorie: "ki",
    preis: 1190, monat: 39, aufwand: "2–3 Wochen", badge: "Neu",
    kurz: "Formlose Anfragen per E-Mail werden gelesen, strukturiert und als Vorgang angelegt.",
    punkte: [
      "Erkennt Kunde, Anliegen, Ort und Dringlichkeit",
      "Legt den Vorgang an und schlägt eine Antwort vor",
      "Freigabe bleibt immer beim Menschen",
      "Laufende Kosten je nach Anfragemenge"
    ]
  },

  /* --- Betrieb & Pflege ---------------------------------------------------- */
  {
    id: "wartung", name: "Wartung & Support", kategorie: "laufend",
    preis: 0, monat: 49, aufwand: "laufend",
    kurz: "Laufende Pflege, damit das System sicher, aktuell und lauffähig bleibt.",
    punkte: [
      "Sicherheitsupdates und Aktualisierungen",
      "Tägliche Sicherung mit Wiederherstellung",
      "Fehlerbehebung und fester Ansprechpartner",
      "Monatlich kündbar"
    ]
  },
  {
    id: "hosting", name: "Hosting & Betrieb", kategorie: "laufend",
    preis: 0, monat: 29, aufwand: "laufend",
    kurz: "Serverbetrieb in Deutschland inklusive Zertifikat und Postfach-Einrichtung.",
    punkte: [
      "Serverstandort Deutschland, DSGVO-konform",
      "SSL-Zertifikat und Domainverwaltung",
      "E-Mail-Postfächer einrichten",
      "Monatlich kündbar"
    ]
  },
  {
    id: "server", name: "Eigener Server: Vermittlung & Einrichtung", kategorie: "laufend",
    preis: 899, nurKauf: true, aufwand: "1–2 Wochen",
    kurz: "Ein eigener Server statt geteiltem Webspace – wir finden den passenden Anbieter und richten alles ein.",
    punkte: [
      "Bedarfsanalyse: Leistung, Speicher, Standort und Ausfallsicherheit",
      "Anbietervergleich und Vermittlung – Vertrag läuft direkt auf Ihren Namen",
      "Vollständige Einrichtung: Betriebssystem, Absicherung, Zertifikate, Postfächer",
      "Automatische Sicherungen und Überwachung eingerichtet",
      "Übergabe aller Zugänge und eine verständliche Dokumentation",
      "Servermiete zahlen Sie direkt an den Anbieter, meist 15–60 € im Monat"
    ]
  },
  {
    id: "schulung", name: "Einführung & Schulung", kategorie: "laufend",
    preis: 390, aufwand: "je Termin",
    kurz: "Eine Software wird erst genutzt, wenn das Team sie versteht – dafür ist dieser Termin da.",
    punkte: [
      "Einweisung vor Ort oder online",
      "Kurzanleitung für den Alltag",
      "Übernahme vorhandener Daten",
      "Preis je halbtägigem Termin"
    ]
  }
];

/* ==========================================================================
   Mietmodell
   --------------------------------------------------------------------------
   Alternativ zum Kauf kann jedes Modul monatlich gemietet werden. Die Miete
   wird automatisch aus dem Kaufpreis berechnet und auf einen Betrag mit der
   Endziffer 9 gerundet – so bleibt die Preisliste bei Änderungen stimmig.

   satz          Monatsmiete in Prozent des Kaufpreises
   grundgebuehr  monatliche Basis: Hosting, Wartung, Updates und Support
   mindestlaufzeit / kuendigung  erscheinen als Hinweis auf der Seite
   ========================================================================== */

window.MIETE = {
  satz: 0.06,            /* Monatsmiete in Prozent des Kaufpreises */
  einrichtung: 149,      /* einmalige Einrichtungspauschale je Mietvertrag */
  grundgebuehr: 79,      /* deckt Hosting (29) und Wartung (49) mit Reserve ab */
  mindestlaufzeit: 24,   /* Monate – Vertragslaufzeit */
  verlaengerung: 12,     /* Monate, falls nicht gekündigt wird */
  kuendigung: "3 Monate zum Laufzeitende",
  enthalten: [
    "Hosting auf deutschen Servern",
    "Wartung, Updates und Sicherheitspatches",
    "Tägliche Datensicherung",
    "Support per E-Mail und Telefon",
    "Einrichtung, Grundkonfiguration und Einweisung (einmalig 149 €)"
  ]
};

/* Miete je Modul: 6 % des Kaufpreises, aufgerundet auf die nächste Stufe mit
   Endziffer 9. Über die Laufzeit von 24 Monaten ergibt das rund 145–160 % des
   Kaufpreises – der Aufschlag deckt Betrieb, Support und Ausfallrisiko. */

window.MODULE.forEach(function (m) {
  if (m.kategorie === "laufend" || m.nurKauf) { m.miete = 0; return; }   // nicht mietbar
  m.miete = m.preis > 0 ? Math.max(29, Math.ceil(m.preis * window.MIETE.satz / 10) * 10 - 1) : 0;
});

/* Namensregister – wird auf der Startseite gebraucht, um eine per Link
   übergebene Modulauswahl im Kontaktformular auszuschreiben. */
window.MODULE_NAMEN = window.MODULE.reduce(function (a, m) { a[m.id] = m.name; return a; }, {});
