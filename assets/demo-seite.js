/* ==========================================================================
   HAHNE DIGITAL – Demoseite zum Ausprobieren
   --------------------------------------------------------------------------
   Die Demo ist ein Übungsbereich: Einträge anlegen, bearbeiten, Status
   ändern, sortieren, suchen und löschen. Alles läuft nur im Browser und
   wird beim Neuladen zurückgesetzt – es gibt keine Datenbank dahinter.

   Aufruf: demo.html?modul=crm
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var MODULE = window.MODULE || [];
  var KATEGORIEN = window.MODULE_KATEGORIEN || [];
  var DEMOS = window.MODULE_DEMOS || {};
  var MIETE = window.MIETE || { grundgebuehr: 79, mindestlaufzeit: 24, einrichtung: 149 };
  if (!MODULE.length || !$("#demoNavi")) return;

  // Geschütztes Leerzeichen: Betrag und Eurozeichen bleiben in einer Zeile
  var euro = function (n) { return n.toLocaleString("de-DE") + "\u00a0€"; };

  var aktuell = null;      // Modul-ID
  var daten = [];          // Arbeitskopie der Zeilen
  var spalten = [];
  var sortiert = { spalte: null, ab: false };
  var suchtext = "";
  var gewaehlt = -1;

  /* Zusatzwerkzeug je Modul – macht die Demo lebendig */
  var WERKZEUG = {
    zeiterfassung: "stoppuhr", belegscan: "scan", barcode: "scan",
    terminbuchung: "termin", kalender: "termin", plantafel: "termin",
    "kalender-api": "termin", service: "termin", schicht: "termin"
  };

  /* --- Liste links ---------------------------------------------------------- */
  function naviBauen(filter) {
    var suche = (filter || "").toLowerCase();
    var html = "";
    KATEGORIEN.forEach(function (k) {
      var liste = MODULE.filter(function (m) {
        if (m.kategorie !== k.id || !DEMOS[m.id]) return false;
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
    $("#demoNavi").innerHTML = html || '<p class="demo-leer">Kein Modul gefunden.</p>';
    markieren();
  }

  function markieren() {
    $$(".demo-eintrag").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.id === aktuell ? "true" : "false");
    });
  }

  $("#demoNavi").addEventListener("click", function (e) {
    var b = e.target.closest(".demo-eintrag");
    if (b) zeigen(b.dataset.id, true);
  });
  $("#demoSuche").addEventListener("input", function () { naviBauen(this.value); });

  /* --- Tabelle ---------------------------------------------------------------- */
  function statusWerte() {
    var werte = {};
    (DEMOS[aktuell].zeilen || []).forEach(function (z) { werte[z[z.length - 1]] = true; });
    daten.forEach(function (z) { werte[z[z.length - 1]] = true; });
    var liste = Object.keys(werte);
    // Zu wenige Zustände zum Umschalten? Dann allgemeine ergänzen.
    if (liste.length < 2) liste = liste.concat(["in Arbeit", "erledigt"].filter(function (w) {
      return liste.indexOf(w) === -1;
    }));
    return liste;
  }

  function tabelleZeichnen() {
    var koerper = $("#demoTabelle");
    if (!koerper) return;

    var sichtbar = daten.map(function (z, i) { return { z: z, i: i }; }).filter(function (e) {
      return !suchtext || e.z.join(" ").toLowerCase().indexOf(suchtext) > -1;
    });

    if (sortiert.spalte !== null) {
      sichtbar.sort(function (a, b) {
        var x = a.z[sortiert.spalte] || "", y = b.z[sortiert.spalte] || "";
        return (sortiert.ab ? -1 : 1) * x.localeCompare(y, "de", { numeric: true });
      });
    }

    koerper.innerHTML =
      '<div class="demo-zeile demo-titelzeile">' +
        spalten.map(function (c, i) {
          var pfeil = sortiert.spalte === i ? (sortiert.ab ? " ↓" : " ↑") : "";
          return '<button type="button" class="demo-sort" data-spalte="' + i + '">' + c + pfeil + "</button>";
        }).join("") +
      "</div>" +
      (sichtbar.length
        ? sichtbar.map(function (e) {
            return '<div class="demo-zeile' + (e.i === gewaehlt ? " gewaehlt" : "") +
              '" tabindex="0" data-i="' + e.i + '">' +
              e.z.map(function (w, j) {
                return j === 0 ? "<b>" + w + "</b>"
                     : j === e.z.length - 1 ? '<span class="demo-status">' + w + "</span>"
                     : "<span>" + w + "</span>";
              }).join("") + "</div>";
          }).join("")
        : '<p class="demo-keine">Kein Eintrag passt zur Suche.</p>');

    $("#demoAnzahl").textContent = daten.length + (daten.length === 1 ? " Eintrag" : " Einträge");
    detailZeichnen();
  }

  function detailZeichnen() {
    var box = $("#demoDetail");
    if (!box) return;
    if (gewaehlt < 0 || !daten[gewaehlt]) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    var z = daten[gewaehlt];
    box.innerHTML =
      '<div class="demo-detail-kopf"><b>' + z[0] + "</b>" +
        '<button class="demo-detail-zu" type="button" data-schliessen="1" aria-label="Auswahl aufheben">×</button></div>' +
      '<p class="demo-detail-zeile">' + spalten.slice(1).map(function (c, i) {
        return "<span>" + c + ": <b>" + (z[i + 1] || "–") + "</b></span>";
      }).join("") + "</p>" +
      '<div class="demo-detail-aktionen">' +
        '<span class="demo-detail-titel">Status ändern:</span>' +
        statusWerte().map(function (w) {
          return '<button class="demo-chip' + (w === z[z.length - 1] ? " an" : "") +
            '" type="button" data-status="' + w + '">' + w + "</button>";
        }).join("") +
        '<button class="demo-loeschen" type="button" data-loeschen="1">Eintrag löschen</button>' +
      "</div>";
  }

  /* --- Demo darstellen --------------------------------------------------------- */
  function zeigen(id, verlauf) {
    var m = MODULE.filter(function (x) { return x.id === id; })[0];
    var d = DEMOS[id];
    if (!m || !d) return;

    aktuell = id;
    spalten = d.spalten.slice();
    daten = d.zeilen.map(function (z) { return z.slice(); });
    sortiert = { spalte: null, ab: false };
    suchtext = "";
    gewaehlt = -1;

    document.title = d.titel + " – Demo | Hahne Digital";
    $("#demoTitel").textContent = m.name;
    $("#demoUnter").textContent = d.titel;
    $("#demoFensterName").textContent = d.fenster;

    var preisbox = $("#demoPreis");
    preisbox.hidden = false;
    preisbox.innerHTML =
      (m.preis > 0 ? "<div><b>ab " + euro(m.preis) + "</b><span>einmalig zum Kauf</span></div>"
                   : "<div><b>" + euro(m.monat) + "</b><span>je Monat</span></div>") +
      (m.miete > 0 ? "<div><b>" + euro(m.miete) + "</b><span>je Monat zur Miete · " +
        MIETE.mindestlaufzeit + " Monate</span></div>" : "") +
      "<div><b>" + m.aufwand + "</b><span>Umsetzung</span></div>";

    var werkzeug = WERKZEUG[id];
    var werkzeugName = { stoppuhr: "Zeit starten", scan: "Beleg scannen", termin: "Termin eintragen" }[werkzeug];

    $("#demoApp").innerHTML =
      '<div class="demo-hinweis-probe">' +
        "<b>Zum Ausprobieren</b> – legen Sie Einträge an, ändern Sie den Status, sortieren und löschen Sie. " +
        "Alles bleibt in Ihrem Browser und ist beim Neuladen wieder wie vorher." +
      "</div>" +
      '<div class="demo-app-kopf">' +
        '<div class="demo-app-suche"><input type="search" id="demoAppSuche" ' +
          'placeholder="In dieser Ansicht suchen …" aria-label="In der Beispielansicht suchen"></div>' +
        '<div class="demo-app-knoepfe">' +
          '<button class="demo-app-btn haupt" type="button" data-neu="1">+ ' + (d.aktionen ? d.aktionen[0] : "Neuer Eintrag") + "</button>" +
          (werkzeug ? '<button class="demo-app-btn" type="button" data-werkzeug="' + werkzeug + '">' + werkzeugName + "</button>" : "") +
          '<button class="demo-app-btn" type="button" data-zuruecksetzen="1">Zurücksetzen</button>' +
        "</div>" +
      "</div>" +
      '<form class="demo-neu" id="demoNeu" hidden></form>' +
      '<div class="demo-app-kennzahlen">' +
        d.stats.map(function (s) {
          return '<div class="demo-kpi"><b>' + s[0] + "</b><span>" + s[1] + "</span></div>";
        }).join("") +
      "</div>" +
      '<p class="demo-zaehler" id="demoAnzahl"></p>' +
      '<div class="demo-tabelle" id="demoTabelle"></div>' +
      '<div class="demo-detail" id="demoDetail" hidden></div>' +
      '<p class="demo-fussnote">Übungsbereich mit erfundenen Daten · in Ihrem System werden Felder und Abläufe an Ihren Betrieb angepasst</p>';

    tabelleZeichnen();

    $("#demoErklaerung").innerHTML =
      "<b>Was Sie hier sehen</b><p>" + d.erklaerung + "</p>" +
      '<div class="demo-punkte"><b>Im Modul enthalten</b><ul>' +
        m.punkte.map(function (p) { return "<li>" + p + "</li>"; }).join("") +
      "</ul></div>";

    $("#demoNext").hidden = false;
    $("#demoVormerken").href = "module.html?vormerken=" + id + "#katalog";
    var anlLink = $("#demoAnleitung");
    if (!anlLink) {
      anlLink = document.createElement("a");
      anlLink.className = "btn btn-ghost";
      anlLink.id = "demoAnleitung";
      anlLink.textContent = "Ausführliche Anleitung";
      $("#demoNext").insertBefore(anlLink, $("#demoNext").children[1]);
    }
    anlLink.href = "anleitung.html?modul=" + id;

    markieren();
    if (verlauf && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "demo.html?modul=" + id);
    }
    if (verlauf && window.innerWidth < 980) {
      $(".demo-buehne").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* --- Eingabemaske ------------------------------------------------------------ */
  function maskeZeigen(vorgabe) {
    var form = $("#demoNeu");
    form.hidden = false;
    form.innerHTML =
      '<p class="demo-neu-titel">Neuen Eintrag anlegen</p>' +
      '<div class="demo-neu-felder">' +
        spalten.map(function (c, i) {
          var wert = vorgabe && vorgabe[i] ? vorgabe[i] : "";
          if (i === spalten.length - 1) {
            return '<label>' + c + '<select data-f="' + i + '">' +
              statusWerte().map(function (w) {
                return '<option' + (w === wert ? " selected" : "") + ">" + w + "</option>";
              }).join("") + "</select></label>";
          }
          return '<label>' + c + '<input data-f="' + i + '" value="' + wert.replace(/"/g, "&quot;") +
            '" placeholder="' + (daten[0] ? String(daten[0][i]).slice(0, 24) : "") + '"></label>';
        }).join("") +
      "</div>" +
      '<div class="demo-neu-knoepfe">' +
        '<button class="demo-app-btn haupt" type="submit">Speichern</button>' +
        '<button class="demo-app-btn" type="button" data-abbrechen="1">Abbrechen</button>' +
      "</div>";
    var erstes = form.querySelector("input");
    if (erstes) erstes.focus();
  }

  /* --- Bedienung --------------------------------------------------------------- */
  document.addEventListener("input", function (e) {
    if (e.target.id === "demoAppSuche") { suchtext = e.target.value.toLowerCase(); tabelleZeichnen(); }
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id !== "demoNeu") return;
    e.preventDefault();
    var werte = spalten.map(function (c, i) {
      var f = e.target.querySelector('[data-f="' + i + '"]');
      return (f && f.value.trim()) || "–";
    });
    daten.unshift(werte);
    gewaehlt = 0;
    e.target.hidden = true;
    tabelleZeichnen();
  });

  document.addEventListener("click", function (e) {
    if (!aktuell) return;

    if (e.target.closest("[data-neu]")) { maskeZeigen(null); return; }
    if (e.target.closest("[data-abbrechen]")) { $("#demoNeu").hidden = true; return; }
    if (e.target.closest("[data-zuruecksetzen]")) {
      zeigen(aktuell, false);
      return;
    }

    var wz = e.target.closest("[data-werkzeug]");
    if (wz) { werkzeugStarten(wz.dataset.werkzeug, wz); return; }

    var sort = e.target.closest(".demo-sort");
    if (sort) {
      var i = +sort.dataset.spalte;
      sortiert = { spalte: i, ab: sortiert.spalte === i && !sortiert.ab };
      tabelleZeichnen();
      return;
    }

    if (e.target.closest("[data-schliessen]")) { gewaehlt = -1; tabelleZeichnen(); return; }
    if (e.target.closest("[data-loeschen]")) {
      daten.splice(gewaehlt, 1);
      gewaehlt = -1;
      tabelleZeichnen();
      return;
    }
    var st = e.target.closest("[data-status]");
    if (st && daten[gewaehlt]) {
      daten[gewaehlt][daten[gewaehlt].length - 1] = st.dataset.status;
      tabelleZeichnen();
      return;
    }

    var zeile = e.target.closest("#demoTabelle .demo-zeile:not(.demo-titelzeile)");
    if (zeile) { gewaehlt = +zeile.dataset.i; tabelleZeichnen(); }
  });

  /* --- Zusatzwerkzeuge ---------------------------------------------------------- */
  var uhrLauf = null, uhrStart = 0;

  function werkzeugStarten(art, knopf) {
    if (art === "stoppuhr") {
      if (uhrLauf) {
        window.clearInterval(uhrLauf);
        uhrLauf = null;
        var min = Math.max(1, Math.round((Date.now() - uhrStart) / 60000));
        var std = (min / 60).toFixed(2).replace(".", ",");
        knopf.textContent = "Zeit starten";
        knopf.classList.remove("laeuft");
        var neu = spalten.map(function (c, i) {
          return i === 0 ? "Ihre Erfassung"
               : i === spalten.length - 1 ? statusWerte()[0]
               : std + " h";
        });
        daten.unshift(neu);
        gewaehlt = 0;
        tabelleZeichnen();
      } else {
        uhrStart = Date.now();
        knopf.classList.add("laeuft");
        uhrLauf = window.setInterval(function () {
          var s = Math.floor((Date.now() - uhrStart) / 1000);
          knopf.textContent = "Stoppen (" + ("0" + Math.floor(s / 60)).slice(-2) + ":" + ("0" + (s % 60)).slice(-2) + ")";
        }, 1000);
      }
      return;
    }

    if (art === "scan") {
      knopf.disabled = true;
      knopf.textContent = "Wird gelesen …";
      window.setTimeout(function () {
        knopf.disabled = false;
        knopf.textContent = "Beleg scannen";
        var beispiele = [["Großhandel Nord", "418,20 €"], ["Baustoffe Kiel", "96,75 €"],
                         ["Tankbeleg", "84,30 €"], ["Werkzeughandel", "312,00 €"]];
        var b = beispiele[Math.floor(Math.random() * beispiele.length)];
        var heute = new Date().toLocaleDateString("de-DE");
        daten.unshift(spalten.map(function (c, i) {
          return i === 0 ? b[0] : i === spalten.length - 1 ? statusWerte()[0] : b[1] + " · " + heute;
        }));
        gewaehlt = 0;
        tabelleZeichnen();
      }, 900);
      return;
    }

    if (art === "termin") {
      var d = new Date(Date.now() + 864e5);
      var tage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      var zeit = tage[d.getDay()] + " " + ("0" + d.getDate()).slice(-2) + "." +
        ("0" + (d.getMonth() + 1)).slice(-2) + ". · " + (8 + Math.floor(Math.random() * 8)) + ":00";
      maskeZeigen([zeit, "Ihr Termin", statusWerte()[0]]);
    }
  }

  /* --- Start -------------------------------------------------------------------- */
  naviBauen("");
  var gewuenscht = new URLSearchParams(window.location.search).get("modul");
  zeigen(DEMOS[gewuenscht] ? gewuenscht : MODULE.filter(function (m) { return DEMOS[m.id]; })[0].id, false);
})();
