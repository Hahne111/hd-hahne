/* ==========================================================================
   HAHNE DIGITAL – Sprachumschaltung
   --------------------------------------------------------------------------
   · Übersetzt alle Elemente mit data-t="schluessel"
   · Platzhalter über data-t-platzhalter, Titel über data-t-titel
   · Merkt die Wahl im Browser (nur die Sprache, sonst nichts)
   · Setzt lang und dir am <html>, damit Arabisch von rechts nach links läuft
   · Seiten ohne vollständige Übersetzung bekommen eine ehrliche Hinweiszeile
   ========================================================================== */
(function () {
  "use strict";

  var SPRACHEN = window.SPRACHEN || [{ code: "de", name: "Deutsch", dir: "ltr" }];
  var TEXTE = window.TEXTE || {};
  var SCHLUESSEL = "hd_sprache";
  var VOLL = ["index.html", ""];          // vollständig übersetzte Seiten

  function gespeichert() {
    try { return window.localStorage.getItem(SCHLUESSEL); } catch (e) { return null; }
  }
  function merken(code) {
    try { window.localStorage.setItem(SCHLUESSEL, code); } catch (e) {}
  }

  function browserSprache() {
    var roh = (navigator.language || "de").toLowerCase().split("-")[0];
    return SPRACHEN.some(function (s) { return s.code === roh; }) ? roh : "de";
  }

  var aktuell = gespeichert() || browserSprache();

  function text(schluessel, code) {
    var block = TEXTE[code || aktuell] || {};
    return block[schluessel] || (TEXTE.de || {})[schluessel] || "";
  }

  function eintrag(code) {
    return SPRACHEN.filter(function (s) { return s.code === code; })[0] || SPRACHEN[0];
  }

  /* --- Übersetzen ----------------------------------------------------------- */
  function anwenden(code) {
    aktuell = code;
    var s = eintrag(code);
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("dir", s.dir || "ltr");
    document.body.classList.toggle("rtl", s.dir === "rtl");

    document.querySelectorAll("[data-t]").forEach(function (el) {
      var t = text(el.getAttribute("data-t"), code);
      if (t) el.textContent = t;
    });
    document.querySelectorAll("[data-t-platzhalter]").forEach(function (el) {
      var t = text(el.getAttribute("data-t-platzhalter"), code);
      if (t) el.setAttribute("placeholder", t);
    });
    document.querySelectorAll("[data-t-titel]").forEach(function (el) {
      var t = text(el.getAttribute("data-t-titel"), code);
      if (t) el.setAttribute("title", t);
    });

    var knopf = document.getElementById("sprachKnopf");
    if (knopf) {
      knopf.querySelector(".sprach-code").textContent = code.toUpperCase();
      knopf.setAttribute("aria-label", text("nav.sprache", code) + ": " + s.name);
    }
    document.querySelectorAll("#sprachListe [data-code]").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.code === code ? "true" : "false");
    });

    hinweisPflegen(code);
    merken(code);
    document.dispatchEvent(new CustomEvent("sprachwechsel", { detail: { code: code } }));
  }

  /* --- Hinweis auf Seiten ohne vollständige Übersetzung ---------------------- */
  function hinweisPflegen(code) {
    var alt = document.getElementById("sprachHinweis");
    if (alt) alt.remove();
    if (code === "de") return;

    var seite = window.location.pathname.split("/").pop();
    var rechtsseite = ["impressum.html", "datenschutz.html", "agb.html"].indexOf(seite) > -1;
    var vollstaendig = VOLL.indexOf(seite) > -1;
    if (vollstaendig && !rechtsseite) return;

    var box = document.createElement("div");
    box.id = "sprachHinweis";
    box.className = "sprach-hinweis";
    box.innerHTML = "<span>" +
      (rechtsseite ? text("hinweis.recht", code) : text("hinweis.sprache", code)) +
      " " + text("hinweis.kontakt", code) + "</span>";
    var nav = document.querySelector(".nav");
    if (nav && nav.parentNode) nav.parentNode.insertBefore(box, nav.nextSibling);
  }

  /* --- Umschalter aufbauen --------------------------------------------------- */
  function schalterBauen() {
    var ziel = document.querySelector(".navin");
    if (!ziel || document.getElementById("sprachWahl")) return;

    var box = document.createElement("div");
    box.className = "sprach-wahl";
    box.id = "sprachWahl";
    box.innerHTML =
      '<button class="sprach-knopf" id="sprachKnopf" type="button" aria-expanded="false" aria-controls="sprachListe">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.4 0 2.9 2.2 3.4 5.2H8.6C9.1 6.2 10.6 4 12 4zM4.3 11h3.1c-.05.65-.08 1.32-.08 2s.03 1.35.08 2H4.3a8 8 0 0 1 0-4zm5.1 0h5.2c.06.63.1 1.3.1 2s-.04 1.37-.1 2H9.4c-.06-.63-.1-1.3-.1-2s.04-1.37.1-2zm7.2 0h3.1a8 8 0 0 1 0 4h-3.1c.05-.65.08-1.32.08-2s-.03-1.35-.08-2zm2.2-2h-2.6c-.3-1.9-.85-3.5-1.6-4.6A8 8 0 0 1 18.8 9zM10.7 4.4C9.95 5.5 9.4 7.1 9.1 9H6.5a8 8 0 0 1 4.2-4.6zM6.5 15h2.6c.3 1.9.85 3.5 1.6 4.6A8 8 0 0 1 6.5 15zm5.5 5c-1.4 0-2.9-2.2-3.4-5.2h6.8c-.5 3-2 5.2-3.4 5.2zm1.3-.4c.75-1.1 1.3-2.7 1.6-4.6h2.6a8 8 0 0 1-4.2 4.6z"/></svg>' +
        '<span class="sprach-code">DE</span>' +
      "</button>" +
      '<div class="sprach-liste" id="sprachListe" role="menu" hidden>' +
        SPRACHEN.map(function (s) {
          return '<button role="menuitem" type="button" data-code="' + s.code + '" lang="' + s.code + '">' +
            "<b>" + s.name + "</b><span>" + s.deutsch + "</span></button>";
        }).join("") +
      "</div>";

    var burger = ziel.querySelector(".burger");
    if (burger) ziel.insertBefore(box, burger);
    else ziel.appendChild(box);

    var knopf = document.getElementById("sprachKnopf");
    var liste = document.getElementById("sprachListe");

    knopf.addEventListener("click", function () {
      var auf = liste.hidden;
      liste.hidden = !auf;
      knopf.setAttribute("aria-expanded", auf ? "true" : "false");
    });
    liste.addEventListener("click", function (e) {
      var b = e.target.closest("[data-code]");
      if (!b) return;
      liste.hidden = true;
      knopf.setAttribute("aria-expanded", "false");
      anwenden(b.dataset.code);
    });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target)) { liste.hidden = true; knopf.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { liste.hidden = true; knopf.setAttribute("aria-expanded", "false"); }
    });
  }

  window.SPRACHE = {
    aktuell: function () { return aktuell; },
    text: text,
    wechseln: anwenden
  };

  function start() { schalterBauen(); anwenden(aktuell); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
