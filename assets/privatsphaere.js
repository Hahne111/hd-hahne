/* ==========================================================================
   HAHNE DIGITAL – Privatsphäre-Hinweis
   --------------------------------------------------------------------------
   Warum dieser Hinweis anders aussieht als anderswo:

   Diese Website setzt KEINE Cookies, keine Analysewerkzeuge, keine
   Werbenetzwerke und lädt nichts von fremden Servern. Ein klassisches
   Cookie-Banner mit "Alle akzeptieren" wäre hier schlicht unwahr – man
   kann nichts akzeptieren, was es nicht gibt.

   Einwilligungspflichtig ist nur eines: das Gedächtnis des Assistenten,
   das Angaben im lokalen Speicher des Browsers ablegt (§ 25 Abs. 1 TDDDG).
   Genau darüber – und nur darüber – entscheidet der Besucher hier.

   Einstellungen in site-config.js:
     hinweisImmerZeigen: true   -> Hinweis bei jedem Seitenaufruf
                         false  -> Entscheidung wird gemerkt (empfohlen)
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var SCHLUESSEL = "hd_privatsphaere";
  var IMMER = S.hinweisImmerZeigen === true;

  function gespeichert() {
    try { return JSON.parse(window.localStorage.getItem(SCHLUESSEL) || "null"); }
    catch (e) { return null; }
  }
  function sichern(wahl) {
    try {
      window.localStorage.setItem(SCHLUESSEL, JSON.stringify({
        wahl: wahl, zeitpunkt: new Date().toISOString(), fassung: 1
      }));
    } catch (e) {}
  }
  function vergessen() {
    try { window.localStorage.removeItem(SCHLUESSEL); } catch (e) {}
  }

  /* --- Hinweisleiste ---------------------------------------------------------- */
  function bauen() {
    if (document.getElementById("privBanner")) return;

    var box = document.createElement("div");
    box.className = "priv";
    box.id = "privBanner";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Hinweis zur Privatsphäre");
    box.innerHTML =
      '<div class="priv-inhalt">' +
        '<div class="priv-text">' +
          '<b data-t="priv.titel">Ihre Daten bleiben bei Ihnen</b>' +
          "<p>Diese Website setzt <strong>keine Cookies</strong>, nutzt keine Analyse- oder " +
          "Werbedienste und lädt keine Inhalte von fremden Servern. Es gibt hier also nichts " +
          "zu verfolgen und nichts zu verkaufen.</p>" +
          "<p>Eine einzige Funktion ist freiwillig: Unser Assistent kann sich <strong>auf Ihrem " +
          "Gerät</strong> merken, welche Themen Sie gelesen haben und welche Antworten geholfen " +
          "haben, um beim nächsten Besuch besser zu helfen. Diese Angaben werden nicht an uns " +
          "übertragen und lassen sich jederzeit löschen.</p>" +
        "</div>" +
        '<div class="priv-aktionen">' +
          '<button class="btn btn-primary" type="button" data-wahl="alles" data-t="priv.erlauben">Gedächtnis erlauben</button>' +
          '<button class="btn btn-ghost" type="button" data-wahl="nichts" data-t="priv.ablehnen">Nur das Nötigste</button>' +
          '<div class="priv-links">' +
            '<a href="datenschutz.html" data-t="priv.datenschutz">Datenschutzerklärung</a>' +
            '<a href="datenschutz.html#lernfunktion" data-t="priv.was">Was wird gespeichert?</a>' +
          "</div>" +
        "</div>" +
      "</div>";

    document.body.appendChild(box);
    if (window.SPRACHE) window.SPRACHE.wechseln(window.SPRACHE.aktuell());
    window.setTimeout(function () { box.classList.add("an"); }, 60);

    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-wahl]");
      if (!b) return;
      entscheiden(b.dataset.wahl);
      box.classList.remove("an");
      window.setTimeout(function () { box.remove(); }, 250);
    });
  }

  function entscheiden(wahl) {
    if (!IMMER) sichern(wahl);
    var L = window.KIA_LERNEN;
    if (!L) return;
    if (wahl === "alles") L.einwilligen();
    else L.ablehnen();
  }

  /* --- Einstellungen später ändern --------------------------------------------- */
  function einstellungen() {
    var alt = document.getElementById("privDialog");
    if (alt) alt.remove();
    var L = window.KIA_LERNEN;
    var aktiv = L && L.speicherFrei();

    var dlg = document.createElement("dialog");
    dlg.className = "priv-dialog";
    dlg.id = "privDialog";
    dlg.innerHTML =
      '<div class="priv-dialog-kopf">' +
        "<div><p class=\"kicker\">Privatsphäre</p><h3>Ihre Einstellungen</h3></div>" +
        '<button class="demo-schliessen" type="button" data-zu="1" aria-label="Schließen">×</button>' +
      "</div>" +
      '<div class="priv-dialog-inhalt">' +
        '<div class="priv-zeile">' +
          "<div><b>Notwendig</b><span>Sprachwahl und diese Entscheidung. Ohne sie müsste die Seite " +
          "bei jedem Aufruf neu fragen.</span></div>" +
          '<span class="priv-status fest">immer aktiv</span>' +
        "</div>" +
        '<div class="priv-zeile">' +
          "<div><b>Gedächtnis des Assistenten</b><span>Merkt auf Ihrem Gerät, welche Themen Sie " +
          "gelesen haben und welche Antworten geholfen haben. Keine Übertragung an uns.</span></div>" +
          '<button class="priv-schalter' + (aktiv ? " an" : "") + '" type="button" data-schalter="1" ' +
            'role="switch" aria-checked="' + (aktiv ? "true" : "false") + '">' +
            "<span></span></button>" +
        "</div>" +
        '<div class="priv-zeile">' +
          "<div><b>Nicht vorhanden</b><span>Cookies, Analysewerkzeuge, Werbenetzwerke, externe " +
          "Schriftarten, Social-Media-Plugins. Nichts davon wird eingesetzt.</span></div>" +
          '<span class="priv-status aus">nicht genutzt</span>' +
        "</div>" +
        '<p class="priv-fein">Beim Prüfen einer Wunschdomain und beim Versand über WhatsApp verlassen ' +
        "Daten Ihr Gerät – darauf wird an der jeweiligen Stelle gesondert hingewiesen.</p>" +
        '<div class="priv-dialog-fuss">' +
          '<button class="btn btn-ghost" type="button" data-loeschen="1">Alle gespeicherten Angaben löschen</button>' +
          '<a class="btn btn-primary" href="datenschutz.html">Zur Datenschutzerklärung</a>' +
        "</div>" +
      "</div>";
    document.body.appendChild(dlg);

    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest("[data-zu]")) { dlg.close(); dlg.remove(); return; }

      var sch = e.target.closest("[data-schalter]");
      if (sch) {
        var an = !sch.classList.contains("an");
        sch.classList.toggle("an", an);
        sch.setAttribute("aria-checked", an ? "true" : "false");
        if (window.KIA_LERNEN) { an ? window.KIA_LERNEN.einwilligen() : window.KIA_LERNEN.ablehnen(); }
        if (!IMMER) sichern(an ? "alles" : "nichts");
        return;
      }

      if (e.target.closest("[data-loeschen]")) {
        if (window.KIA_LERNEN) window.KIA_LERNEN.loeschen();
        vergessen();
        var s2 = dlg.querySelector("[data-schalter]");
        if (s2) { s2.classList.remove("an"); s2.setAttribute("aria-checked", "false"); }
        var f = dlg.querySelector(".priv-fein");
        f.innerHTML = "<b>Erledigt – alle auf diesem Gerät gespeicherten Angaben wurden gelöscht.</b>";
      }
    });

    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }

  /* --- Fußzeilen-Link ----------------------------------------------------------- */
  function linkSetzen() {
    document.querySelectorAll(".footlinks").forEach(function (nav) {
      if (nav.querySelector(".priv-link")) return;
      var a = document.createElement("a");
      a.href = "#";
      a.className = "priv-link";
      a.textContent = "Privatsphäre";
      a.setAttribute("data-t", "priv.link");
      a.addEventListener("click", function (e) { e.preventDefault(); einstellungen(); });
      nav.appendChild(a);
    });
  }

  function start() {
    linkSetzen();
    var frueher = gespeichert();
    if (IMMER || !frueher) bauen();
    else if (frueher.wahl === "alles" && window.KIA_LERNEN) window.KIA_LERNEN.einwilligen();
  }

  window.PRIVATSPHAERE = { einstellungen: einstellungen, zuruecksetzen: vergessen };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
