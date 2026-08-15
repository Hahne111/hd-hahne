/* ==========================================================================
   HAHNE DIGITAL – Anleitungsseite
   --------------------------------------------------------------------------
   Baut zu jedem Modul eine Anleitung aus drei Quellen:
     modules.js            Name, Preis, Leistungspunkte, Aufwand
     anleitung-daten.js    Für wen, für wen nicht, wann es sich rechnet, Tipp
     bilder.js             Schaubilder zu den Arbeitsschritten

   Aufruf: anleitung.html?modul=crm
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var MODULE = window.MODULE || [];
  var KATEGORIEN = window.MODULE_KATEGORIEN || [];
  var ANL = window.ANLEITUNGEN || {};
  var DEMOS = window.MODULE_DEMOS || {};
  var MIETE = window.MIETE || { grundgebuehr: 79, mindestlaufzeit: 24, einrichtung: 149 };
  if (!MODULE.length || !$("#anlNavi")) return;

  // Geschütztes Leerzeichen: Betrag und Eurozeichen bleiben in einer Zeile
  var euro = function (n) { return n.toLocaleString("de-DE") + "\u00a0€"; };
  var aktuell = null;

  /* Erklärung je Schaubild – gilt für alle Module gleichermaßen und
     beschreibt, wie die Bedienung an dieser Stelle abläuft. */
  var SCHRITT_TEXT = {
    liste: "In der Übersicht steht alles untereinander. Sie können nach Kunde, Datum oder Status suchen und mit einem Klick in den Eintrag springen.",
    formular: "Angelegt wird über eine einfache Maske. Pflichtfelder sind gekennzeichnet, alles andere können Sie später ergänzen.",
    handy: "Unterwegs läuft dasselbe auf dem Handy – ohne App-Installation. Ein Symbol auf dem Startbildschirm genügt.",
    kalender: "Die Zeitansicht zeigt, was wann ansteht. Termine lassen sich mit der Maus verschieben, alle Beteiligten sehen die Änderung sofort.",
    diagramm: "Aus den erfassten Daten entstehen Auswertungen: Entwicklung über die Monate, Vergleich zum Vorjahr, Export für die Ablage.",
    ordner: "Dateien liegen beim richtigen Kunden oder Auftrag statt im Mailpostfach. Hochladen geht auch direkt vom Handy.",
    verbindung: "Zwei Systeme werden verbunden, damit Daten automatisch übergehen. Eingerichtet wird das einmal, danach läuft es im Hintergrund.",
    scanner: "Erfasst wird mit der Handykamera. Das System liest die Angaben aus und ordnet sie zu; Sie prüfen nur noch.",
    chat: "Der Austausch läuft in einem Verlauf, den beide Seiten sehen. Nichts geht in einzelnen Postfächern verloren.",
    karte: "Die Kartenansicht zeigt Orte und Einsatzgebiete. Wichtig überall dort, wo Kunden nach Ihrer Region suchen.",
    lager: "Bestände sind je Lagerort sichtbar, auch für das Fahrzeug. Fällt etwas unter den Mindestbestand, wird es hervorgehoben.",
    rechnung: "Das fertige Dokument entsteht in Ihrem Layout und lässt sich drucken, als PDF speichern oder direkt versenden.",
    uhr: "Erfasst wird mit einem Tipp auf Start und Stopp. Nachträgliche Korrekturen bleiben nachvollziehbar protokolliert.",
    planung: "Auf der Zeitachse sehen Sie, wer wann wo eingeplant ist. Konflikte und Doppelbelegungen meldet das System selbst.",
    suche: "So sieht Ihr Eintrag in den Suchergebnissen aus. Titel und Beschreibung entscheiden darüber, ob jemand klickt.",
    freigabe: "Zum Abschluss wird geprüft und freigegeben – auf Wunsch mit Unterschrift direkt auf dem Bildschirm."
  };

  /* --- Liste links ---------------------------------------------------------- */
  function naviBauen(filter) {
    var suche = (filter || "").toLowerCase();
    var html = "";
    KATEGORIEN.forEach(function (k) {
      var liste = MODULE.filter(function (m) {
        if (m.kategorie !== k.id || !ANL[m.id]) return false;
        if (!suche) return true;
        return (m.name + " " + m.kurz).toLowerCase().indexOf(suche) > -1;
      });
      if (!liste.length) return;
      html += '<p class="demo-gruppe">' + k.name + "</p>" +
        liste.map(function (m) {
          return '<button class="demo-eintrag" type="button" data-id="' + m.id + '">' +
            "<b>" + m.name + "</b><span>" +
            (m.preis > 0 ? "ab " + euro(m.preis) : euro(m.monat) + "/Mon.") + "</span></button>";
        }).join("");
    });
    $("#anlNavi").innerHTML = html || '<p class="demo-leer">Kein Modul gefunden.</p>';
    markieren();
  }

  function markieren() {
    $$(".demo-eintrag").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.id === aktuell ? "true" : "false");
    });
  }

  $("#anlNavi").addEventListener("click", function (e) {
    var b = e.target.closest(".demo-eintrag");
    if (b) zeigen(b.dataset.id, true);
  });
  $("#anlSuche").addEventListener("input", function () { naviBauen(this.value); });

  /* --- Anleitung darstellen --------------------------------------------------- */
  function zeigen(id, verlauf) {
    var m = MODULE.filter(function (x) { return x.id === id; })[0];
    var an = ANL[id];
    if (!m || !an) return;
    aktuell = id;

    document.title = "Anleitung: " + m.name + " – Hahne Digital";
    $("#anlTitel").textContent = m.name;
    $("#anlUnter").textContent = m.kurz;

    var preisbox = $("#anlPreis");
    preisbox.hidden = false;
    preisbox.innerHTML =
      (m.preis > 0 ? "<div><b>ab " + euro(m.preis) + "</b><span>einmalig zum Kauf</span></div>"
                   : "<div><b>" + euro(m.monat) + "</b><span>je Monat</span></div>") +
      (m.miete > 0 ? "<div><b>" + euro(m.miete) + "</b><span>je Monat zur Miete</span></div>" : "") +
      "<div><b>" + m.aufwand + "</b><span>Umsetzung</span></div>";

    /* Arbeitsschritte aus Leistungspunkten und Schaubildern */
    var bilder = an.bilder || ["liste", "formular", "handy", "freigabe"];
    var schritte = m.punkte.slice(0, bilder.length).map(function (p, i) {
      var bild = bilder[i] || "liste";
      return '<article class="anl-schritt">' +
        '<div class="anl-bild">' + window.BILD(bild) + "</div>" +
        '<div class="anl-schritt-text">' +
          '<span class="anl-nr">Schritt ' + (i + 1) + "</span>" +
          "<h3>" + p + "</h3>" +
          "<p>" + (SCHRITT_TEXT[bild] || "") + "</p>" +
        "</div>" +
      "</article>";
    }).join("");

    $("#anlInhalt").innerHTML =
      '<div class="anl-block anl-eignung">' +
        '<div class="anl-passt">' +
          "<b>Sinnvoll für Sie, wenn …</b><ul>" +
          an.fuerWen.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
          "</ul></div>" +
        '<div class="anl-passt-nicht">' +
          "<b>Eher nicht, wenn …</b><ul>" +
          an.nichtFuerWen.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
          "</ul></div>" +
      "</div>" +

      '<div class="anl-rechnet"><b>Wann es sich rechnet</b><p>' + an.rechnetSich + "</p></div>" +

      '<h2 class="anl-ueberschrift">So arbeiten Sie damit</h2>' +
      '<div class="anl-schritte">' + schritte + "</div>" +

      '<div class="anl-tipp"><b>Aus der Praxis</b><p>' + an.tipp + "</p></div>" +

      '<div class="anl-block anl-fakten">' +
        "<div><b>Umsetzungsdauer</b><span>" + m.aufwand + "</span></div>" +
        "<div><b>Kauf</b><span>" + (m.preis > 0 ? "ab " + euro(m.preis) + " einmalig" : "im Betrieb enthalten") + "</span></div>" +
        "<div><b>Miete</b><span>" + (m.miete > 0
          ? euro(m.miete) + " je Monat · " + MIETE.mindestlaufzeit + " Monate Laufzeit"
          : "nicht mietbar") + "</span></div>" +
        "<div><b>Laufende Kosten</b><span>" + (m.monat ? euro(m.monat) + " je Monat für Dienste dahinter" : "keine") + "</span></div>" +
      "</div>" +

      '<div class="demo-aktionen">' +
        (DEMOS[id] ? '<a class="btn btn-ghost" href="demo.html?modul=' + id + '">Beispielansicht ansehen</a>' : "") +
        '<a class="btn btn-primary" href="module.html?vormerken=' + id + '#katalog">Modul ins Angebot übernehmen</a>' +
        '<a class="btn btn-ghost" href="index.html#kontakt">Frage dazu stellen</a>' +
      "</div>";

    markieren();
    if (verlauf && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "anleitung.html?modul=" + id);
    }
    if (verlauf && window.innerWidth < 980) {
      $("#anlInhalt").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  naviBauen("");
  var gewuenscht = new URLSearchParams(window.location.search).get("modul");
  zeigen(ANL[gewuenscht] ? gewuenscht : MODULE.filter(function (m) { return ANL[m.id]; })[0].id, false);
})();
