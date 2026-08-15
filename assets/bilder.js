/* ==========================================================================
   HAHNE DIGITAL – Illustrationen für die Anleitungen
   --------------------------------------------------------------------------
   Einfache, selbst gezeichnete Schaubilder statt Fotos oder Bildschirmfotos.
   Vorteile: laden sofort, bleiben bei jeder Bildschirmgröße scharf, kosten
   keine Lizenz und zeigen nie versehentlich echte Kundendaten.

   Verwendung: window.BILD("liste") liefert den SVG-Code zurück.
   Farben kommen aus dem Stylesheet (currentColor und die Klassen).
   ========================================================================== */
(function () {
  "use strict";

  var rahmen = function (inhalt, titel) {
    return '<svg viewBox="0 0 320 200" role="img" aria-label="' + (titel || "Schaubild") + '" class="bild">' +
      '<rect x="6" y="6" width="308" height="188" rx="12" class="b-flaeche"/>' +
      '<rect x="6" y="6" width="308" height="26" rx="12" class="b-kopf"/>' +
      '<rect x="6" y="20" width="308" height="12" class="b-kopf"/>' +
      '<circle cx="20" cy="19" r="3.5" class="b-punkt"/><circle cx="31" cy="19" r="3.5" class="b-punkt"/>' +
      '<circle cx="42" cy="19" r="3.5" class="b-punkt an"/>' +
      inhalt + "</svg>";
  };

  var zeile = function (y, breite, klasse) {
    return '<rect x="24" y="' + y + '" width="' + breite + '" height="9" rx="4.5" class="' + (klasse || "b-linie") + '"/>';
  };

  var BILDER = {

    /* Übersicht mit Liste */
    liste: rahmen(
      '<rect x="18" y="44" width="284" height="26" rx="8" class="b-feld"/>' +
      '<circle cx="34" cy="57" r="5" class="b-linie" fill="none" stroke-width="2"/>' +
      '<line x1="38" y1="61" x2="43" y2="66" class="b-strich"/>' +
      [82, 110, 138, 166].map(function (y, i) {
        return '<rect x="18" y="' + y + '" width="284" height="22" rx="7" class="' + (i === 1 ? "b-zeile an" : "b-zeile") + '"/>' +
          zeile(y + 6.5, 90, "b-linie stark") +
          '<rect x="150" y="' + (y + 6.5) + '" width="60" height="9" rx="4.5" class="b-linie"/>' +
          '<rect x="232" y="' + (y + 6.5) + '" width="52" height="9" rx="4.5" class="b-linie ' + (i === 1 ? "akzent" : "") + '"/>';
      }).join(""), "Übersichtsliste"),

    /* Eingabemaske */
    formular: rahmen(
      zeile(48, 110, "b-linie stark") +
      [70, 106, 142].map(function (y) {
        return zeile(y, 60) + '<rect x="18" y="' + (y + 14) + '" width="284" height="24" rx="7" class="b-feld"/>';
      }).join("") +
      '<rect x="214" y="176" width="88" height="0" class="b-flaeche"/>' +
      '<rect x="206" y="168" width="96" height="20" rx="8" class="b-knopf"/>', "Eingabemaske"),

    /* Handy */
    handy:
      '<svg viewBox="0 0 320 200" role="img" aria-label="Ansicht auf dem Handy" class="bild">' +
      '<rect x="112" y="10" width="96" height="180" rx="14" class="b-flaeche stark"/>' +
      '<rect x="120" y="26" width="80" height="148" rx="6" class="b-feld"/>' +
      '<rect x="146" y="16" width="28" height="4" rx="2" class="b-linie"/>' +
      [36, 62, 88, 114].map(function (y, i) {
        return '<rect x="127" y="' + y + '" width="66" height="18" rx="5" class="' + (i === 0 ? "b-zeile an" : "b-zeile") + '"/>' +
          '<rect x="133" y="' + (y + 6) + '" width="' + (i === 0 ? 40 : 34) + '" height="6" rx="3" class="b-linie"/>';
      }).join("") +
      '<rect x="127" y="142" width="66" height="22" rx="8" class="b-knopf"/>' +
      '<circle cx="160" cy="182" r="5" class="b-linie"/></svg>',

    /* Kalender */
    kalender: rahmen(
      '<rect x="18" y="44" width="284" height="22" rx="7" class="b-feld"/>' +
      zeile(50.5, 80, "b-linie stark") +
      (function () {
        var s = "";
        for (var r = 0; r < 3; r++) {
          for (var c = 0; c < 7; c++) {
            var an = (r === 1 && c === 2) || (r === 2 && c === 4);
            s += '<rect x="' + (18 + c * 41) + '" y="' + (76 + r * 38) + '" width="35" height="32" rx="6" class="' +
              (an ? "b-zeile an" : "b-zeile") + '"/>';
            if (an) s += '<rect x="' + (24 + c * 41) + '" y="' + (86 + r * 38) + '" width="23" height="6" rx="3" class="b-linie akzent"/>';
          }
        }
        return s;
      })(), "Kalenderansicht"),

    /* Kennzahlen */
    diagramm: rahmen(
      [18, 122, 226].map(function (x, i) {
        return '<rect x="' + x + '" y="44" width="76" height="40" rx="8" class="b-zeile"/>' +
          '<rect x="' + (x + 10) + '" y="54" width="' + (30 - i * 4) + '" height="12" rx="4" class="b-linie akzent stark"/>' +
          '<rect x="' + (x + 10) + '" y="72" width="44" height="6" rx="3" class="b-linie"/>';
      }).join("") +
      '<rect x="18" y="96" width="284" height="86" rx="8" class="b-zeile"/>' +
      '<polyline points="36,164 78,146 120,152 162,124 204,132 246,104 288,112" fill="none" class="b-kurve"/>' +
      [36, 78, 120, 162, 204, 246, 288].map(function (x, i) {
        var y = [164, 146, 152, 124, 132, 104, 112][i];
        return '<circle cx="' + x + '" cy="' + y + '" r="3.5" class="b-punkt an"/>';
      }).join(""), "Auswertung"),

    /* Dokumente */
    ordner: rahmen(
      [0, 1, 2].map(function (i) {
        var x = 26 + i * 96;
        return '<rect x="' + x + '" y="52" width="76" height="96" rx="8" class="b-zeile' + (i === 1 ? " an" : "") + '"/>' +
          '<rect x="' + (x + 12) + '" y="68" width="52" height="7" rx="3.5" class="b-linie stark"/>' +
          '<rect x="' + (x + 12) + '" y="82" width="40" height="6" rx="3" class="b-linie"/>' +
          '<rect x="' + (x + 12) + '" y="94" width="46" height="6" rx="3" class="b-linie"/>' +
          '<rect x="' + (x + 12) + '" y="118" width="30" height="14" rx="5" class="b-linie ' + (i === 1 ? "akzent" : "") + '"/>';
      }).join("") +
      zeile(162, 200), "Dokumente"),

    /* Verknüpfung zweier Systeme */
    verbindung: rahmen(
      '<rect x="26" y="70" width="92" height="70" rx="10" class="b-zeile"/>' +
      '<rect x="202" y="70" width="92" height="70" rx="10" class="b-zeile an"/>' +
      '<rect x="42" y="88" width="60" height="8" rx="4" class="b-linie stark"/>' +
      '<rect x="42" y="104" width="44" height="6" rx="3" class="b-linie"/>' +
      '<rect x="218" y="88" width="60" height="8" rx="4" class="b-linie stark akzent"/>' +
      '<rect x="218" y="104" width="44" height="6" rx="3" class="b-linie"/>' +
      '<line x1="126" y1="105" x2="188" y2="105" class="b-strich lang"/>' +
      '<polyline points="180,98 190,105 180,112" fill="none" class="b-strich lang"/>' +
      '<circle cx="157" cy="105" r="13" class="b-flaeche stark"/>' +
      '<line x1="151" y1="105" x2="163" y2="105" class="b-strich"/>' +
      '<line x1="157" y1="99" x2="157" y2="111" class="b-strich"/>', "Verbindung zweier Systeme"),

    /* Kamera / Scannen */
    scanner: rahmen(
      '<rect x="96" y="52" width="128" height="112" rx="10" class="b-zeile"/>' +
      '<rect x="112" y="70" width="96" height="8" rx="4" class="b-linie stark"/>' +
      '<rect x="112" y="86" width="70" height="6" rx="3" class="b-linie"/>' +
      '<rect x="112" y="98" width="84" height="6" rx="3" class="b-linie"/>' +
      '<rect x="112" y="126" width="96" height="22" rx="6" class="b-feld"/>' +
      (function () {
        var s = "";
        for (var i = 0; i < 14; i++) {
          s += '<rect x="' + (118 + i * 7) + '" y="131" width="' + (i % 3 ? 2 : 4) + '" height="12" class="b-linie stark"/>';
        }
        return s;
      })() +
      '<line x1="80" y1="108" x2="240" y2="108" class="b-strich lang akzent"/>', "Beleg einscannen"),

    /* Gespräch */
    chat: rahmen(
      '<rect x="24" y="48" width="150" height="34" rx="10" class="b-zeile"/>' +
      '<rect x="36" y="58" width="90" height="7" rx="3.5" class="b-linie"/>' +
      '<rect x="36" y="69" width="60" height="6" rx="3" class="b-linie"/>' +
      '<rect x="146" y="92" width="150" height="44" rx="10" class="b-zeile an"/>' +
      '<rect x="158" y="102" width="110" height="7" rx="3.5" class="b-linie akzent"/>' +
      '<rect x="158" y="113" width="86" height="6" rx="3" class="b-linie"/>' +
      '<rect x="158" y="123" width="66" height="6" rx="3" class="b-linie"/>' +
      '<rect x="24" y="150" width="228" height="24" rx="8" class="b-feld"/>' +
      '<rect x="262" y="150" width="34" height="24" rx="8" class="b-knopf"/>', "Gespräch"),

    /* Karte */
    karte: rahmen(
      '<rect x="18" y="44" width="284" height="138" rx="10" class="b-feld"/>' +
      '<polyline points="18,120 70,96 118,132 176,86 232,118 302,80" fill="none" class="b-strich lang"/>' +
      '<polyline points="60,182 92,140 150,160 190,120 250,150" fill="none" class="b-strich lang"/>' +
      [[118, 132], [190, 120]].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" class="b-punkt an"/>' +
          '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="16" class="b-ring"/>';
      }).join(""), "Karte"),

    /* Lager */
    lager: rahmen(
      [0, 1].map(function (r) {
        return [0, 1, 2, 3].map(function (c) {
          var x = 24 + c * 70, y = 52 + r * 62;
          var voll = !(r === 0 && c === 2);
          return '<rect x="' + x + '" y="' + y + '" width="58" height="48" rx="7" class="b-zeile' + (voll ? "" : " an") + '"/>' +
            '<rect x="' + (x + 10) + '" y="' + (y + 12) + '" width="38" height="8" rx="4" class="b-linie stark"/>' +
            '<rect x="' + (x + 10) + '" y="' + (y + 26) + '" width="' + (voll ? 30 : 12) + '" height="10" rx="5" class="b-linie ' +
            (voll ? "" : "akzent") + '"/>';
        }).join("");
      }).join("") +
      zeile(178, 160), "Lagerbestand"),

    /* Rechnung */
    rechnung: rahmen(
      '<rect x="70" y="42" width="180" height="146" rx="8" class="b-zeile"/>' +
      '<rect x="86" y="58" width="70" height="9" rx="4.5" class="b-linie stark"/>' +
      '<rect x="86" y="74" width="46" height="6" rx="3" class="b-linie"/>' +
      [96, 112, 128].map(function (y) {
        return '<rect x="86" y="' + y + '" width="90" height="6" rx="3" class="b-linie"/>' +
          '<rect x="188" y="' + y + '" width="46" height="6" rx="3" class="b-linie"/>';
      }).join("") +
      '<line x1="86" y1="146" x2="234" y2="146" class="b-strich lang"/>' +
      '<rect x="86" y="156" width="60" height="9" rx="4.5" class="b-linie stark"/>' +
      '<rect x="180" y="154" width="54" height="13" rx="6" class="b-linie akzent stark"/>', "Rechnung"),

    /* Zeit */
    uhr: rahmen(
      '<circle cx="160" cy="112" r="52" class="b-flaeche stark"/>' +
      '<circle cx="160" cy="112" r="44" class="b-feld"/>' +
      '<line x1="160" y1="112" x2="160" y2="82" class="b-strich"/>' +
      '<line x1="160" y1="112" x2="182" y2="122" class="b-strich"/>' +
      '<circle cx="160" cy="112" r="4" class="b-punkt an"/>' +
      '<rect x="24" y="48" width="90" height="20" rx="7" class="b-knopf"/>' +
      '<rect x="206" y="48" width="90" height="20" rx="7" class="b-zeile"/>', "Zeiterfassung"),

    /* Planung */
    planung: rahmen(
      [0, 1, 2, 3].map(function (r) {
        var y = 48 + r * 34;
        return '<rect x="18" y="' + y + '" width="60" height="26" rx="6" class="b-zeile"/>' +
          '<rect x="26" y="' + (y + 9) + '" width="42" height="8" rx="4" class="b-linie stark"/>' +
          '<rect x="' + (86 + (r % 3) * 46) + '" y="' + y + '" width="' + (r === 1 ? 130 : 84) + '" height="26" rx="6" class="b-zeile ' +
          (r === 1 ? "an" : "") + '"/>' +
          '<rect x="' + (94 + (r % 3) * 46) + '" y="' + (y + 9) + '" width="' + (r === 1 ? 90 : 50) + '" height="8" rx="4" class="b-linie ' +
          (r === 1 ? "akzent" : "") + '"/>';
      }).join(""), "Einsatzplanung"),

    /* Suchmaschine */
    suche: rahmen(
      '<rect x="42" y="50" width="236" height="30" rx="15" class="b-feld"/>' +
      '<circle cx="66" cy="65" r="7" fill="none" class="b-linie" stroke-width="2.5"/>' +
      '<line x1="71" y1="70" x2="78" y2="77" class="b-strich"/>' +
      '<rect x="86" y="61" width="120" height="8" rx="4" class="b-linie"/>' +
      [96, 128, 160].map(function (y, i) {
        return '<rect x="42" y="' + y + '" width="236" height="24" rx="7" class="b-zeile' + (i === 0 ? " an" : "") + '"/>' +
          '<rect x="54" y="' + (y + 8) + '" width="' + (i === 0 ? 120 : 96) + '" height="8" rx="4" class="b-linie ' +
          (i === 0 ? "akzent stark" : "") + '"/>';
      }).join(""), "Suchergebnisse"),

    /* Freigabe / Unterschrift */
    freigabe: rahmen(
      '<rect x="60" y="46" width="200" height="110" rx="8" class="b-zeile"/>' +
      [64, 82, 100].map(function (y) {
        return '<rect x="78" y="' + y + '" width="' + (y === 100 ? 100 : 150) + '" height="7" rx="3.5" class="b-linie"/>';
      }).join("") +
      '<path d="M84 138 q14 -18 26 0 t26 -6 t24 4" fill="none" class="b-kurve"/>' +
      '<line x1="78" y1="146" x2="242" y2="146" class="b-strich lang"/>' +
      '<circle cx="252" cy="164" r="18" class="b-punkt an"/>' +
      '<polyline points="245,164 250,170 260,158" fill="none" class="b-haken"/>', "Freigabe")
  };

  window.BILD = function (name) { return BILDER[name] || BILDER.liste; };
  window.BILDER_LISTE = Object.keys(BILDER);
})();
