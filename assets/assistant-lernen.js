/* ==========================================================================
   HAHNE DIGITAL – Lernmodul des Assistenten
   --------------------------------------------------------------------------
   Was dieses Modul kann:

   1. WIEDERERKENNUNG    Ein zufälliger Kennwert im Browser (localStorage)
                         erkennt denselben Besucher bei einem späteren Besuch.
   2. VERHALTEN          Besuchte Seiten und gelesene Abschnitte werden lokal
                         festgehalten, um passendere Vorschläge zu machen.
   3. LERNEN             Fragen mit guter Rückmeldung werden höher gewichtet,
                         unbeantwortete Fragen gesammelt – daraus entsteht ein
                         Lernbericht, mit dem die Wissensbasis wächst.
   4. ANSPRACHE          Nach längerer Verweildauer bietet der Assistent von
                         sich aus Hilfe an, passend zum gerade gelesenen Teil.

   WICHTIG – Grenzen und Datenschutz:
   · Ohne Einwilligung wird NICHTS gespeichert. Der Assistent funktioniert
     dann trotzdem, merkt sich aber nur den laufenden Besuch.
   · Alles bleibt auf dem Gerät des Besuchers. Es gibt keine Übertragung an
     uns, solange kein lernEndpoint eingetragen ist.
   · Das Gelernte gilt nur für diesen einen Besucher. Ein Assistent, der aus
     allen Gesprächen gemeinsam lernt, braucht einen Server – siehe
     lernEndpoint weiter unten und den Abschnitt in der README.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var SCHLUESSEL = "hd_assistent_v1";
  var FRIST_TAGE = 180;                       // danach wird der Eintrag verworfen
  var WARTEZEIT = (S.hilfeNachSekunden || 45) * 1000;

  var speicherFrei = false;                   // erst nach Einwilligung true
  var daten = leerDaten();
  var sitzung = { seiten: [], abschnitte: {}, start: Date.now(), gefragt: false };

  function leerDaten() {
    return {
      id: null, besuche: 0, letzterBesuch: 0, ersterBesuch: 0,
      seiten: {}, themen: {}, gewichte: {}, offeneFragen: [], beantwortet: 0
    };
  }

  /* --- Speicher ------------------------------------------------------------- */
  function verfuegbar() {
    try { window.localStorage.setItem("hd_test", "1"); window.localStorage.removeItem("hd_test"); return true; }
    catch (e) { return false; }
  }

  function laden() {
    if (!verfuegbar()) return;
    try {
      var roh = window.localStorage.getItem(SCHLUESSEL);
      if (!roh) return;
      var d = JSON.parse(roh);
      if (Date.now() - (d.letzterBesuch || 0) > FRIST_TAGE * 864e5) { loeschen(); return; }
      daten = Object.assign(leerDaten(), d);
      speicherFrei = true;
    } catch (e) {}
  }

  function sichern() {
    if (!speicherFrei || !verfuegbar()) return;
    try {
      daten.letzterBesuch = Date.now();
      window.localStorage.setItem(SCHLUESSEL, JSON.stringify(daten));
    } catch (e) {}
  }

  function loeschen() {
    try { window.localStorage.removeItem(SCHLUESSEL); } catch (e) {}
    daten = leerDaten();
    speicherFrei = false;
  }

  function einwilligen() {
    speicherFrei = true;
    if (!daten.id) {
      daten.id = "b" + Math.random().toString(36).slice(2, 10);
      daten.ersterBesuch = Date.now();
    }
    daten.besuche = (daten.besuche || 0) + 1;
    sichern();
  }

  laden();
  if (speicherFrei) { daten.besuche = (daten.besuche || 0) + 1; sichern(); }

  /* --- Verhalten beobachten -------------------------------------------------- */
  var seite = window.location.pathname.split("/").pop() || "index.html";
  sitzung.seiten.push(seite);
  if (speicherFrei) { daten.seiten[seite] = (daten.seiten[seite] || 0) + 1; sichern(); }

  var THEMA_JE_ABSCHNITT = {
    pakete: "preise", "server-hinweis": "server", "sichtbar-teaser": "sichtbarkeit",
    sichtbarkeit: "sichtbarkeit", server: "server", mieten: "miete", kaufen: "miete",
    katalog: "module", module: "module", berater: "beratung", kontakt: "kontakt",
    leistungen: "leistungen", ablauf: "ablauf", faq: "fragen", begriffe: "einstieg"
  };

  function beobachten() {
    if (!("IntersectionObserver" in window)) return;
    var ziele = document.querySelectorAll("section[id], header[id]");
    if (!ziele.length) return;
    var beo = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        var thema = THEMA_JE_ABSCHNITT[e.target.id];
        if (!thema) return;
        sitzung.abschnitte[thema] = (sitzung.abschnitte[thema] || 0) + 1;
        if (speicherFrei) daten.themen[thema] = (daten.themen[thema] || 0) + 1;
      });
    }, { threshold: 0.45 });
    ziele.forEach(function (z) { beo.observe(z); });
    window.addEventListener("beforeunload", sichern);
  }
  if (document.readyState !== "loading") beobachten();
  else document.addEventListener("DOMContentLoaded", beobachten);

  /* --- Lernen ---------------------------------------------------------------- */
  function begriffe(frage) {
    return frage.toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
      .filter(function (w) { return w.length > 3; });
  }

  /* Gute Rückmeldung: Begriffe der Frage werden mit dem Eintrag verknüpft.
     Beim nächsten Mal erkennt der Assistent dieselbe Formulierung sicherer. */
  function merkeTreffer(frage, eintragId, gut) {
    if (!speicherFrei || !eintragId) return;
    begriffe(frage).forEach(function (w) {
      var schluessel = w + "|" + eintragId;
      var wert = (daten.gewichte[schluessel] || 0) + (gut ? 1 : -1);
      if (wert === 0) delete daten.gewichte[schluessel];
      else daten.gewichte[schluessel] = Math.max(-2, Math.min(4, wert));
    });
    daten.beantwortet = (daten.beantwortet || 0) + 1;
    sichern();
  }

  /* Bonuspunkte aus dem Gelernten – fließen in die Bewertung ein */
  function bonus(frage, eintragId) {
    if (!daten.gewichte) return 0;
    var summe = 0;
    begriffe(frage).forEach(function (w) {
      var v = daten.gewichte[w + "|" + eintragId];
      if (v) summe += v;
    });
    return Math.max(-4, Math.min(6, summe));
  }

  function merkeOffeneFrage(frage) {
    if (!speicherFrei) return;
    var vorhanden = daten.offeneFragen.filter(function (f) { return f.text === frage; })[0];
    if (vorhanden) { vorhanden.anzahl++; vorhanden.zuletzt = Date.now(); }
    else daten.offeneFragen.push({ text: frage, anzahl: 1, zuletzt: Date.now(), seite: seite });
    if (daten.offeneFragen.length > 60) daten.offeneFragen.shift();
    sichern();
    if (S.lernEndpoint) melden(frage);
  }

  /* Optional: unbeantwortete Fragen anonym an den Betreiber melden.
     Nur aktiv, wenn lernEndpoint in site-config.js gesetzt ist. */
  function melden(frage) {
    try {
      fetch(S.lernEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frage: frage, seite: seite, zeit: new Date().toISOString() })
      }).catch(function () {});
    } catch (e) {}
  }

  /* --- Lernbericht ------------------------------------------------------------ */
  function bericht() {
    var offen = (daten.offeneFragen || []).slice().sort(function (a, b) { return b.anzahl - a.anzahl; });
    var themen = Object.keys(daten.themen || {}).sort(function (a, b) {
      return daten.themen[b] - daten.themen[a];
    });
    return {
      besuche: daten.besuche || 0,
      beantwortet: daten.beantwortet || 0,
      offeneFragen: offen,
      themen: themen,
      gewichte: Object.keys(daten.gewichte || {}).length
    };
  }

  function berichtText() {
    var b = bericht();
    var t = "LERNBERICHT – Hahne Digital Assistent\n" +
      "Stand: " + new Date().toLocaleString("de-DE") + "\n\n" +
      "Besuche dieses Geräts: " + b.besuche + "\n" +
      "Beantwortete Fragen mit Rückmeldung: " + b.beantwortet + "\n" +
      "Gelernte Begriffsverknüpfungen: " + b.gewichte + "\n" +
      "Meistgelesene Themen: " + (b.themen.join(", ") || "keine erfasst") + "\n\n" +
      "UNBEANTWORTETE FRAGEN (Vorlage für assistant-data.js):\n";
    if (!b.offeneFragen.length) t += "  keine – der Assistent kam bisher mit allem zurecht.\n";
    b.offeneFragen.forEach(function (f) {
      t += "  " + f.anzahl + "× \"" + f.text + "\"  (Seite: " + f.seite + ")\n";
    });
    return t;
  }

  /* --- Ansprache nach Verweildauer -------------------------------------------- */
  function hauptthema() {
    var quelle = Object.keys(sitzung.abschnitte).length ? sitzung.abschnitte : (daten.themen || {});
    var beste = null, wert = 0;
    Object.keys(quelle).forEach(function (k) { if (quelle[k] > wert) { wert = quelle[k]; beste = k; } });
    return beste;
  }

  var ANSPRACHE = {
    preise: { text: "Sie schauen sich gerade die Preise an. Soll ich kurz erklären, was Kauf und Miete unterscheidet?", frage: "Kaufen oder mieten?" },
    miete: { text: "Fragen zur Miete? Ich erkläre gern Laufzeit, Grundgebühr und Einrichtungspauschale.", frage: "Wie lange ist die Vertragslaufzeit?" },
    module: { text: "Viele Module auf einmal – soll ich helfen, das passende zu finden?", frage: "Was ist ein Modul?" },
    server: { text: "Unsicher, ob Sie einen eigenen Server brauchen? Ich sage Ihnen ehrlich, wann sich das lohnt.", frage: "Brauche ich einen eigenen Server?" },
    sichtbarkeit: { text: "Frage zur Sichtbarkeit bei Google? Ich erkläre in zwei Sätzen, worum es geht.", frage: "Wie werde ich bei Google gefunden?" },
    beratung: { text: "Noch unsicher, was zu Ihnen passt? Vier kurze Fragen reichen für eine erste Einordnung.", frage: "Welches Modul passt zu mir?" },
    kontakt: { text: "Möchten Sie lieber direkt mit uns schreiben? Der Live-Chat ist einen Klick entfernt.", frage: null },
    leistungen: { text: "Kann ich etwas zu unseren Leistungen erklären?", frage: "Was macht ihr?" },
    ablauf: { text: "Soll ich kurz zusammenfassen, wie ein Projekt bei uns abläuft?", frage: "Wie läuft das ab?" }
  };

  function anspracheText() {
    var t = hauptthema();
    var a = ANSPRACHE[t];
    if (daten.besuche > 1 && speicherFrei) {
      return { text: "Schön, dass Sie wieder da sind. " +
        (a ? a.text.replace(/^[A-ZÄÖÜ][^.!?]*[.!?]\s*/, "") : "Kann ich bei etwas helfen?"),
        frage: a ? a.frage : null };
    }
    return a || { text: "Kann ich bei etwas helfen? Ich beantworte Fragen zu Leistungen, Modulen und Preisen.", frage: null };
  }

  /* --- Nach außen sichtbare Schnittstelle -------------------------------------- */
  window.KIA_LERNEN = {
    speicherFrei: function () { return speicherFrei; },
    darfFragen: function () { return verfuegbar(); },
    einwilligen: einwilligen,
    ablehnen: function () { loeschen(); },
    loeschen: loeschen,
    istWiederkehrer: function () { return speicherFrei && daten.besuche > 1; },
    besuche: function () { return daten.besuche || 0; },
    bonus: bonus,
    merkeTreffer: merkeTreffer,
    merkeOffeneFrage: merkeOffeneFrage,
    hauptthema: hauptthema,
    ansprache: anspracheText,
    bericht: bericht,
    berichtText: berichtText,
    wartezeit: WARTEZEIT,
    schonGefragt: function () { return sitzung.gefragt; },
    gefragt: function () { sitzung.gefragt = true; }
  };
})();
