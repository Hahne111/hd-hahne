/* ==========================================================================
   HAHNE DIGITAL – Beispielansichten für den Modulkatalog
   --------------------------------------------------------------------------
   Für jedes hier hinterlegte Modul erscheint auf der Kachel ein Button
   "Beispiel ansehen". Alle Daten sind frei erfunden.

   Aufbau je Eintrag:
     titel      Überschrift im Fenster
     fenster    Beschriftung der Fensterleiste
     stats      bis zu drei Kennzahlen [Wert, Beschriftung]
     spalten    Spaltenüberschriften der Tabelle
     zeilen     Tabelleninhalte
     erklaerung Was der Betrachter hier eigentlich sieht (einfache Sprache)
   ========================================================================== */

window.MODULE_DEMOS = {

  crm: {
    titel: "Alle Kunden auf einen Blick",
    fenster: "Kundenverwaltung",
    stats: [["128", "Kunden"], ["14", "offene Vorgänge"], ["7", "Wiedervorlagen"]],
    spalten: ["Kunde", "Vorgang", "Status"],
    zeilen: [
      ["Muster GmbH", "Angebot 2026-441", "Offen"],
      ["Nordservice KG", "Wartungstermin", "Heute"],
      ["Beispiel & Co.", "Auftrag 2026-118", "In Arbeit"],
      ["Frau Petersen", "Rückruf gewünscht", "Wiedervorlage"]
    ],
    erklaerung: "Statt in Notizzetteln, E-Mails und drei Excel-Listen zu suchen, steht hier zu jedem Kunden, was zuletzt passiert ist und was als Nächstes ansteht. Wer den Kunden anruft, sieht sofort den ganzen Verlauf."
  },

  angebote: {
    titel: "Angebote und Rechnungen nachverfolgen",
    fenster: "Angebote & Rechnungen",
    stats: [["24", "Entwürfe"], ["18", "versendet"], ["6", "noch offen"]],
    spalten: ["Nummer", "Betrag", "Status"],
    zeilen: [
      ["RE-2026-0814", "1.249,00 €", "Bezahlt"],
      ["AN-2026-0441", "2.890,00 €", "Beim Kunden"],
      ["RE-2026-0815", "640,00 €", "Versendet"],
      ["RE-2026-0798", "412,50 €", "Überfällig"]
    ],
    erklaerung: "Ein Angebot wird per Klick zum Auftrag und später zur Rechnung – die Daten werden dabei nicht neu eingetippt. Die Spalte Status zeigt, bei welcher Rechnung das Geld noch fehlt."
  },

  kalender: {
    titel: "Termine landen automatisch im Handy",
    fenster: "Termine & Kalender",
    stats: [["9", "Termine heute"], ["1×", "Einrichtung je Gerät"], ["3", "Kalendersysteme"]],
    spalten: ["Zeitpunkt", "Termin", "Übertragung"],
    zeilen: [
      ["Mo 17.08. · 10:00", "Wartung Nordservice", "Im Kalender"],
      ["Mo 17.08. · 14:30", "Beratung Muster GmbH", "Zeit geändert"],
      ["Di 18.08. · 09:00", "Serviceeinsatz", "Neu übertragen"],
      ["Di 18.08. · 13:00", "Aufmaß Neubau", "Im Kalender"]
    ],
    erklaerung: "Der Kalender wird am Handy einmal abonniert – so ähnlich wie ein Feiertagskalender. Danach erscheinen neue Termine, Verschiebungen und Absagen von selbst, ohne dass jemand etwas abtippt."
  },

  plantafel: {
    titel: "Wer ist diese Woche wo?",
    fenster: "Einsatzplanung",
    stats: [["6", "Mitarbeiter"], ["23", "geplante Einsätze"], ["0", "Doppelbelegungen"]],
    spalten: ["Mitarbeiter", "Montag", "Dienstag"],
    zeilen: [
      ["T. Berger", "Baustelle Kiel", "Baustelle Kiel"],
      ["M. Ahrens", "Wartung Nord", "Urlaub"],
      ["S. Lorenz", "Notdienst", "Aufmaß Rendsburg"],
      ["K. Petersen", "Werkstatt", "Baustelle Kiel"]
    ],
    erklaerung: "Die Magnettafel im Büro als Bildschirmversion: Einsätze werden mit der Maus verschoben. Wer eingeplant wird, sieht das sofort auf dem eigenen Handy – Rückfragen per Anruf entfallen."
  },

  zeiterfassung: {
    titel: "Arbeitszeiten ohne Stundenzettel",
    fenster: "Zeiterfassung",
    stats: [["162 h", "diesen Monat"], ["4", "Projekte"], ["2", "offene Freigaben"]],
    spalten: ["Mitarbeiter", "Projekt", "Zeit"],
    zeilen: [
      ["T. Berger", "Neubau Rendsburg", "7,5 h"],
      ["M. Ahrens", "Wartung Nordservice", "3,0 h"],
      ["S. Lorenz", "Werkstatt intern", "5,25 h"],
      ["K. Petersen", "Neubau Rendsburg", "8,0 h"]
    ],
    erklaerung: "Jeder erfasst seine Zeit am Handy – mit einem Tipp auf Start und Stopp. Am Monatsende steht fest, wie viele Stunden auf welchem Projekt gelandet sind, ohne Zettel zu sammeln und abzutippen."
  },

  fahrtenbuch: {
    titel: "Fahrten sauber getrennt",
    fenster: "Fahrtenbuch",
    stats: [["142", "Fahrten"], ["3.480 km", "gefahren"], ["78 %", "geschäftlich"]],
    spalten: ["Datum & Ziel", "Strecke", "Zuordnung"],
    zeilen: [
      ["14.08. · Kunde Nord", "86 km", "Geschäftlich"],
      ["13.08. · Werkstatt", "24 km", "Geschäftlich"],
      ["12.08. · Privatfahrt", "31 km", "Privat"],
      ["11.08. · Baustelle Kiel", "52 km", "Geschäftlich"]
    ],
    erklaerung: "Jede Fahrt wird mit Kilometerstand, Ziel und Zweck erfasst und als geschäftlich oder privat markiert. Am Jahresende entsteht daraus die Auswertung, die die Buchhaltung braucht."
  },

  lager: {
    titel: "Bestände und Nachbestellung",
    fenster: "Lagerverwaltung",
    stats: [["1.240", "Artikel"], ["8", "unter Mindestbestand"], ["3", "Lagerorte"]],
    spalten: ["Artikel", "Bestand", "Hinweis"],
    zeilen: [
      ["Kabel NYM 3×1,5", "420 m", "ausreichend"],
      ["Dichtring 22 mm", "12 Stk.", "nachbestellen"],
      ["Montageschaum", "38 Dosen", "ausreichend"],
      ["Sicherung C16", "5 Stk.", "nachbestellen"]
    ],
    erklaerung: "Das System kennt den Bestand in Werkstatt, Lager und sogar im Fahrzeug. Fällt ein Artikel unter die hinterlegte Mindestmenge, erscheint er automatisch auf der Nachbestellliste."
  },

  shop: {
    titel: "Bestellungen verarbeiten",
    fenster: "Shop & Bestellungen",
    stats: [["38", "Bestellungen"], ["4.820 €", "Umsatz"], ["12", "Versand offen"]],
    spalten: ["Bestellung", "Betrag", "Status"],
    zeilen: [
      ["#1048", "129,90 €", "Neu"],
      ["#1047", "349,00 €", "Bezahlt"],
      ["#1046", "89,00 €", "Versendet"],
      ["#1045", "212,40 €", "Versendet"]
    ],
    erklaerung: "Vom Klick des Kunden bis zum Paketaufkleber in einem Ablauf: Bestellung, Zahlung, Rechnung und Versand hängen zusammen, statt in vier verschiedenen Programmen zu liegen."
  },

  service: {
    titel: "Serviceaufträge vom Eingang bis zur Unterschrift",
    fenster: "Serviceaufträge",
    stats: [["3", "offene Fälle"], ["9", "Termine heute"], ["92 %", "erledigt"]],
    spalten: ["Auftrag", "Kunde", "Status"],
    zeilen: [
      ["Heizung ohne Warmwasser", "Fam. Petersen", "Unterwegs"],
      ["Jahreswartung", "Nordservice KG", "Bestätigt"],
      ["Störung Lüftung", "Muster GmbH", "Neu"],
      ["Nachbesserung Bad", "Fam. Jansen", "Erledigt"]
    ],
    erklaerung: "Der Monteur öffnet den Auftrag am Handy, arbeitet die Checkliste ab, macht Fotos und lässt den Kunden direkt auf dem Bildschirm unterschreiben. Der Bericht ist damit fertig, bevor er im Auto sitzt."
  },

  erechnung: {
    titel: "Rechnung im geforderten Format",
    fenster: "E-Rechnung",
    stats: [["100 %", "Pflichtfelder geprüft"], ["2", "Formate"], ["0", "Rückläufer"]],
    spalten: ["Rechnung", "Format", "Prüfung"],
    zeilen: [
      ["RE-2026-0814", "ZUGFeRD-PDF", "Gültig"],
      ["RE-2026-0815", "XRechnung", "Gültig"],
      ["RE-2026-0816", "ZUGFeRD-PDF", "Gültig"],
      ["RE-2026-0817", "XRechnung", "Wird geprüft"]
    ],
    erklaerung: "Eine E-Rechnung sieht für Sie aus wie ein normales PDF, enthält aber zusätzlich maschinenlesbare Daten. Große Auftraggeber und Behörden verlangen genau dieses Format – das System prüft vor dem Versand, ob alle Pflichtangaben vorhanden sind."
  },

  kundenportal: {
    titel: "Der Kunde sieht seinen Stand selbst",
    fenster: "Kundenportal",
    stats: [["46", "aktive Zugänge"], ["−38 %", "Statusanrufe"], ["24/7", "erreichbar"]],
    spalten: ["Vorgang", "Nächster Schritt", "Status"],
    zeilen: [
      ["Auftrag 2026-118", "Montage am 21.08.", "In Arbeit"],
      ["Angebot 2026-441", "Ihre Freigabe fehlt", "Wartet auf Sie"],
      ["Rechnung 0814", "beglichen", "Abgeschlossen"],
      ["Wartungsvertrag", "nächster Termin 03/2027", "Läuft"]
    ],
    erklaerung: "Kunden melden sich mit einem eigenen Zugang an und sehen, wie weit ihr Auftrag ist, welche Termine anstehen und welche Dokumente vorliegen. Das ersetzt einen Großteil der Anrufe mit der Frage „Wie sieht es aus?“."
  },

  "ki-assistent": {
    titel: "Wiederkehrende Fragen beantworten",
    fenster: "KI-Kundenassistent",
    stats: [["214", "Fragen im Monat"], ["81 %", "direkt beantwortet"], ["41", "Anfragen weitergeleitet"]],
    spalten: ["Frage des Besuchers", "Quelle", "Ergebnis"],
    zeilen: [
      ["Kommen Sie auch nach Rendsburg?", "Leistungsseite", "Beantwortet"],
      ["Was kostet eine Wartung?", "Preisliste", "Beantwortet"],
      ["Können Sie Freitag um 9 Uhr?", "—", "An Sie übergeben"],
      ["Machen Sie auch Notdienst?", "Serviceseite", "Beantwortet"]
    ],
    erklaerung: "Der Assistent antwortet ausschließlich mit Inhalten, die Sie freigegeben haben – er denkt sich nichts aus. Sobald es konkret wird, etwa bei Terminen oder Preisen im Einzelfall, gibt er an Sie ab."
  }
};
