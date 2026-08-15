/* ==========================================================================
   HAHNE DIGITAL – Beispielansichten je Modul
   --------------------------------------------------------------------------
   Für jedes Modul aus modules.js gibt es hier eine Demo. Sie wird auf der
   Seite demo.html dargestellt und über den Modulkatalog geöffnet.
   Alle Daten sind frei erfunden.

   Aufbau je Eintrag:
     titel       Überschrift der Demo
     fenster     Beschriftung der Fensterleiste
     stats       bis zu drei Kennzahlen [Wert, Beschriftung]
     spalten     Spaltenüberschriften
     zeilen      Tabelleninhalte
     erklaerung  Was der Betrachter hier eigentlich sieht (einfache Sprache)
     aktionen    zwei Schaltflächen in der Werkzeugleiste
   ========================================================================== */

window.MODULE_DEMOS = Object.assign(window.MODULE_DEMOS || {}, {
 "aufgaben": {
  "titel": "Nichts fällt mehr durchs Raster",
  "fenster": "Aufgaben & Wiedervorlage",
  "stats": [
   [
    "7",
    "heute fällig"
   ],
   [
    "3",
    "überfällig"
   ],
   [
    "24",
    "offen gesamt"
   ]
  ],
  "spalten": [
   "Aufgabe",
   "Zuständig",
   "Frist"
  ],
  "zeilen": [
   [
    "Angebot Muster GmbH nachfassen",
    "T. Berger",
    "heute"
   ],
   [
    "Material für Neubau bestellen",
    "M. Ahrens",
    "morgen"
   ],
   [
    "Wartungstermin bestätigen",
    "S. Lorenz",
    "überfällig"
   ],
   [
    "Rechnung 0798 mahnen",
    "Büro",
    "in 3 Tagen"
   ],
   [
    "Rückruf Frau Petersen",
    "T. Berger",
    "heute"
   ]
  ],
  "erklaerung": "Jede Aufgabe hat einen Verantwortlichen und eine Frist – und hängt am passenden Kunden oder Auftrag. Wer morgens die Liste öffnet, sieht sofort, was heute liegen bleibt, wenn nichts passiert.",
  "aktionen": [
   "Aufgabe anlegen",
   "Als erledigt markieren"
  ]
 },
 "terminbuchung": {
  "titel": "Kunden buchen selbst – rund um die Uhr",
  "fenster": "Online-Terminbuchung",
  "stats": [
   [
    "18",
    "Buchungen im Monat"
   ],
   [
    "62 %",
    "außerhalb der Bürozeit"
   ],
   [
    "0",
    "Telefonate dafür"
   ]
  ],
  "spalten": [
   "Zeitpunkt",
   "Leistung",
   "Status"
  ],
  "zeilen": [
   [
    "Mo 17.08. · 08:30",
    "Heizungswartung",
    "bestätigt"
   ],
   [
    "Mo 17.08. · 11:00",
    "Beratung vor Ort",
    "bestätigt"
   ],
   [
    "Di 18.08. · 14:00",
    "Angebotstermin",
    "neu gebucht"
   ],
   [
    "Mi 19.08. · 09:30",
    "Störungsdienst",
    "bestätigt"
   ]
  ],
  "erklaerung": "Der Kunde sieht nur die Zeiten, die Sie freigegeben haben – inklusive Fahrtzeit-Puffer. Er bucht, bekommt Bestätigung und Erinnerung automatisch, und der Termin steht sofort in Ihrem Kalender.",
  "aktionen": [
   "Zeiten freigeben",
   "Sperrzeit eintragen"
  ]
 },
 "bewertungen": {
  "titel": "Aus zufriedenen Kunden werden sichtbare Kunden",
  "fenster": "Bewertungen & Feedback",
  "stats": [
   [
    "4,8",
    "Durchschnitt"
   ],
   [
    "37",
    "Rückmeldungen"
   ],
   [
    "68 %",
    "Antwortquote"
   ]
  ],
  "spalten": [
   "Kunde",
   "Auftrag",
   "Bewertung"
  ],
  "zeilen": [
   [
    "Fam. Petersen",
    "Bad-Sanierung",
    "5 Sterne"
   ],
   [
    "Nordservice KG",
    "Jahreswartung",
    "5 Sterne"
   ],
   [
    "Muster GmbH",
    "Störungsbehebung",
    "4 Sterne"
   ],
   [
    "Fam. Jansen",
    "Heizungstausch",
    "noch offen"
   ]
  ],
  "erklaerung": "Nach jedem abgeschlossenen Auftrag geht automatisch eine kurze Bitte um Rückmeldung raus. Sie sehen sie zuerst intern – gute Stimmen können Sie mit einem Klick auf die Website stellen oder zu Google weiterleiten.",
  "aktionen": [
   "Anfrage senden",
   "Auf Website zeigen"
  ]
 },
 "newsletter": {
  "titel": "Bestandskunden erreichen, ohne Streuverlust",
  "fenster": "Newsletter & Mailversand",
  "stats": [
   [
    "412",
    "Empfänger"
   ],
   [
    "38 %",
    "Öffnungsrate"
   ],
   [
    "100 %",
    "mit Bestätigung"
   ]
  ],
  "spalten": [
   "Versand",
   "Thema",
   "Ergebnis"
  ],
  "zeilen": [
   [
    "12.08.",
    "Wartungsaktion Herbst",
    "38 % geöffnet"
   ],
   [
    "04.07.",
    "Neue Leistung: Wärmepumpe",
    "41 % geöffnet"
   ],
   [
    "21.05.",
    "Urlaubszeiten",
    "35 % geöffnet"
   ],
   [
    "Entwurf",
    "Winterservice",
    "noch nicht versendet"
   ]
  ],
  "erklaerung": "Die Empfänger kommen direkt aus Ihrer Kundenverwaltung. Jede Anmeldung wird mit Bestätigungsmail protokolliert – das ist die rechtliche Voraussetzung – und in jeder Nachricht steht ein Abmeldelink.",
  "aktionen": [
   "Neue Nachricht",
   "Empfänger wählen"
  ]
 },
 "leads": {
  "titel": "Keine Anfrage bleibt liegen",
  "fenster": "Anfragen-Verteilung",
  "stats": [
   [
    "14",
    "Anfragen diese Woche"
   ],
   [
    "1,8 Std.",
    "mittlere Reaktionszeit"
   ],
   [
    "0",
    "unbearbeitet"
   ]
  ],
  "spalten": [
   "Anfrage",
   "Zuständig",
   "Reaktion"
  ],
  "zeilen": [
   [
    "Website-Formular · Kiel",
    "T. Berger",
    "in 40 Min."
   ],
   [
    "Telefon · Eckernförde",
    "Büro",
    "in 12 Min."
   ],
   [
    "E-Mail · Rendsburg",
    "M. Ahrens",
    "offen – 2 Std."
   ],
   [
    "Empfehlung · Schleswig",
    "S. Lorenz",
    "in 3 Std."
   ]
  ],
  "erklaerung": "Jede Anfrage bekommt sofort einen Zuständigen – nach Gebiet oder Leistung. Reagiert niemand, wird eskaliert. Am Monatsende sehen Sie schwarz auf weiß, wie schnell Ihr Betrieb wirklich antwortet.",
  "aktionen": [
   "Regeln festlegen",
   "Zuweisen"
  ]
 },
 "mahnwesen": {
  "titel": "Offene Rechnungen geraten nicht in Vergessenheit",
  "fenster": "Mahnwesen",
  "stats": [
   [
    "6",
    "offene Posten"
   ],
   [
    "2",
    "in Mahnstufe 1"
   ],
   [
    "8.940 €",
    "offener Betrag"
   ]
  ],
  "spalten": [
   "Rechnung",
   "Betrag",
   "Status"
  ],
  "zeilen": [
   [
    "RE-2026-0798",
    "412,50 €",
    "2. Mahnung"
   ],
   [
    "RE-2026-0801",
    "1.249,00 €",
    "1. Mahnung"
   ],
   [
    "RE-2026-0815",
    "640,00 €",
    "fällig in 4 Tagen"
   ],
   [
    "RE-2026-0817",
    "2.890,00 €",
    "offen"
   ]
  ],
  "erklaerung": "Das System kennt Zahlungsziele und erinnert von selbst – erst freundlich, dann bestimmter. Sie geben nur frei, der Rest läuft. Das ist meist der Baustein, der sich am schnellsten bezahlt macht.",
  "aktionen": [
   "Mahnlauf starten",
   "Zahlung buchen"
  ]
 },
 "abo": {
  "titel": "Wiederkehrende Verträge rechnen sich selbst ab",
  "fenster": "Wartungs- & Aborechnungen",
  "stats": [
   [
    "46",
    "laufende Verträge"
   ],
   [
    "3.680 €",
    "planbarer Monatsumsatz"
   ],
   [
    "4",
    "fällig im August"
   ]
  ],
  "spalten": [
   "Vertrag",
   "Turnus",
   "Nächste Rechnung"
  ],
  "zeilen": [
   [
    "Nordservice KG · Wartung",
    "jährlich",
    "01.09.2026"
   ],
   [
    "Muster GmbH · Betreuung",
    "monatlich",
    "01.09.2026"
   ],
   [
    "Fam. Petersen · Heizung",
    "jährlich",
    "15.10.2026"
   ],
   [
    "Beispiel & Co. · Service",
    "quartalsweise",
    "01.10.2026"
   ]
  ],
  "erklaerung": "Wartungsverträge sind planbarer Umsatz – aber nur, wenn sie auch berechnet werden. Hier erstellt ein Knopfdruck alle fälligen Rechnungen des Monats, mit den richtigen Preisen und Zeiträumen.",
  "aktionen": [
   "Rechnungslauf starten",
   "Vertrag anlegen"
  ]
 },
 "dokumente": {
  "titel": "Unterlagen dort, wo sie hingehören",
  "fenster": "Dokumente & Ablage",
  "stats": [
   [
    "1.284",
    "Dokumente"
   ],
   [
    "3",
    "Prüffristen laufen ab"
   ],
   [
    "0",
    "verlorene Dateien"
   ]
  ],
  "spalten": [
   "Dokument",
   "Zuordnung",
   "Hinweis"
  ],
  "zeilen": [
   [
    "Wartungsprotokoll_2026.pdf",
    "Nordservice KG",
    "aktuell"
   ],
   [
    "Angebot_Neubau.pdf",
    "Fam. Jansen",
    "freigegeben"
   ],
   [
    "Pruefbescheinigung_Leiter.pdf",
    "Betriebsmittel",
    "läuft in 30 Tagen ab"
   ],
   [
    "Foto_Baustelle_1408.jpg",
    "Auftrag 2026-118",
    "vom Handy"
   ]
  ],
  "erklaerung": "Statt Unterlagen im Mailpostfach zu suchen: alles beim richtigen Kunden, Auftrag oder Gerät. Fotos landen direkt vom Handy in der Akte, und ablaufende Nachweise melden sich rechtzeitig von selbst.",
  "aktionen": [
   "Hochladen",
   "Frist setzen"
  ]
 },
 "belegscan": {
  "titel": "Eingangsrechnung fotografieren, fertig",
  "fenster": "Belegerkennung",
  "stats": [
   [
    "128",
    "Belege im Monat"
   ],
   [
    "94 %",
    "automatisch erkannt"
   ],
   [
    "6 Std.",
    "gespart"
   ]
  ],
  "spalten": [
   "Beleg",
   "Erkannt",
   "Status"
  ],
  "zeilen": [
   [
    "Großhandel Nord",
    "1.284,60 € · 12.08.",
    "zugeordnet"
   ],
   [
    "Baustoffe Kiel",
    "392,10 € · 11.08.",
    "zugeordnet"
   ],
   [
    "Tankbeleg",
    "98,40 € · 11.08.",
    "Fahrzeug 3"
   ],
   [
    "Werkzeughandel",
    "214,90 € · 10.08.",
    "Prüfung nötig"
   ]
  ],
  "erklaerung": "Foto machen oder PDF weiterleiten – Betrag, Lieferant und Datum werden ausgelesen und dem richtigen Projekt zugeordnet. Sie prüfen und geben frei; abtippen entfällt.",
  "aktionen": [
   "Beleg fotografieren",
   "Freigeben"
  ]
 },
 "datev": {
  "titel": "Zahlen wandern von selbst zur Steuerberatung",
  "fenster": "Buchhaltungs-Schnittstelle",
  "stats": [
   [
    "1",
    "Klick je Monat"
   ],
   [
    "0",
    "abgetippte Belege"
   ],
   [
    "3",
    "Formate unterstützt"
   ]
  ],
  "spalten": [
   "Export",
   "Zeitraum",
   "Status"
  ],
  "zeilen": [
   [
    "DATEV-Buchungsstapel",
    "Juli 2026",
    "übergeben"
   ],
   [
    "Debitoren-Stammdaten",
    "laufend",
    "synchron"
   ],
   [
    "Ausgangsrechnungen",
    "August 2026",
    "in Vorbereitung"
   ],
   [
    "Kassenbuch",
    "Juli 2026",
    "übergeben"
   ]
  ],
  "erklaerung": "Ihre Steuerberatung bekommt die Daten im gewohnten Format – ohne dass jemand Zahlen abtippt. Das spart nicht nur Zeit, es verhindert vor allem Übertragungsfehler.",
  "aktionen": [
   "Export erzeugen",
   "Zeitraum wählen"
  ]
 },
 "kasse": {
  "titel": "Verkauf am Tresen, sauber dokumentiert",
  "fenster": "Kassenmodul",
  "stats": [
   [
    "38",
    "Bons heute"
   ],
   [
    "1.284 €",
    "Tagesumsatz"
   ],
   [
    "TSE",
    "aktiv"
   ]
  ],
  "spalten": [
   "Beleg",
   "Betrag",
   "Zahlart"
  ],
  "zeilen": [
   [
    "Bon 1048",
    "129,90 €",
    "Karte"
   ],
   [
    "Bon 1047",
    "24,50 €",
    "bar"
   ],
   [
    "Bon 1046",
    "349,00 €",
    "Karte"
   ],
   [
    "Bon 1045",
    "18,90 €",
    "bar"
   ]
  ],
  "erklaerung": "Kassieren, Bon drucken, Tagesabschluss – mit angebundener technischer Sicherheitseinrichtung, wie sie das Gesetz verlangt. Die Umsätze fließen automatisch in die Buchhaltung.",
  "aktionen": [
   "Verkauf starten",
   "Tagesabschluss"
  ]
 },
 "kalender-api": {
  "titel": "Termine in Sekunden statt nach Abrufintervall",
  "fenster": "Kalender-Direktanbindung",
  "stats": [
   [
    "< 5 Sek.",
    "bis zur Anzeige"
   ],
   [
    "2",
    "Systeme angebunden"
   ],
   [
    "6",
    "Kalender"
   ]
  ],
  "spalten": [
   "Konto",
   "System",
   "Verbindung"
  ],
  "zeilen": [
   [
    "t.berger@firma.de",
    "Microsoft 365",
    "aktiv"
   ],
   [
    "m.ahrens@firma.de",
    "Google Kalender",
    "aktiv"
   ],
   [
    "Fahrzeug 1",
    "Google Kalender",
    "aktiv"
   ],
   [
    "s.lorenz@firma.de",
    "Microsoft 365",
    "Freigabe fehlt"
   ]
  ],
  "erklaerung": "Erweiterung zum Kalendermodul: Statt dass das Handy den Kalender alle paar Stunden abholt, schreibt das System direkt hinein. Absagen verschwinden dadurch zuverlässig – wichtig, wenn kurzfristig umgeplant wird.",
  "aktionen": [
   "Konto verbinden",
   "Freigabe erneuern"
  ]
 },
 "baustelle": {
  "titel": "Der Bericht ist fertig, bevor Sie im Auto sitzen",
  "fenster": "Auftragsdokumentation",
  "stats": [
   [
    "96",
    "Fotos im Monat"
   ],
   [
    "12",
    "Abnahmen"
   ],
   [
    "0",
    "Nachfragen zum Zustand"
   ]
  ],
  "spalten": [
   "Auftrag",
   "Dokumentation",
   "Status"
  ],
  "zeilen": [
   [
    "Neubau Rendsburg",
    "14 Fotos · Bautagebuch",
    "laufend"
   ],
   [
    "Bad Fam. Jansen",
    "8 Fotos · Abnahme",
    "unterschrieben"
   ],
   [
    "Störung Muster GmbH",
    "3 Fotos · Bericht",
    "abgeschlossen"
   ],
   [
    "Dachsanierung Kiel",
    "21 Fotos · Mängel",
    "2 offen"
   ]
  ],
  "erklaerung": "Fotos mit Zeitstempel, Bautagebuch und Abnahmeprotokoll landen automatisch beim richtigen Auftrag. Bei Streit über den Zustand vor Arbeitsbeginn ist das Gold wert.",
  "aktionen": [
   "Foto aufnehmen",
   "Abnahme starten"
  ]
 },
 "aufmass": {
  "titel": "Maße nehmen, Angebot rechnet mit",
  "fenster": "Aufmaß & Kalkulation",
  "stats": [
   [
    "24",
    "Positionen"
   ],
   [
    "112 m²",
    "ermittelt"
   ],
   [
    "4.280 €",
    "Angebotssumme"
   ]
  ],
  "spalten": [
   "Position",
   "Maß",
   "Menge"
  ],
  "zeilen": [
   [
    "Wandfläche Wohnzimmer",
    "4,20 × 2,60 m",
    "10,92 m²"
   ],
   [
    "Fensterabzug",
    "1,40 × 1,20 m",
    "−1,68 m²"
   ],
   [
    "Bodenfläche",
    "4,20 × 3,80 m",
    "15,96 m²"
   ],
   [
    "Sockelleiste",
    "umlaufend",
    "16,00 m"
   ]
  ],
  "erklaerung": "Sie geben die Maße vor Ort ein, das System rechnet Flächen, Abzüge und Materialbedarf. Aus dem Aufmaß wird per Klick das Angebot – ohne den Umweg über Zettel und Taschenrechner.",
  "aktionen": [
   "Maß erfassen",
   "Ins Angebot"
  ]
 },
 "fuhrpark": {
  "titel": "Wer hat gerade welches Gerät?",
  "fenster": "Fuhrpark & Betriebsmittel",
  "stats": [
   [
    "4",
    "Fahrzeuge"
   ],
   [
    "38",
    "Maschinen"
   ],
   [
    "2",
    "Prüfungen fällig"
   ]
  ],
  "spalten": [
   "Betriebsmittel",
   "Bei wem",
   "Nächste Prüfung"
  ],
  "zeilen": [
   [
    "Transporter EF-HD 123",
    "T. Berger",
    "TÜV 03/2027"
   ],
   [
    "Kernbohrgerät",
    "Baustelle Kiel",
    "UVV in 14 Tagen"
   ],
   [
    "Anhänger",
    "Werkstatt",
    "TÜV 11/2026"
   ],
   [
    "Leiter Nr. 7",
    "M. Ahrens",
    "Prüfung überfällig"
   ]
  ],
  "erklaerung": "Kein Suchen mehr, wo das teure Gerät geblieben ist. Und Prüffristen für TÜV und UVV melden sich rechtzeitig – was bei einem Unfall den Unterschied zwischen Versicherungsschutz und Haftung ausmacht.",
  "aktionen": [
   "Gerät zuweisen",
   "Schaden melden"
  ]
 },
 "mobil": {
  "titel": "Das System als App auf dem Startbildschirm",
  "fenster": "Mobile Nutzung",
  "stats": [
   [
    "100 %",
    "Funktionen mobil"
   ],
   [
    "0 €",
    "App-Store-Gebühren"
   ],
   [
    "ja",
    "auch offline lesbar"
   ]
  ],
  "spalten": [
   "Ansicht",
   "Auf dem Handy",
   "Hinweis"
  ],
  "zeilen": [
   [
    "Tagesplan",
    "voll nutzbar",
    "Startseite"
   ],
   [
    "Auftrag mit Fotos",
    "voll nutzbar",
    "Kamera direkt"
   ],
   [
    "Zeiterfassung",
    "voll nutzbar",
    "ein Fingertipp"
   ],
   [
    "Auswertungen",
    "lesbar",
    "besser am Rechner"
   ]
  ],
  "erklaerung": "Kein Download im App-Store, keine Installation, keine Freigabe durch die IT. Ein Symbol auf dem Startbildschirm, das sich anfühlt wie eine App – und Ihre Daten bleiben auf Ihrem eigenen Server.",
  "aktionen": [
   "Auf Startbildschirm",
   "Offline prüfen"
  ]
 },
 "artikel": {
  "titel": "Ein sauberer Artikelstamm trägt alles andere",
  "fenster": "Artikel & Material",
  "stats": [
   [
    "1.240",
    "Artikel"
   ],
   [
    "18",
    "Lieferanten"
   ],
   [
    "3",
    "Preislisten"
   ]
  ],
  "spalten": [
   "Artikel",
   "Einkauf",
   "Verkauf"
  ],
  "zeilen": [
   [
    "Kabel NYM 3×1,5",
    "0,84 €/m",
    "1,95 €/m"
   ],
   [
    "Dichtring 22 mm",
    "0,42 €",
    "1,20 €"
   ],
   [
    "Montageschaum",
    "4,90 €",
    "11,50 €"
   ],
   [
    "Sicherung C16",
    "1,80 €",
    "4,50 €"
   ]
  ],
  "erklaerung": "Einmal sauber gepflegt, zieht sich der Artikelstamm durch alles: Kalkulation, Angebot, Bestellung, Lager und Rechnung. Preisänderungen des Lieferanten pflegen Sie an einer Stelle statt an fünf.",
  "aktionen": [
   "Artikel anlegen",
   "Preise importieren"
  ]
 },
 "einkauf": {
  "titel": "Bestellen, was wirklich gebraucht wird",
  "fenster": "Einkauf & Bestellwesen",
  "stats": [
   [
    "8",
    "Artikel unter Mindestbestand"
   ],
   [
    "3",
    "offene Bestellungen"
   ],
   [
    "2",
    "Lieferungen heute"
   ]
  ],
  "spalten": [
   "Bestellung",
   "Lieferant",
   "Status"
  ],
  "zeilen": [
   [
    "BE-2026-0142",
    "Großhandel Nord",
    "unterwegs"
   ],
   [
    "BE-2026-0141",
    "Baustoffe Kiel",
    "geliefert"
   ],
   [
    "Vorschlag",
    "Elektro Süd",
    "zur Freigabe"
   ],
   [
    "BE-2026-0139",
    "Werkzeughandel",
    "teilgeliefert"
   ]
  ],
  "erklaerung": "Das System schlägt vor, was bestellt werden muss – aus dem Auftrag oder weil der Mindestbestand unterschritten ist. Beim Wareneingang wird geprüft, ob Menge und Preis zur Bestellung passen.",
  "aktionen": [
   "Bestellvorschlag",
   "Wareneingang buchen"
  ]
 },
 "barcode": {
  "titel": "Entnahme per Handykamera",
  "fenster": "Barcode & Scanner",
  "stats": [
   [
    "0 €",
    "Zusatzgeräte nötig"
   ],
   [
    "2 Sek.",
    "je Buchung"
   ],
   [
    "100 %",
    "Nachvollziehbarkeit"
   ]
  ],
  "spalten": [
   "Vorgang",
   "Artikel",
   "Menge"
  ],
  "zeilen": [
   [
    "Entnahme · T. Berger",
    "Kabel NYM 3×1,5",
    "50 m"
   ],
   [
    "Entnahme · Fahrzeug 2",
    "Dichtring 22 mm",
    "4 Stk."
   ],
   [
    "Inventur · Lager",
    "Montageschaum",
    "38 Dosen"
   ],
   [
    "Rückgabe · Baustelle",
    "Sicherung C16",
    "2 Stk."
   ]
  ],
  "erklaerung": "Statt Strichliste am Regal: Artikel scannen, Menge eintippen, fertig. Die Handykamera reicht – ein Spezialgerät für mehrere hundert Euro brauchen Sie nicht.",
  "aktionen": [
   "Scannen",
   "Etiketten drucken"
  ]
 },
 "personal": {
  "titel": "Personalunterlagen an einer Stelle",
  "fenster": "Personalakte & Urlaub",
  "stats": [
   [
    "9",
    "Mitarbeitende"
   ],
   [
    "3",
    "Urlaubsanträge offen"
   ],
   [
    "2",
    "Nachweise laufen ab"
   ]
  ],
  "spalten": [
   "Mitarbeiter",
   "Vorgang",
   "Status"
  ],
  "zeilen": [
   [
    "T. Berger",
    "Urlaub 12.–23.09.",
    "zur Freigabe"
   ],
   [
    "M. Ahrens",
    "Führerschein-Nachweis",
    "läuft in 21 Tagen ab"
   ],
   [
    "S. Lorenz",
    "Urlaub 01.–05.09.",
    "genehmigt"
   ],
   [
    "K. Petersen",
    "Schulung Arbeitssicherheit",
    "fällig"
   ]
  ],
  "erklaerung": "Stammdaten, Qualifikationen, Nachweise und Abwesenheiten liegen zusammen. Urlaubsanträge kommen digital und der Abwesenheitskalender zeigt sofort, ob die Woche überhaupt besetzt ist.",
  "aktionen": [
   "Antrag prüfen",
   "Nachweis hochladen"
  ]
 },
 "schicht": {
  "titel": "Dienstpläne, die alle sehen",
  "fenster": "Schicht- & Dienstplanung",
  "stats": [
   [
    "4",
    "Wochen im Voraus"
   ],
   [
    "2",
    "Tauschanfragen"
   ],
   [
    "0",
    "Doppelbesetzungen"
   ]
  ],
  "spalten": [
   "Mitarbeiter",
   "Diese Woche",
   "Hinweis"
  ],
  "zeilen": [
   [
    "T. Berger",
    "Früh · 6–14 Uhr",
    "bestätigt"
   ],
   [
    "M. Ahrens",
    "Spät · 14–22 Uhr",
    "Tausch angefragt"
   ],
   [
    "S. Lorenz",
    "Notdienst",
    "bestätigt"
   ],
   [
    "K. Petersen",
    "frei",
    "Urlaub"
   ]
  ],
  "erklaerung": "Der Plan wird einmal erstellt und ist sofort bei allen auf dem Handy. Tauschwünsche laufen geregelt über das System statt über zehn WhatsApp-Nachrichten am Sonntagabend.",
  "aktionen": [
   "Plan veröffentlichen",
   "Tausch genehmigen"
  ]
 },
 "mitarbeiterportal": {
  "titel": "Der Arbeitsplatz fürs Team",
  "fenster": "Mitarbeiterportal",
  "stats": [
   [
    "9",
    "Zugänge"
   ],
   [
    "3",
    "Rollen"
   ],
   [
    "0",
    "Installationen"
   ]
  ],
  "spalten": [
   "Bereich",
   "Sichtbar für",
   "Inhalt"
  ],
  "zeilen": [
   [
    "Tagesplan",
    "alle",
    "Aufträge, Adressen, Zeiten"
   ],
   [
    "Dokumente",
    "Monteure",
    "Anleitungen, Datenblätter"
   ],
   [
    "Auswertungen",
    "Leitung",
    "Zahlen und Kennwerte"
   ],
   [
    "Mitteilungen",
    "alle",
    "Betriebsinfos"
   ]
  ],
  "erklaerung": "Jeder sieht genau das, was er für seine Arbeit braucht – nicht mehr und nicht weniger. Rechte werden je Rolle vergeben, damit Zahlen der Geschäftsleitung auch dort bleiben.",
  "aktionen": [
   "Rolle vergeben",
   "Mitteilung senden"
  ]
 },
 "konfigurator": {
  "titel": "Der Kunde stellt zusammen, das System rechnet",
  "fenster": "Produktkonfigurator",
  "stats": [
   [
    "6",
    "Schritte"
   ],
   [
    "1.284",
    "Kombinationen"
   ],
   [
    "sofort",
    "Preis sichtbar"
   ]
  ],
  "spalten": [
   "Auswahl",
   "Option",
   "Aufpreis"
  ],
  "zeilen": [
   [
    "Material",
    "Eiche massiv",
    "+ 420,00 €"
   ],
   [
    "Breite",
    "2,40 m",
    "+ 180,00 €"
   ],
   [
    "Beschlag",
    "gedämpft",
    "+ 95,00 €"
   ],
   [
    "Oberfläche",
    "geölt",
    "inklusive"
   ]
  ],
  "erklaerung": "Für erklärungsbedürftige Produkte: Der Kunde klickt sich durch, sieht bei jedem Schritt den Preis und bekommt am Ende ein Angebot. Unmögliche Kombinationen schließt das System selbst aus.",
  "aktionen": [
   "Konfiguration starten",
   "Als Angebot"
  ]
 },
 "vermietung": {
  "titel": "Geräte und Räume zeitbasiert vergeben",
  "fenster": "Vermietung & Reservierung",
  "stats": [
   [
    "18",
    "Mietobjekte"
   ],
   [
    "4",
    "heute unterwegs"
   ],
   [
    "92 %",
    "Auslastung"
   ]
  ],
  "spalten": [
   "Objekt",
   "Zeitraum",
   "Status"
  ],
  "zeilen": [
   [
    "Anhänger groß",
    "14.–16.08.",
    "vermietet"
   ],
   [
    "Rüttelplatte",
    "15.08.",
    "heute zurück"
   ],
   [
    "Bauheizer",
    "ab 18.08.",
    "reserviert"
   ],
   [
    "Gerüst 6 m",
    "frei",
    "verfügbar"
   ]
  ],
  "erklaerung": "Verfügbarkeitskalender je Objekt, Reservierung mit Kaution und Vertrag, Übergabe- und Rückgabeprotokoll mit Fotos. So endet der Streit, ob der Kratzer vorher schon da war.",
  "aktionen": [
   "Reservieren",
   "Rückgabe erfassen"
  ]
 },
 "zahlung": {
  "titel": "Rechnungen direkt online bezahlbar",
  "fenster": "Zahlungsanbindung",
  "stats": [
   [
    "61 %",
    "zahlen sofort"
   ],
   [
    "4 Tage",
    "kürzere Zahldauer"
   ],
   [
    "3",
    "Zahlarten"
   ]
  ],
  "spalten": [
   "Rechnung",
   "Zahlart",
   "Status"
  ],
  "zeilen": [
   [
    "RE-2026-0814",
    "Karte",
    "bezahlt"
   ],
   [
    "RE-2026-0815",
    "Lastschrift",
    "bezahlt"
   ],
   [
    "RE-2026-0816",
    "Überweisung",
    "offen"
   ],
   [
    "RE-2026-0817",
    "Zahlungslink",
    "geöffnet"
   ]
  ],
  "erklaerung": "In jeder Rechnung steckt ein Zahlungslink. Der Kunde zahlt mit zwei Klicks, der Status fließt automatisch zurück – das verkürzt die Zeit bis zum Geldeingang spürbar.",
  "aktionen": [
   "Zahlarten wählen",
   "Zahlungslink senden"
  ]
 },
 "seo-einrichtung": {
  "titel": "Von unsichtbar zu auffindbar",
  "fenster": "Sichtbarkeit einrichten",
  "stats": [
   [
    "3",
    "Suchmaschinen angemeldet"
   ],
   [
    "12",
    "Verzeichnisse"
   ],
   [
    "1×",
    "Einrichtung"
   ]
  ],
  "spalten": [
   "Schritt",
   "Umfang",
   "Status"
  ],
  "zeilen": [
   [
    "Google, Bing, Ecosia",
    "Anmeldung + Bestätigung",
    "erledigt"
   ],
   [
    "Unternehmensprofil",
    "Adresse, Zeiten, Fotos",
    "erledigt"
   ],
   [
    "Seitentitel & Beschreibungen",
    "alle Unterseiten",
    "erledigt"
   ],
   [
    "Technik",
    "Sitemap, Ladezeit, Mobil",
    "erledigt"
   ]
  ],
  "erklaerung": "Eine neue Website kennt zunächst niemand – auch Google nicht. Diese Einrichtung sorgt dafür, dass Sie überhaupt auftauchen und dass Ihre Angaben überall gleich und richtig stehen.",
  "aktionen": [
   "Bericht ansehen",
   "Profil öffnen"
  ]
 },
 "seo-betreuung": {
  "titel": "Sichtbarkeit ist Pflege, kein Zustand",
  "fenster": "Sichtbarkeits-Betreuung",
  "stats": [
   [
    "+34 %",
    "Aufrufe im Profil"
   ],
   [
    "18",
    "Anrufe über Google"
   ],
   [
    "monatlich",
    "Bericht"
   ]
  ],
  "spalten": [
   "Suchbegriff",
   "Position",
   "Trend"
  ],
  "zeilen": [
   [
    "heizung notdienst eckernförde",
    "3",
    "steigend"
   ],
   [
    "sanitär eckernförde",
    "5",
    "stabil"
   ],
   [
    "badsanierung schleswig",
    "11",
    "steigend"
   ],
   [
    "klempner in der nähe",
    "7",
    "neu"
   ]
  ],
  "erklaerung": "Jeden Monat sehen Sie schwarz auf weiß, wonach Ihre Kunden gesucht haben, wo Sie stehen und wie viele Anrufe daraus wurden. Texte und Angaben werden laufend nachgeschärft.",
  "aktionen": [
   "Monatsbericht",
   "Begriffe anpassen"
  ]
 },
 "lokal": {
  "titel": "In der eigenen Region ganz vorn",
  "fenster": "Lokale Sichtbarkeit",
  "stats": [
   [
    "6",
    "Einsatzorte"
   ],
   [
    "100 %",
    "gleiche Firmendaten"
   ],
   [
    "1",
    "Karteneintrag"
   ]
  ],
  "spalten": [
   "Ort",
   "Eigene Seite",
   "Status"
  ],
  "zeilen": [
   [
    "Eckernförde",
    "Leistungen vor Ort",
    "online"
   ],
   [
    "Kiel",
    "Leistungen vor Ort",
    "online"
   ],
   [
    "Rendsburg",
    "Leistungen vor Ort",
    "online"
   ],
   [
    "Schleswig",
    "in Vorbereitung",
    "Entwurf"
   ]
  ],
  "erklaerung": "Für Betriebe mit festem Einzugsgebiet: eigene Seiten je Ort und Leistung, überall identische Firmendaten und ein sauberer Karteneintrag. Genau das bewertet Google bei örtlichen Suchen.",
  "aktionen": [
   "Ort ergänzen",
   "Daten prüfen"
  ]
 },
 "auswertung": {
  "titel": "Die Zahlen, die zu Entscheidungen führen",
  "fenster": "Auswertungen & Dashboard",
  "stats": [
   [
    "43 %",
    "Auftragsquote"
   ],
   [
    "18.400 €",
    "Umsatz im Monat"
   ],
   [
    "+12 %",
    "zum Vorjahr"
   ]
  ],
  "spalten": [
   "Kennzahl",
   "Aktuell",
   "Vergleich"
  ],
  "zeilen": [
   [
    "Anfragen",
    "28",
    "+6 zum Vormonat"
   ],
   [
    "Angebote versendet",
    "19",
    "+3"
   ],
   [
    "Aufträge",
    "12",
    "+2"
   ],
   [
    "Ø Auftragswert",
    "1.533 €",
    "−40 €"
   ]
  ],
  "erklaerung": "Nicht die Zahlen, die gut aussehen, sondern die, aus denen sich etwas ableiten lässt: Wie viele Anfragen werden zu Aufträgen, wo bleibt Geld liegen, welcher Monat war wirklich besser.",
  "aktionen": [
   "Zeitraum wählen",
   "Als PDF"
  ]
 },
 "ki-wissen": {
  "titel": "Firmenwissen wird durchsuchbar",
  "fenster": "Internes KI-Wissenssystem",
  "stats": [
   [
    "840",
    "Dokumente"
   ],
   [
    "2 Sek.",
    "bis zur Antwort"
   ],
   [
    "mit Quelle",
    "jede Antwort"
   ]
  ],
  "spalten": [
   "Frage",
   "Gefunden in",
   "Ergebnis"
  ],
  "zeilen": [
   [
    "Welcher Dichtring bei Modell X?",
    "Montagehandbuch S. 42",
    "beantwortet"
   ],
   [
    "Was kostet Anfahrt Kiel?",
    "Preisliste 2026",
    "beantwortet"
   ],
   [
    "Ablauf bei Gewährleistung?",
    "Betriebsanweisung",
    "beantwortet"
   ],
   [
    "Wer hat Kranschein?",
    "Personalakte",
    "nur für Leitung"
   ]
  ],
  "erklaerung": "Der neue Kollege muss nicht dreimal am Tag fragen – er fragt das System. Geantwortet wird nur aus Ihren eigenen Unterlagen, immer mit Quellenangabe zum Nachlesen.",
  "aktionen": [
   "Frage stellen",
   "Dokument hinzufügen"
  ]
 },
 "ki-anfragen": {
  "titel": "Aus formloser Mail wird ein Vorgang",
  "fenster": "KI-Anfragenerfassung",
  "stats": [
   [
    "86 %",
    "richtig erkannt"
   ],
   [
    "12 Min.",
    "gespart je Anfrage"
   ],
   [
    "immer",
    "Freigabe durch Sie"
   ]
  ],
  "spalten": [
   "Eingang",
   "Erkannt",
   "Vorschlag"
  ],
  "zeilen": [
   [
    "„Heizung tropft, bitte schnell“",
    "Störung · Eckernförde · dringend",
    "Notdiensttermin"
   ],
   [
    "„Angebot für neues Bad?“",
    "Anfrage · Kiel · normal",
    "Ortstermin"
   ],
   [
    "„Wann kommen Sie?“",
    "Rückfrage zu Auftrag 118",
    "Statusantwort"
   ],
   [
    "„Rechnung bitte an…“",
    "Adressänderung",
    "Stammdaten prüfen"
   ]
  ],
  "erklaerung": "Kunden schreiben, wie sie sprechen. Das System liest die Mail, erkennt Anliegen, Ort und Dringlichkeit, legt den Vorgang an und schlägt eine Antwort vor. Abgeschickt wird erst, wenn Sie zustimmen.",
  "aktionen": [
   "Vorschlag prüfen",
   "Vorgang anlegen"
  ]
 },
 "wartung": {
  "titel": "Damit das System läuft, ohne dass Sie hinsehen",
  "fenster": "Wartung & Support",
  "stats": [
   [
    "99,8 %",
    "Verfügbarkeit"
   ],
   [
    "täglich",
    "Sicherung"
   ],
   [
    "1",
    "fester Ansprechpartner"
   ]
  ],
  "spalten": [
   "Leistung",
   "Zuletzt",
   "Status"
  ],
  "zeilen": [
   [
    "Sicherheitsupdates",
    "heute Nacht",
    "eingespielt"
   ],
   [
    "Datensicherung",
    "heute 03:00",
    "erfolgreich"
   ],
   [
    "Wiederherstellungstest",
    "01.08.",
    "bestanden"
   ],
   [
    "Supportanfrage",
    "gestern",
    "beantwortet"
   ]
  ],
  "erklaerung": "Software altert. Ohne Updates entstehen Sicherheitslücken, ohne Sicherung ist ein Serverausfall existenzbedrohend. Beides passiert hier im Hintergrund – und wird geprüft, nicht nur behauptet.",
  "aktionen": [
   "Sicherung prüfen",
   "Support anfragen"
  ]
 },
 "hosting": {
  "titel": "Ihr System auf deutschen Servern",
  "fenster": "Hosting & Betrieb",
  "stats": [
   [
    "Deutschland",
    "Serverstandort"
   ],
   [
    "SSL",
    "aktiv"
   ],
   [
    "5",
    "Postfächer"
   ]
  ],
  "spalten": [
   "Dienst",
   "Einstellung",
   "Status"
  ],
  "zeilen": [
   [
    "Webserver",
    "Frankfurt am Main",
    "läuft"
   ],
   [
    "SSL-Zertifikat",
    "automatisch erneuert",
    "gültig"
   ],
   [
    "Domain",
    "ihre-firma.de",
    "verbunden"
   ],
   [
    "E-Mail",
    "info@ihre-firma.de",
    "eingerichtet"
   ]
  ],
  "erklaerung": "Serverstandort Deutschland, verschlüsselte Verbindung, eigene Postfächer, Domain verbunden. Das ist die Grundlage – ohne sie nützt das schönste Modul nichts.",
  "aktionen": [
   "Postfach anlegen",
   "Zertifikat prüfen"
  ]
 },
 "server": {
  "titel": "Eine Maschine, die Ihnen allein gehört",
  "fenster": "Eigener Server",
  "stats": [
   [
    "100 %",
    "Leistung für Sie"
   ],
   [
    "1–2",
    "Wochen Einrichtung"
   ],
   [
    "Ihr Name",
    "im Vertrag"
   ]
  ],
  "spalten": [
   "Schritt",
   "Umfang",
   "Status"
  ],
  "zeilen": [
   [
    "Bedarf klären",
    "Leistung, Speicher, Standort",
    "erledigt"
   ],
   [
    "Anbieter vermitteln",
    "Vertrag auf Ihren Namen",
    "erledigt"
   ],
   [
    "Absicherung",
    "Zugriffsschutz, Zertifikate",
    "erledigt"
   ],
   [
    "Übergabe",
    "Zugänge und Dokumentation",
    "erledigt"
   ]
  ],
  "erklaerung": "Normales Hosting teilen sich viele Kunden. Bei echten Betriebsdaten lohnt eine eigene Maschine: volle Leistung, eigener Standort, eigene Sicherungen – und der Vertrag läuft auf Ihren Namen.",
  "aktionen": [
   "Bedarf prüfen",
   "Zugänge ansehen"
  ]
 },
 "schulung": {
  "titel": "Software wird erst genutzt, wenn sie verstanden ist",
  "fenster": "Einführung & Schulung",
  "stats": [
   [
    "1/2 Tag",
    "je Termin"
   ],
   [
    "9",
    "Teilnehmer"
   ],
   [
    "1",
    "Kurzanleitung"
   ]
  ],
  "spalten": [
   "Thema",
   "Für wen",
   "Dauer"
  ],
  "zeilen": [
   [
    "Erste Schritte im System",
    "alle",
    "45 Min."
   ],
   [
    "Aufträge am Handy",
    "Monteure",
    "30 Min."
   ],
   [
    "Angebote und Rechnungen",
    "Büro",
    "45 Min."
   ],
   [
    "Auswertungen lesen",
    "Leitung",
    "20 Min."
   ]
  ],
  "erklaerung": "Der häufigste Grund, warum Software im Betrieb scheitert, ist nicht die Technik – es ist die fehlende Einweisung. Deshalb gehört sie bei uns dazu, vor Ort oder online.",
  "aktionen": [
   "Termin vereinbaren",
   "Anleitung öffnen"
  ]
 }
});
