/* ==========================================================================
   HAHNE DIGITAL – Wissensbasis des Seitenassistenten
   --------------------------------------------------------------------------
   Der Assistent antwortet ausschließlich mit den hier hinterlegten Inhalten
   und mit den Modul- und Preisdaten aus modules.js. Er stellt KEINE
   Verbindung ins Internet her und sendet nichts an einen Server.

   Neue Antwort ergänzen:
     {
       id:       eindeutiger Name,
       fragen:   Stichwörter und Formulierungen, auf die reagiert wird
       antwort:  Text (HTML erlaubt)
       link:     optional { text: "...", href: "..." }
     }
   Je mehr Formulierungen unter "fragen" stehen, desto sicherer wird
   die Frage erkannt.
   ========================================================================== */

window.ASSISTENT_WISSEN = [

  /* --- Einstieg ---------------------------------------------------------- */
  {
    id: "leistungen",
    fragen: ["was macht ihr", "was bietet ihr an", "leistungen", "angebot", "womit beschäftigt ihr euch",
             "was kann hahne digital", "dienstleistungen", "was macht ihr eigentlich"],
    antwort: "Wir entwickeln fünf Dinge: <b>Internetpräsenzen</b> (Unternehmenswebsites), <b>Shopsysteme</b> zum Verkauf im Netz, <b>Firmenmodule</b> für interne Abläufe wie Kundenverwaltung oder Zeiterfassung, <b>KI-Lösungen</b> mit klarem betrieblichem Nutzen, und die <b>Einrichtung bei Suchmaschinen</b>, damit Sie bei Google überhaupt gefunden werden. Der Schwerpunkt liegt auf Systemen, die Arbeit abnehmen – nicht auf reiner Optik.",
    link: { text: "Leistungen ansehen", href: "index.html#leistungen" }
  },
  {
    id: "modul-was",
    fragen: ["was ist ein modul", "was bedeutet modul", "modul erklärung", "was sind module",
             "wie funktioniert das mit den modulen", "baustein"],
    antwort: "Ein Modul ist ein einzelner Baustein, der genau eine Aufgabe im Betrieb übernimmt – etwa Kunden verwalten, Rechnungen schreiben oder Zeiten erfassen. Sie kaufen nur die Bausteine, die Sie brauchen, und können später jederzeit weitere ergänzen. Alle Module greifen auf dieselben Daten zu: Ein Kunde wird einmal angelegt und ist überall bekannt.",
    link: { text: "Alle Module ansehen", href: "module.html" }
  },
  {
    id: "installation",
    fragen: ["muss ich etwas installieren", "brauche ich eine app", "app store", "software installieren",
             "läuft das auf dem handy", "funktioniert das mobil", "welches betriebssystem", "windows mac"],
    antwort: "Nichts wird installiert. Sie öffnen eine Internetadresse, melden sich an und arbeiten – im Browser am Rechner genauso wie am Handy oder Tablet. Es spielt keine Rolle, ob Sie Windows, Mac, iPhone oder Android nutzen. Auf Wunsch legen wir das System als Symbol auf den Startbildschirm, dann fühlt es sich an wie eine App (Modul „Mobile Nutzung“)."
  },

  /* --- Preise ------------------------------------------------------------ */
  {
    id: "preise-allgemein",
    fragen: ["was kostet das", "preise", "wie teuer", "kosten", "preisliste", "was muss ich zahlen",
             "budget", "was kostet eine website", "was kostet eine internetseite"],
    antwort: "Es gibt drei Einstiegspakete: <b>Business Website ab 990 €</b>, <b>Business System ab 2.490 €</b> und <b>Digital Platform</b> nach Bedarf. Einzelne Module beginnen bei 390 € zum Kauf oder 29 € im Monat zur Miete (dort einmalig 149 € Einrichtung). Alle Preise sind netto und „ab“-Preise – der genaue Betrag steht im Angebot nach einem kurzen Gespräch.",
    link: { text: "Module und Preise", href: "module.html" }
  },
  {
    id: "kauf-miete",
    fragen: ["kaufen oder mieten", "miete", "mieten", "monatlich zahlen", "abo", "leasing",
             "unterschied kauf miete", "was ist besser kaufen oder mieten", "ratenzahlung"],
    antwort: "Beides ist möglich. <b>Kauf:</b> Sie zahlen einmalig, das Modul gehört Ihnen samt Daten und Quellcode; Hosting und Wartung kosten separat ab 78 € im Monat und sind monatlich kündbar. <b>Miete:</b> einmalig 149 € Einrichtungspauschale, danach ab 29 € je Modul und Monat plus 79 € Grundgebühr, in der Hosting, Wartung, Updates, Sicherung und Support enthalten sind – dazu gilt eine <b>Vertragslaufzeit von 24 Monaten</b>. Über die Laufzeit gerechnet ist die Miete teurer als der Kauf; sie kostet dafür am Anfang nichts.",
    link: { text: "Beide Wege im Vergleich", href: "module.html#mieten" }
  },
  {
    id: "laufzeit",
    fragen: ["laufzeit", "vertragslaufzeit", "wie lange bin ich gebunden", "kündigungsfrist",
             "kann ich kündigen", "24 monate", "zwei jahre", "bindung", "mindestlaufzeit"],
    antwort: "Bei der <b>Miete</b> beträgt die Vertragslaufzeit <b>24 Monate</b> ab Bereitstellung. Danach verlängert sie sich um jeweils zwölf Monate, wenn nicht drei Monate vor Laufzeitende gekündigt wird. Eine vorzeitige ordentliche Kündigung ist ausgeschlossen – dafür fällt keine Einrichtungsgebühr an, der Aufbau wird über die zwei Jahre getragen. Beim <b>Kauf</b> gibt es keine Bindung; Hosting und Wartung sind dort monatlich kündbar.",
    link: { text: "Details in den AGB", href: "agb.html#miete" }
  },
  {
    id: "einrichtung",
    fragen: ["einrichtungspauschale", "einrichtungsgebühr", "einrichtung", "149", "startkosten",
             "was kostet der einstieg", "einmalige kosten miete", "setup"],
    antwort: "Beim Mietmodell fällt einmalig eine <b>Einrichtungspauschale von 149 €</b> an. Darin enthalten sind die Einrichtung des Systems, die Grundkonfiguration, die Übernahme vorhandener Daten im üblichen Umfang und die Einweisung. Danach zahlen Sie nur noch monatlich: 79 € Grundgebühr plus die Miete der gebuchten Module. Aufwendige Datenübernahmen aus Altsystemen rechnen wir gesondert ab und sprechen das vorher an.",
    link: { text: "Miete im Überblick", href: "module.html#mieten" }
  },
  {
    id: "grundgebuehr",
    fragen: ["grundgebühr", "was ist in der miete enthalten", "79 euro", "was kostet hosting",
             "wartungskosten", "laufende kosten", "monatliche kosten"],
    antwort: "In der Miete deckt die Grundgebühr von 79 € im Monat ab: Hosting auf deutschen Servern, Wartung, Updates und Sicherheitspatches, tägliche Datensicherung sowie Support per E-Mail und Telefon. Beim Kauf buchen Sie diese Leistungen separat – Hosting ab 29 € und Wartung ab 49 € im Monat. Zum Start kommt einmalig die Einrichtungspauschale von 149 € hinzu. Nur bei KI- und Belegerkennungsmodulen fallen zusätzlich die Nutzungskosten der dahinterliegenden Dienste an; die stehen offen an der jeweiligen Kachel."
  },
  {
    id: "wechsel",
    fragen: ["von miete zu kauf", "später kaufen", "wechseln", "umstellen kauf", "erst mieten dann kaufen"],
    antwort: "Ja, ein Wechsel von der Miete in den Kauf ist jederzeit möglich und beendet die laufende Vertragslaufzeit ohne weitere Zahlungspflicht. Wir rechnen dabei <b>50 % der in den letzten zwölf Monaten gezahlten Modulmieten</b> auf den Kaufpreis an. Die Grundgebühr und nutzungsabhängige Kosten sind nicht anrechenbar."
  },
  {
    id: "warum-ab",
    fragen: ["warum ab preis", "warum steht ab", "festpreis", "genauer preis", "verbindlicher preis"],
    antwort: "Weil der Aufwand vom Umfang abhängt: Ein Fahrtenbuch für zwei Fahrzeuge ist etwas anderes als eines für zwanzig mit Anbindung an die Buchhaltung. Der Richtpreis deckt die übliche Ausbaustufe ab. Nach einem kurzen Gespräch nennen wir einen <b>Festpreis</b> – ohne Stundenzettel und ohne Nachforderung."
  },
  {
    id: "zahlung",
    fragen: ["wie bezahle ich", "zahlungsbedingungen", "anzahlung", "rechnung", "zahlungsplan", "raten"],
    antwort: "Bei Projekten gilt üblicherweise: 40 % bei Auftragserteilung, 30 % nach Freigabe des Entwurfs, 30 % nach Abnahme. Bei Projekten unter 1.000 € wird der Gesamtbetrag nach Abnahme berechnet. Rechnungen sind innerhalb von 14 Tagen ohne Abzug fällig. Laufende Leistungen wie Miete oder Wartung werden im vereinbarten Turnus im Voraus abgerechnet.",
    link: { text: "Nachlesen in den AGB", href: "agb.html#verguetung" }
  },

  /* --- Ablauf ------------------------------------------------------------ */
  {
    id: "ablauf",
    fragen: ["wie läuft das ab", "ablauf", "wie fangen wir an", "erste schritte", "wie geht es los",
             "vorgehen", "wie arbeitet ihr"],
    antwort: "In vier Schritten: <b>1. Gespräch</b> – Sie erzählen, was im Alltag hakt, 20 Minuten am Telefon reichen. <b>2. Angebot</b> – Festpreis mit klarer Liste, was enthalten ist. <b>3. Umsetzung</b> – wir bauen und zeigen zwischendurch den Stand. <b>4. Einweisung</b> – wir übernehmen Ihre Daten und zeigen dem Team, wie es geht. Ein Lastenheft brauchen Sie nicht.",
    link: { text: "Ablauf ansehen", href: "index.html#ablauf" }
  },
  {
    id: "dauer",
    fragen: ["wie lange dauert", "dauer", "wann fertig", "umsetzungszeit", "lieferzeit", "zeitrahmen"],
    antwort: "Ein einzelnes Modul liegt meist bei ein bis drei Wochen ab Freigabe, größere Kombinationen bei sechs bis zehn Wochen. Die genaue Spanne steht bei jedem Modul im Katalog. Entscheidend ist oft, wie schnell Inhalte und Freigaben von Ihrer Seite kommen.",
    link: { text: "Modulkatalog", href: "module.html" }
  },
  {
    id: "datenuebernahme",
    fragen: ["alte daten", "daten übernehmen", "excel importieren", "umzug von anderer software",
             "bestehende kundendaten", "migration"],
    antwort: "Meistens ja. Aus Excel-Listen, Adressbüchern oder Altsystemen lassen sich Kunden-, Artikel- und Auftragsdaten übernehmen. Den Aufwand schätzen wir, nachdem wir einen Blick auf die vorhandenen Dateien geworfen haben. Die Einweisung samt Datenübernahme gibt es auch als eigenes Modul ab 390 €."
  },
  {
    id: "eigene-website",
    fragen: ["habe schon eine website", "bestehende seite", "muss ich die website bei euch machen",
             "nur modul ohne website", "webseite vorhanden", "ich habe schon eine webseite", "homepage vorhanden", "bestehende homepage"],
    antwort: "Nein, eine Website von uns ist keine Voraussetzung. Module laufen auch getrennt davon als eigener, geschützter Arbeitsbereich im Browser. Eine vorhandene Website kann verlinkt oder später eingebunden werden."
  },
  {
    id: "individuell",
    fragen: ["mein ablauf steht nicht im katalog", "sonderwunsch", "individuell", "gibt es das nicht",
             "eigene funktion", "spezielle anforderung"],
    antwort: "Dann bauen wir es. Der Katalog zeigt, was häufig gebraucht wird – er ist keine Grenze. Beschreiben Sie den Ablauf, wir schätzen den Aufwand nach denselben Sätzen ein wie bei den Katalogmodulen.",
    link: { text: "Ablauf beschreiben", href: "index.html#kontakt" }
  },

  /* --- Datenschutz & Recht ------------------------------------------------ */
  {
    id: "datenschutz",
    fragen: ["datenschutz", "dsgvo", "wo liegen die daten", "server standort", "sind meine daten sicher",
             "wem gehören die daten", "avv", "auftragsverarbeitung"],
    antwort: "Die Daten liegen auf Servern in Deutschland und gehören Ihnen – auch im Mietmodell. Ein Export ist jederzeit möglich, ebenso am Vertragsende. Für die Verarbeitung im Auftrag schließen wir einen AVV nach Art. 28 DSGVO. Diese Website selbst setzt keine Cookies, nutzt keine Analysewerkzeuge und lädt keine externen Schriftarten – deshalb gibt es hier auch kein Cookie-Banner.",
    link: { text: "Datenschutzerklärung", href: "datenschutz.html" }
  },
  {
    id: "kuendigung-daten",
    fragen: ["was passiert mit den daten wenn ich kündige", "daten nach vertragsende", "export",
             "daten mitnehmen"],
    antwort: "Die Daten gehören immer Ihnen. Bei einer Kündigung erhalten Sie einen vollständigen Export in einem gängigen, maschinenlesbaren Format. Gelöscht wird erst 30 Tage nach Vertragsende, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Was endet, ist das Nutzungsrecht an der Software – nicht der Zugriff auf Ihre eigenen Daten."
  },
  {
    id: "widerruf",
    fragen: ["widerruf", "widerrufsrecht", "kann ich zurücktreten", "privatperson", "verbraucher"],
    antwort: "Verbrauchern steht bei Verträgen, die per Telefon, E-Mail oder außerhalb unserer Geschäftsräume geschlossen werden, ein gesetzliches Widerrufsrecht von 14 Tagen zu. Die vollständige Widerrufsbelehrung finden Sie in den AGB.",
    link: { text: "Widerrufsbelehrung", href: "agb.html#verbraucher" }
  },
  {
    id: "quellcode",
    fragen: ["quellcode", "gehört mir das", "eigentum", "nutzungsrechte", "kann ich das weitergeben"],
    antwort: "Beim Kauf erhalten Sie nach vollständiger Zahlung ein unbeschränktes Nutzungsrecht an den für Sie erstellten Arbeitsergebnissen. Bei der Miete ist das Nutzungsrecht auf die Vertragsdauer beschränkt; ein Anspruch auf Herausgabe des Quellcodes besteht dort nicht.",
    link: { text: "Nutzungsrechte in den AGB", href: "agb.html#nutzungsrechte" }
  },

  /* --- KI ---------------------------------------------------------------- */
  {
    id: "ki-allgemein",
    fragen: ["ki", "künstliche intelligenz", "chatbot", "ai", "kann ki mir helfen", "ki einsetzen"],
    antwort: "Wir setzen KI dort ein, wo sie einen konkreten Ablauf verbessert: als <b>Kundenassistent</b> auf der Website, als <b>internes Wissenssystem</b> für Anleitungen und Preise, oder zur <b>Anfragenerfassung</b>, die formlose E-Mails in strukturierte Vorgänge verwandelt. Wichtig ist uns: KI schlägt vor, entschieden wird von Menschen. Für die inhaltliche Richtigkeit einzelner Ausgaben übernehmen wir keine Gewähr, das steht so auch in den AGB.",
    link: { text: "KI-Module ansehen", href: "module.html" }
  },
  {
    id: "assistent-selbst",
    fragen: ["bist du eine ki", "wer bist du", "wie funktionierst du", "bist du chatgpt", "was bist du",
             "kannst du im internet suchen", "woher weißt du das", "bist du echt", "roboter"],
    antwort: "Ich bin der <b>Website-Assistent</b> von Hahne Digital – keine KI im Sinne eines Sprachmodells, sondern ein Programm, das Ihre Frage mit Stichwörtern gegen eine feste Wissensdatenbank abgleicht. Ich habe <b>keinen Internetzugriff</b>, sende nichts an einen Server und speichere nichts – alles läuft direkt in Ihrem Browser. Deshalb kann ich Fragen zu Hahne Digital, den Modulen und Preisen beantworten, aber nichts darüber hinaus. Sie können mich auch per Mikrofon ansprechen und Antworten vorlesen lassen – die Spracherkennung stellt dabei Ihr Browser bereit, nicht diese Website. Wenn ich etwas nicht weiß, sage ich das. Für ein Gespräch mit einem Menschen wechseln Sie oben zum Live-Chat. Übrigens: Ein deutlich leistungsfähigerer Assistent, der Ihre eigenen Inhalte kennt, ist bei uns als Modul buchbar."
  },

  /* --- Sichtbarkeit -------------------------------------------------------- */
  {
    id: "seo",
    fragen: ["google", "gefunden werden", "suchmaschine", "seo", "suchmaschinenoptimierung", "sichtbarkeit",
             "bei google auftauchen", "ranking", "platzierung", "google eintrag", "unternehmensprofil",
             "wie werde ich gefunden", "niemand findet mich", "bing", "google maps", "karte",
             "was kostet seo", "seo preis", "kosten sichtbarkeit", "was kostet google", "preis suchmaschine",
             "499", "einrichtung suchmaschinen", "sichtbar werden kosten"],
    antwort: "Dafür gibt es die <b>Einrichtung bei Suchmaschinen für einmalig 499 €</b>. Enthalten sind: Anmeldung bei Google, Bing und Ecosia mit Inhaberbestätigung, vollständige Einrichtung Ihres Google Unternehmensprofils, Recherche der Suchbegriffe, die Ihre Kunden wirklich eingeben, Anpassung von Titeln und Beschreibungen jeder Seite, Einträge in Branchen- und Kartendienste sowie die technischen Grundlagen wie Sitemap, Ladezeit und mobile Darstellung. Optional gibt es eine laufende Betreuung ab 89 € im Monat mit Monatsbericht – monatlich kündbar.",
    link: { text: "Warum Sichtbarkeit zählt", href: "module.html#sichtbarkeit" }
  },
  {
    id: "seo-warum",
    fragen: ["warum ist das wichtig", "brauche ich das überhaupt", "reicht nicht eine website",
             "wozu suchmaschinen", "lohnt sich das", "ich lebe von empfehlungen"],
    antwort: "Eine neue Website kennt zunächst niemand – auch Google nicht. Ohne Anmeldung und Einrichtung kann es Monate dauern, bis sie in den Ergebnissen auftaucht, manchmal passiert es gar nicht. Dazu kommt: Selbst wer Sie empfohlen bekommt, googelt Sie vorher. Findet er nichts, entsteht Zweifel. Bei örtlichen Suchen zeigt Google oben einen Kartenausschnitt mit drei Betrieben – diese drei bekommen den Großteil der Anrufe. Wer dort steht, entscheidet sich vor allem über das Unternehmensprofil.",
    link: { text: "Ausführlich erklärt", href: "module.html#sichtbarkeit" }
  },
  {
    id: "seo-garantie",
    fragen: ["platz 1 garantie", "garantieren sie", "wie schnell wirkt das", "erfolg garantiert",
             "wann bin ich vorne", "dauer seo"],
    antwort: "Einen Platz eins garantiert Ihnen niemand seriös – die Reihenfolge bestimmt Google. Wir sorgen dafür, dass Sie überhaupt gefunden werden, dass Ihre Angaben überall stimmen und keine technischen Hürden im Weg stehen. Bei örtlichen Suchen zeigt sich meist innerhalb weniger Wochen eine Wirkung, bei stark umkämpften Begriffen dauert es länger."
  },

  {
    id: "anleitungen",
    fragen: ["anleitung", "erklärung modul", "wie funktioniert das modul", "lohnt sich das für mich",
             "brauche ich das", "macht das sinn", "hilfe zum modul", "beschreibung", "ist das was für mich"],
    antwort: "Zu <b>jedem Modul</b> gibt es eine ausführliche Anleitung mit Schaubildern. Sie sagt Ihnen: Für wen sich das Modul lohnt, <b>für wen eher nicht</b>, ab wann es sich rechnet, wie Sie Schritt für Schritt damit arbeiten – und einen Praxistipp. Den Knopf „Anleitung“ finden Sie an jeder Modulkachel im Katalog.",
    link: { text: "Zu den Anleitungen", href: "anleitung.html" }
  },
  {
    id: "demos",
    fragen: ["demo", "beispiel", "wie sieht das aus", "vorschau", "ausprobieren", "testen",
             "kann ich das sehen", "screenshot", "ansicht", "beispielansicht", "vorführung"],
    antwort: "Ja – für <b>jedes der 47 Module</b> gibt es eine eigene Beispielansicht. Das ist ein Übungsbereich zum Anfassen: Sie können Einträge anlegen, den Status ändern, sortieren, suchen und löschen – bei der Zeiterfassung sogar eine Stoppuhr laufen lassen. Alles bleibt in Ihrem Browser und ist beim Neuladen wieder wie vorher. Gefällt Ihnen ein Modul, übernehmen Sie es von dort mit einem Klick ins Angebot.",
    link: { text: "Zu den Demos", href: "demo.html" }
  },
  {
    id: "domain",
    fragen: ["domain", "internetadresse", "webadresse", "url", "ist meine domain frei", "domain prüfen",
             "domainname", "wunschdomain", "endung", ".de", "adresse im internet", "was kostet eine domain"],
    antwort: "Das können Sie direkt selbst prüfen: Auf der Startseite und im Modulkatalog gibt es ein Suchfeld für Ihre <b>Wunschdomain</b>. Ist die Adresse frei, übernehmen wir sie mit einem Klick ins Angebot. Die Registrierung kostet je nach Endung meist 10 bis 30 € im Jahr und läuft direkt beim Anbieter auf Ihren Namen; Einrichtung und Verbindung mit Ihrem System übernehmen wir. Wichtig: Die Prüfung ist eine Vorabauskunft – verbindlich wird sie erst mit der Bestätigung des Registrars.",
    link: { text: "Domain prüfen", href: "module.html#domain" }
  },
  {
    id: "angebot",
    fragen: ["angebot", "schriftliches angebot", "kostenvoranschlag", "pdf", "angebot bekommen",
             "angebot erstellen", "ausdrucken", "angebot per mail", "angebot drucken", "kostenaufstellung"],
    antwort: "Sie erhalten es sofort: Wählen Sie im Modulkatalog Ihre Module aus und klicken Sie rechts auf <b>„Angebot als PDF erstellen“</b>. Daraus entsteht ein Angebot im DIN-A4-Format mit allen Positionen, Summen und Hinweisen – wahlweise direkt <b>ausdrucken</b>, als <b>PDF speichern</b>, <b>per E-Mail</b> versenden oder <b>per WhatsApp</b> teilen. Das PDF entsteht in Ihrem Browser, Ihre Angaben werden dabei nicht an uns übertragen. Es ist unverbindlich und 30 Tage gültig.",
    link: { text: "Zum Modulkatalog", href: "module.html#katalog" }
  },
  {
    id: "sprachen",
    fragen: ["sprache", "englisch", "english", "türkisch", "türkçe", "chinesisch", "polnisch", "dänisch",
             "arabisch", "andere sprache", "übersetzung", "sprechen sie englisch", "language"],
    antwort: "Die Website lässt sich über das Globus-Symbol oben rechts auf <b>Englisch, Türkisch, Chinesisch, Polnisch, Dänisch und Arabisch</b> umstellen. Die Startseite und alle Bedienelemente erscheinen dann in Ihrer Sprache; Impressum, Datenschutz und AGB bleiben aus rechtlichen Gründen auf Deutsch verbindlich. Schreiben Sie uns gern in Ihrer Sprache – wir antworten auf Deutsch oder Englisch."
  },
  {
    id: "lernen",
    fragen: ["lernst du", "merkst du dir", "wirst du besser", "speicherst du", "erkennst du mich",
             "woher kennst du mich", "cookies", "wie lernst du", "wirst du schlauer", "erinnerst du dich"],
    antwort: "Nur wenn Sie es erlauben. Mit Ihrer Zustimmung merke ich mir <b>auf Ihrem Gerät</b>: welche Themen Sie gelesen haben, welche Antworten geholfen haben und welche Fragen ich nicht beantworten konnte. Damit erkenne ich Sie beim nächsten Besuch wieder und schlage passendere Themen vor. Nichts davon wird an Hahne Digital übertragen – die Auswertung läuft in Ihrem Browser. Sie können das jederzeit über „Merken beenden und Daten löschen“ unten im Fenster rückgängig machen. Sagen Sie nein, funktioniere ich genauso, vergesse aber alles beim Schließen der Seite.",
    link: { text: "Ausführlich im Datenschutz", href: "datenschutz.html#lernfunktion" }
  },
  {
    id: "livechat",
    fragen: ["live chat", "livechat", "mit jemandem sprechen", "echter mensch", "mitarbeiter sprechen",
             "chat", "kann ich chatten", "whatsapp", "sofort antwort", "jemanden erreichen"],
    antwort: "Ja – wechseln Sie oben im Fenster auf den Reiter <b>Live-Chat</b>. Dort schreiben Sie direkt mit uns. Der grüne Punkt zeigt an, ob gerade jemand am Rechner sitzt; erreichbar sind wir montags bis freitags von 8 bis 17 Uhr. Außerhalb dieser Zeiten können Sie trotzdem schreiben – wir melden uns am nächsten Werktag. Für die Zustellung wählen Sie selbst den Weg: WhatsApp, E-Mail oder Anruf."
  },
  {
    id: "sprache",
    fragen: ["mikrofon", "sprechen statt tippen", "sprachsteuerung", "vorlesen", "ton", "sprachausgabe",
             "kann ich reden", "spracheingabe", "audio", "hören"],
    antwort: "Ja. Über das Mikrofon-Symbol im Eingabefeld können Sie Ihre Frage sprechen statt tippen, über das Lautsprecher-Symbol lasse ich Antworten vorlesen. Beides ist standardmäßig aus und wird erst durch Ihre Auswahl aktiviert. Wichtig zu wissen: Die <b>Spracherkennung stellt Ihr Browser</b>, nicht diese Website – bei Chrome und Edge wird die Aufnahme dafür an deren Server übertragen. Deshalb frage ich vor der ersten Nutzung nach. Das Vorlesen erzeugt Ihr Gerät selbst.",
    link: { text: "Details im Datenschutz", href: "datenschutz.html#sprache" }
  },

  {
    id: "server",
    fragen: ["eigener server", "server", "rechenzentrum", "vps", "root server", "dedizierter server",
             "wo läuft das system", "hosting anbieter", "brauche ich einen server", "servermiete",
             "eigene infrastruktur", "899"],
    antwort: "Ja, das bieten wir an: <b>Vermittlung und Einrichtung eines eigenen Servers für einmalig 899 €</b>. Wir klären den Bedarf, vergleichen Anbieter in Deutschland und richten alles betriebsbereit ein – Grundinstallation, Absicherung, Zertifikate, Postfächer, Sicherungen und Überwachung. Wichtig: Der Serververtrag läuft <b>direkt auf Ihren Namen</b>, damit Zugang und Daten Ihnen gehören. Die Servermiete zahlen Sie an den Anbieter, meist 15 bis 60 € im Monat.",
    link: { text: "Mehr dazu", href: "module.html#server" }
  },
  {
    id: "server-noetig",
    fragen: ["brauche ich das überhaupt server", "reicht normales hosting", "wann lohnt sich ein server",
             "unterschied hosting server", "webspace"],
    antwort: "Für eine Website mit Kontaktformular reicht normales Hosting ab 29 € im Monat – da teilen sich mehrere Kunden eine Maschine, was für diesen Zweck völlig genügt. Ein eigener Server lohnt sich, sobald echte Betriebsdaten im System liegen, mehrere Mitarbeiter gleichzeitig arbeiten oder mehrere Module zusammenspielen. Dann gehört die Leistung Ihnen allein, und Sie bestimmen Standort, Sicherungen und Aktualisierungen selbst.",
    link: { text: "Wann sich das lohnt", href: "module.html#server" }
  },

  /* --- Kontakt ----------------------------------------------------------- */
  {
    id: "kontakt",
    fragen: ["kontakt", "wie erreiche ich euch", "telefonnummer", "anrufen", "email", "e-mail",
             "adresse", "wo seid ihr", "standort", "sitz", "termin vereinbaren", "beratung"],
    antwort: "Hahne Digital sitzt in der Schiffbrücke 5, 24340 Eckernförde. Telefonisch erreichen Sie uns unter 0176 20204188. Am schnellsten geht es über den Live-Chat in diesem Fenster oder über das Kontaktformular – beschreiben Sie dort einfach, welcher Ablauf gerade Zeit kostet. Eine Ersteinschätzung ist unverbindlich und kostenlos.",
    link: { text: "Zum Kontaktformular", href: "index.html#kontakt" }
  },
  {
    id: "arbeitsgebiet",
    fragen: ["arbeitet ihr auch außerhalb", "kommt ihr auch nach", "region", "bundesweit", "vor ort",
             "nur schleswig holstein", "entfernung", "hamburg", "kiel", "kommt ihr nach", "anfahrt", "umkreis", "einzugsgebiet"],
    antwort: "Der Sitz ist Eckernförde, gearbeitet wird bundesweit – die Entwicklung findet ohnehin am Rechner statt, Abstimmungen laufen per Telefon oder Videokonferenz. Termine vor Ort sind in Schleswig-Holstein und Hamburg unkompliziert möglich; darüber hinaus sprechen wir kurz über die Anfahrt."
  },
  {
    id: "projektcheck",
    fragen: ["projekt check", "welches modul passt", "was brauche ich", "beratung welches modul",
             "ich weiß nicht was ich brauche", "empfehlung"],
    antwort: "Dafür gibt es den Projekt-Check: vier kurze Fragen, danach eine erste Einordnung, welche Richtung sinnvoll ist. Das Ergebnis wird direkt ins Kontaktformular übernommen, Sie müssen also nichts abtippen.",
    link: { text: "Projekt-Check starten", href: "index.html#berater" }
  },
  {
    id: "referenzen",
    fragen: ["referenzen", "kunden", "beispiele arbeiten", "portfolio", "wen habt ihr schon"],
    antwort: "Auf der Website zeigen wir Beispielansichten der Module mit erfundenen Musterdaten – so sehen Sie den Aufbau, ohne dass echte Kundendaten sichtbar werden. Konkrete Referenzen nennen wir gern im Gespräch, soweit die jeweiligen Kunden zugestimmt haben.",
    link: { text: "Beispielansichten ansehen", href: "module.html#katalog" }
  },
  {
    id: "impressum",
    fragen: ["impressum", "wer steht dahinter", "inhaber", "firma", "rechtsform", "wer seid ihr"],
    antwort: "Hinter Hahne Digital stehen Björn Hahne und Malte Hahne. Die vollständigen Angaben zu Anschrift, Rechtsform und Verantwortlichkeit finden Sie im Impressum.",
    link: { text: "Zum Impressum", href: "impressum.html" }
  },

  /* --- Einzelthemen ------------------------------------------------------- */
  {
    id: "kalender-sync",
    fragen: ["kalender", "termine handy", "termin synchronisieren", "outlook", "google kalender",
             "ical", "termine automatisch"],
    antwort: "Das Kalendermodul stellt jeden bestätigten Termin als Kalendereintrag bereit. Es gibt drei Wege: <b>Kalender-Abo</b> (einmal am Handy einrichten, danach läuft es automatisch – iPhone, Android, Outlook), <b>Einzeltermin per Anhang</b> in der Bestätigungsmail, und auf Wunsch eine <b>Direktanbindung</b> an Google Kalender oder Microsoft 365 mit echtem Schreibzugriff.",
    link: { text: "Modul ansehen", href: "module.html" }
  },
  {
    id: "erechnung",
    fragen: ["e-rechnung", "xrechnung", "zugferd", "elektronische rechnung", "en 16931", "rechnungspflicht"],
    antwort: "Eine E-Rechnung sieht für Sie aus wie ein normales PDF, enthält aber zusätzlich maschinenlesbare Daten nach EN 16931. Große Auftraggeber und Behörden verlangen dieses Format zunehmend. Unser Modul erzeugt XRechnung und ZUGFeRD, prüft vor dem Versand die Pflichtfelder und kann eingehende E-Rechnungen auslesen."
  },
  {
    id: "fahrtenbuch",
    fragen: ["fahrtenbuch", "fahrten erfassen", "kilometer", "finanzamt fahrtenbuch", "dienstwagen"],
    antwort: "Das Fahrtenbuchmodul erfasst Datum, Kilometerstand, Route, Zweck und Fahrer und trennt geschäftliche von privaten Fahrten. Ein wichtiger Hinweis: Damit ein Fahrtenbuch vom Finanzamt anerkannt wird, muss es zeitnah, fortlaufend und nachträglich unveränderbar geführt werden. Diese revisionssichere Variante mit Änderungsprotokoll setzen wir auf Wunsch um – bitte im Gespräch ausdrücklich ansprechen."
  },
  {
    id: "support",
    fragen: ["support", "hilfe nach dem kauf", "wer hilft mir", "störung", "ansprechpartner", "erreichbarkeit", "wartungsvertrag", "brauche ich wartung", "pflege", "updates"],
    antwort: "Mit einem Wartungsvertrag oder im Mietmodell haben Sie einen festen Ansprechpartner für Fragen und Störungen, erreichbar per E-Mail und Telefon zu üblichen Geschäftszeiten. Ohne solchen Vertrag helfen wir nach Aufwand – dann allerdings ohne zugesagte Reaktionszeit."
  },
  {
    id: "schulung",
    fragen: ["schulung", "einweisung", "wie lernt mein team das", "training", "anleitung", "kompliziert"],
    antwort: "Zu jedem Projekt gehört eine Einweisung. Ein halbtägiger Schulungstermin vor Ort oder online kostet 390 €, dazu gibt es eine Kurzanleitung für den Alltag. Grundsatz: Eine Software wird erst genutzt, wenn das Team sie versteht – deshalb bauen wir eher schlicht und erklären lieber einmal mehr."
  }
];
