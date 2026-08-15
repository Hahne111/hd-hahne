# Hahne Digital – Website

Statische Website, ohne Datenbank oder Framework. Einfach per FTP/SFTP in das
Web-Verzeichnis hochladen – fertig.

## Dateien

    index.html            Startseite
    impressum.html        Impressum (§ 5 DDG, § 18 MStV)
    datenschutz.html      Datenschutzerklärung (DSGVO)
    agb.html              Allgemeine Geschäftsbedingungen
    robots.txt            Freigabe für Suchmaschinen
    sitemap.xml           Seitenverzeichnis für Suchmaschinen
    assets/site-config.js >>> HIER ALLE FIRMENDATEN EINTRAGEN <<<
    assets/style.css      Gestaltung
    assets/main.js        Navigation, Module, Projekt-Check, Formular
    assets/modules.js     Modulkatalog inkl. Kauf- und Mietpreise
    assets/module-demos.js Beispielansichten der Module
    assets/module-page.js Katalogseite: Filter, Auswahl, Kostenschätzung
    assets/assistant-data.js  Wissensbasis des Seiten-Assistenten
    assets/assistant.js   Seiten-Assistent, Sprachfunktion und Live-Chat

## Vor dem Livegang – Checkliste

1. `assets/site-config.js` ausfüllen: es fehlen noch E-Mail-Adresse,
   USt-IdNr. bzw. Steuernummer und Hosting-Anbieter.
   Firma, Gesellschafter, Anschrift und Telefon sind bereits eingetragen.
   Rechtsform steht auf GbR (zwei Betreiber) – bei abweichender Struktur
   dort korrigieren.
   Kleinunternehmer nach § 19 UStG? Dann `kleinunternehmer: true` setzen –
   Impressum und Preishinweis passen sich automatisch an.
2. Domain prüfen: In `index.html`, `impressum.html`, `datenschutz.html`,
   `robots.txt` und `sitemap.xml` steht `www.hahne-digital.de`. Falls eine
   andere Domain genutzt wird, dort ersetzen.
3. Die Hinweiskästen in `impressum.html`, `datenschutz.html` und
   `agb.html` löschen (Block mit `class="hinweis"`).
4. SSL-Zertifikat (https) beim Hoster aktivieren.
5. Auftragsverarbeitungsvertrag (AVV) mit dem Hoster abschließen.
6. Optional: Formular-Dienst eintragen (`formEndpoint` in der Konfiguration).
   Ohne Eintrag öffnet das Formular das E-Mail-Programm des Besuchers – das
   funktioniert sofort, aber nicht auf jedem Gerät gleich zuverlässig.
   Wird ein externer Dienst genutzt, muss er in der Datenschutzerklärung
   unter Punkt 5 ergänzt werden.
7. Rechtstexte vor dem Livegang anwaltlich prüfen lassen.

## Seiten-Assistent

Der Assistent unten rechts beantwortet Fragen ausschließlich aus
`assets/assistant-data.js` und den Moduldaten. Er stellt keine Verbindung
ins Internet her, ruft keinen KI-Dienst auf und speichert nichts.

Neue Antwort ergänzen: in `assistant-data.js` einen Eintrag mit `fragen`
(Stichwörter) und `antwort` anlegen. Je mehr Formulierungen unter `fragen`
stehen, desto zuverlässiger wird die Frage erkannt. Weiß der Assistent
etwas nicht, verweist er von selbst auf das Kontaktformular.

## Modul-Anleitungen

`anleitung.html` erklärt jedes Modul ausführlich – erreichbar über den Knopf
"Anleitung" an jeder Modulkachel (`anleitung.html?modul=crm`).

Jede Anleitung enthält:

* **Sinnvoll für Sie, wenn …** (3 Punkte) und **Eher nicht, wenn …** (2 Punkte)
* **Wann es sich rechnet** – eine konkrete Schwelle statt Werbefloskel
* **So arbeiten Sie damit** – vier Schritte mit Schaubild
* **Aus der Praxis** – ein Tipp, den man sonst erst nach dem Kauf erfährt
* Fakten zu Dauer, Kauf, Miete und laufenden Kosten

Die Texte stehen in `assets/anleitung-daten.js`, die Schaubilder erzeugt
`assets/bilder.js` (16 Motive als SVG, keine Fotos – laden sofort, bleiben
scharf und zeigen nie versehentlich echte Kundendaten).

Die Schritte entstehen automatisch aus den Leistungspunkten in `modules.js`
plus dem passenden Schaubild. Neues Modul: Punkte in `modules.js` pflegen und
in `anleitung-daten.js` einen Eintrag mit `fuerWen`, `nichtFuerWen`,
`rechnetSich`, `tipp` und vier `bilder` anlegen.

## Modul-Demos

`demo.html` zeigt zu **jedem der 47 Module** eine bedienbare Beispielansicht:
links die Modulliste mit Suche, rechts ein nachgebautes Anwendungsfenster mit
Kennzahlen, Tabelle und Werkzeugleiste. In der Demo lässt sich suchen und eine
Zeile auswählen – so bekommt der Kunde ein Gefühl für die Bedienung.

Aufruf einzeln: `demo.html?modul=crm`. Genau so verlinkt der Modulkatalog
über "Beispiel ansehen" (öffnet in neuem Tab). Umgekehrt führt der Knopf
"Modul ins Angebot übernehmen" zurück in den Katalog
(`module.html?vormerken=crm`) und markiert das Modul dort automatisch.

Die Inhalte stehen in `assets/demo-daten.js` (35 Module) und
`assets/module-demos.js` (die ersten 12). Neues Modul ergänzen: in
`modules.js` anlegen und unter derselben ID einen Demo-Eintrag mit `titel`,
`fenster`, `stats`, `spalten`, `zeilen`, `erklaerung` und `aktionen`
hinzufügen – die Demoseite nimmt es dann automatisch auf.

## Privatsphäre-Hinweis

Beim ersten Besuch erscheint unten eine Leiste (`assets/privatsphaere.js`).
Sie ist bewusst **kein** Cookie-Banner: Die Seite setzt keine Cookies, also
gäbe es nichts zu akzeptieren. Zur Wahl steht genau das eine, was wirklich
einwilligungspflichtig ist – das Gedächtnis des Assistenten.

Zwei Knöpfe: "Gedächtnis erlauben" und "Nur das Nötigste". Die Entscheidung
wird gemerkt, damit niemand bei jedem Aufruf erneut gefragt wird. Soll der
Hinweis trotzdem bei jedem Seitenaufruf erscheinen, setzt in
`site-config.js` `hinweisImmerZeigen: true`.

Über den Link "Privatsphäre" im Footer sind die Einstellungen jederzeit
erreichbar – mit Schalter, Übersicht und einem Knopf zum Löschen aller
gespeicherten Angaben. Dieser Link ist rechtlich Pflicht und darf nicht
entfernt werden.

Die Texte der Leiste sind in allen sieben Sprachen hinterlegt.

## Domainprüfung

Auf der Startseite und im Modulkatalog kann der Besucher seine Wunschdomain
prüfen (`assets/domain.js`). Ist sie frei, übernimmt ein Klick sie ins
Angebot – sie erscheint dann als eigene Position im PDF und in der Anfrage.

**Wie zuverlässig ist das?** Ohne eigenen Server fragen wir per DNS ab, ob
für die Adresse Einträge bestehen:

* Einträge gefunden -> Domain ist **sicher vergeben**
* nichts gefunden -> Domain ist **sehr wahrscheinlich frei**

Registrierte, aber ungenutzte Domains erkennt dieses Verfahren nicht. Deshalb
steht überall "voraussichtlich frei", und die verbindliche Bestätigung kommt
mit eurem Angebot. Für die genaue Prüfung tragt unter `domainEndpoint` eine
eigene Schnittstelle ein, die RDAP oder die Registrar-API eures Hosters
abfragt und `{ "verfuegbar": true|false }` liefert. Für .de gibt es keine
offene Abfrage – das geht nur über den Registrar.

Umlautdomains werden automatisch nach Punycode umgewandelt
("müller-bau.de" -> "xn--mller-bau-q9a.de").

## Angebot als PDF

Wählt der Besucher im Modulkatalog Module aus, erscheint rechts der Knopf
"Angebot als PDF erstellen". Daraus entsteht ein DIN-A4-Angebot mit Kopfzeile,
Positionen, Summen, Hinweisen und eurer Fußzeile – wahlweise drucken,
speichern, per E-Mail oder per WhatsApp.

Erzeugt wird das PDF von `assets/angebot.js` direkt im Browser, ohne
Bibliothek und ohne Server. Inhalte und Hinweistexte stehen dort in der
Funktion `ausAuswahl`; Preise kommen automatisch aus `modules.js`.

**Grenze bei Anhängen:** Eine Website darf aus Sicherheitsgründen keine
Dateianhänge in E-Mail oder WhatsApp einfügen. Deshalb wird das PDF zuerst
heruntergeladen, dann öffnet sich Mailprogramm bzw. WhatsApp mit der
Zusammenfassung als Text – der Besucher hängt die Datei selbst an. Ein
automatischer Versand mit Anhang wäre nur mit einem Backend möglich (siehe
`formEndpoint`).

## Sprachen

Über das Globus-Symbol in der Navigation lässt sich die Website umschalten:
Deutsch, Englisch, Türkisch, Chinesisch, Polnisch, Dänisch und Arabisch.
Arabisch schaltet automatisch auf Schreibrichtung von rechts nach links.

Die Texte stehen in `assets/i18n-texte.js`, die Logik in `assets/i18n.js`.
Übersetzt werden Navigation, Startseite, Formular, Footer und der Assistent.
Auf Unterseiten erscheint eine Hinweiszeile in der gewählten Sprache, dass
die Seite vollständig nur auf Deutsch vorliegt.

**Neue Sprache ergänzen:** in `SPRACHEN` einen Eintrag anlegen (Code,
Eigenname, deutscher Name, Schreibrichtung) und in `TEXTE` einen Block mit
denselben Schlüsseln. Fehlt ein Schlüssel, erscheint automatisch der deutsche
Text – die Seite bleibt also immer benutzbar.

**Neuen Text übersetzbar machen:** dem Element `data-t="schluessel"` geben
und den Schlüssel in allen Sprachblöcken ergänzen. Für Eingabefelder gibt es
`data-t-platzhalter`.

Rechtlich gilt: Impressum, Datenschutz und AGB bleiben nur auf Deutsch
verbindlich. Das steht so im Impressum unter "Sprachfassungen" und in den
AGB Ziffer 20.3.

## Soziale Netzwerke

Die Profil-Adressen stehen unter `social` in `assets/site-config.js`. Tragt
dort die vollständige Adresse ein, zum Beispiel:

    facebook: "https://www.facebook.com/euerprofil",

Netzwerke ohne Adresse werden trotzdem angezeigt – blass, gestrichelt
umrandet und nicht anklickbar, mit dem Hinweis, dass der Kanal im Aufbau ist.
Sobald ihr die Adresse einsetzt, wird daraus automatisch ein aktiver Verweis,
und der Hinweistext verschwindet.

Steuerung dazu:

    socialVorschau: true     leere Netzwerke als "in Vorbereitung" zeigen
    socialVorschau: false    leere Netzwerke ausblenden
    socialAusblenden: ["xing"]   einzelne Netzwerke ganz weglassen

Verfügbar sind Facebook, Instagram, TikTok, LinkedIn, YouTube, Xing und
WhatsApp-Kanal.

Wichtig: Die Vorschau ist rechtlich abgesichert (Impressum und
Datenschutzerklärung weisen darauf hin, dass noch kein Profil besteht). Sie
sollte aber nicht dauerhaft laufen – legt die Kanäle in den nächsten Wochen
tatsächlich an oder blendet die ungenutzten über `socialAusblenden` aus.

Die Symbole erscheinen automatisch im Footer jeder Seite und im Kontaktblock
der Startseite. Zusätzlich werden die Profile in den strukturierten Daten
(schema.org `sameAs`) hinterlegt – dadurch erkennt Google, dass Website und
Profile zum selben Unternehmen gehören.

Datenschutzhinweis: Es sind reine Verlinkungen, keine Schaltflächen der
Anbieter. Erst beim Klick entsteht eine Verbindung zum Netzwerk.

## Lernfunktion und Wiedererkennung

`assets/assistant-lernen.js` erweitert den Assistenten um vier Dinge:

1. **Wiedererkennung** – eine zufällige Kennung im localStorage erkennt
   dasselbe Gerät bei einem späteren Besuch. Die Begrüßung ändert sich dann
   ("Ihr 3. Besuch – zuletzt ging es um Preise").
2. **Verhalten** – gelesene Abschnitte werden je Thema gezählt und steuern,
   welche Vorschläge zuerst erscheinen.
3. **Lernen** – bei "Hat das geholfen? Ja" werden die Begriffe der Frage mit
   der Antwort verknüpft und beim nächsten Mal höher gewichtet. Unbeantwortete
   Fragen landen in einer Liste.
4. **Ansprache** – nach 45 Sekunden aktiver Verweildauer (einstellbar über
   `hilfeNachSekunden`) bietet der Assistent einmalig Hilfe an, passend zum
   gerade gelesenen Abschnitt.

**Einwilligung ist Pflicht.** Ohne Zustimmung wird nichts gespeichert; der
Assistent fragt beim ersten Öffnen freundlich nach. Im Fenster gibt es
dauerhaft "Merken beenden und Daten löschen". Beschrieben ist das in Ziffer
10 der Datenschutzerklärung.

### Lernbericht abrufen

Tippt im Assistenten das Wort `lernbericht` ein. Ihr seht dann Besuchszahl,
gelernte Verknüpfungen, meistgelesene Themen und vor allem die **Fragen, die
der Assistent nicht beantworten konnte**. Über "Bericht kopieren" landet alles
in der Zwischenablage – diese Fragen gehören als neue Einträge in
`assistant-data.js`. So wächst die Wissensbasis mit jeder Woche.

### Wichtige Einschränkung

Das Gelernte gilt **je Gerät**, nicht übergreifend. Ein Assistent, der aus
allen Besuchergesprächen gemeinsam lernt, braucht einen Server: Tragt dazu
unter `lernEndpoint` eine URL ein, dann werden unbeantwortete Fragen anonym
dorthin gemeldet. Dieser Dienst muss dann in der Datenschutzerklärung ergänzt
werden. Ohne Endpoint bleibt alles auf dem Gerät des Besuchers.

## Live-Chat und Sprachfunktion

Das Fenster unten rechts öffnet mit einer Übersicht: „Frage stellen"
(Assistent) oder „Mit uns schreiben" (Live-Chat), darunter die häufigsten
Themen als Kacheln und die Direktwege Anruf und Formular.

Der Assistent schlägt nach jeder Antwort passende Folgefragen vor und fragt
kurz nach, ob die Antwort geholfen hat. Bei „Nein" bietet er an, die Frage
direkt an euch weiterzugeben – die Frage wird dabei in den Live-Chat
übernommen. Fragt jemand nach einem Bereich („Welche Module gibt es für
Lager?"), listet er die Module dieser Kategorie mit Preisen auf.

Ohne eigenes Backend läuft der Live-Chat über WhatsApp, E-Mail, Telefon
oder Formular: Der Besucher tippt seine Nachricht und wählt anschließend
aus vier Kanälen, wie sie zu euch kommt.
Die WhatsApp-Nummer und die Erreichbarkeitszeiten stehen in
`assets/site-config.js`. Der grüne Punkt am Reiter zeigt anhand dieser
Zeiten, ob gerade jemand erreichbar ist.

Habt ihr später einen Chat-Dienst oder ein eigenes Backend, tragt die URL
unter `chatEndpoint` ein – dann werden Nachrichten direkt gesendet. Ein
externer Dienst muss dann in der Datenschutzerklärung ergänzt werden.

Die Sprachfunktion (Mikrofon und Vorlesen) ist standardmäßig sichtbar, aber
inaktiv. Vor der ersten Mikrofonnutzung fragt der Assistent um Zustimmung,
weil die Spracherkennung vom Browser stammt und bei Chrome/Edge an dessen
Server geht. Abschalten lässt sich beides über `sprachEingabe` und
`sprachAusgabe` in der Konfiguration.

## Datenschutz

Es werden keine Cookies gesetzt, keine Analyse-Tools und keine externen
Schriftarten oder CDNs geladen. Alle Dateien kommen vom eigenen Server –
dadurch ist kein Cookie-Banner erforderlich.
