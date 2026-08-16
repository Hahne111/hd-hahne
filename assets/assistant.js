/* ==========================================================================
   HAHNE DIGITAL – Seitenassistent
   --------------------------------------------------------------------------
   Arbeitet ausschließlich lokal im Browser:
     · keine Netzwerkverbindung, kein fetch, kein externer Dienst
     · keine Speicherung von Eingaben
     · Wissensquelle: assistant-data.js und modules.js

   Ablauf einer Antwort:
     1. Frage in Wörter zerlegen und normalisieren (Umlaute, Endungen)
     2. Synonyme ergänzen ("kosten" -> "preis")
     3. Modulnamen prüfen -> Preisauskunft direkt aus dem Katalog
     4. Wissenseinträge bewerten, bester Treffer gewinnt
     5. Kein sicherer Treffer -> ehrliche Auskunft plus Vorschläge
   ========================================================================== */
(function () {
  "use strict";

  var WISSEN = window.ASSISTENT_WISSEN || [];
  var MODULE = window.MODULE || [];
  var MIETE = window.MIETE || { grundgebuehr: 79, mindestlaufzeit: 24, einrichtung: 149 };
  if (!WISSEN.length) return;

  /* --- Sprachhilfen -------------------------------------------------------- */
  var STOPP = ("und oder aber der die das den dem des ein eine einen einem eines ich du sie wir ihr " +
    "mir mich uns euch mein meine unser ist sind war waren hat habe haben kann könnt können muss " +
    "müssen soll sollen wird werden es auf an in im am zu zum zur für von mit bei aus nach über " +
    "wie was wo wer wann warum welche welcher welches denn doch mal bitte hallo guten tag danke " +
    "gibt gibts man auch noch schon nur sehr ganz eigentlich").split(" ");

  var SYNONYME = {
    kosten: "preis", teuer: "preis", euro: "preis", betrag: "preis", gebuehr: "preis",
    bezahlen: "preis", zahlen: "preis", investition: "preis", guenstig: "preis",
    mieten: "miete", mietmodell: "miete", abo: "miete", leasing: "miete", monatlich: "miete",
    kaufen: "kauf", einmalig: "kauf",
    vertrag: "laufzeit", bindung: "laufzeit", kuendigen: "laufzeit", kuendigung: "laufzeit",
    telefon: "kontakt", anrufen: "kontakt", mail: "kontakt", erreichen: "kontakt",
    adresse: "kontakt", termin: "kontakt", beratung: "kontakt", angebot: "kontakt",
    datenschutz: "dsgvo", daten: "dsgvo", sicherheit: "dsgvo", server: "dsgvo",
    programm: "modul", software: "modul", funktion: "modul", baustein: "modul",
    dauer: "dauer", lange: "dauer", zeit: "dauer", schnell: "dauer",
    ki: "ki", intelligenz: "ki", bot: "ki", chatbot: "ki",
    handy: "mobil", smartphone: "mobil", tablet: "mobil", unterwegs: "mobil"
  };

  function normalisieren(wort) {
    return wort.toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, "");
  }

  function stamm(w) {
    return w.replace(/(ungen|ung|erin|innen|nen|ern|en|er|es|em|st|e|n|s)$/, "");
  }

  function zerlegen(text) {
    var roh = text.split(/\s+/).map(normalisieren).filter(function (w) {
      return w.length > 1 && STOPP.indexOf(w) === -1;
    });
    var tokens = [];
    roh.forEach(function (w) {
      tokens.push(w);
      var s = stamm(w);
      if (s.length > 2 && s !== w && STOPP.indexOf(s) === -1) tokens.push(s);
      if (SYNONYME[w]) tokens.push(SYNONYME[w]);
      if (SYNONYME[s]) tokens.push(SYNONYME[s]);
    });
    return tokens;
  }

  /* --- Bewertung ----------------------------------------------------------- */
  WISSEN.forEach(function (e) {
    e._tokens = {};
    e.fragen.forEach(function (f) {
      zerlegen(f).forEach(function (t) { e._tokens[t] = true; });
    });
    e._phrasen = e.fragen.map(function (f) { return normalisieren(f.replace(/\s+/g, "")); });
  });

  function bewerten(frage) {
    var tokens = zerlegen(frage);
    var kompakt = normalisieren(frage.replace(/\s+/g, ""));
    if (!tokens.length) return [];

    return WISSEN.map(function (e) {
      var treffer = 0;
      var gesehen = {};
      tokens.forEach(function (t) {
        if (gesehen[t]) return;
        gesehen[t] = true;
        if (e._tokens[t]) treffer += t.length > 4 ? 2 : 1;
      });
      var punkte = treffer;
      e._phrasen.forEach(function (p) {
        if (p.length > 6 && kompakt.indexOf(p) > -1) punkte += 6;
      });
      if (window.KIA_LERNEN) punkte += window.KIA_LERNEN.bonus(frage, e.id);
      return { eintrag: e, punkte: punkte };
    }).filter(function (r) { return r.punkte > 0; })
      .sort(function (a, b) { return b.punkte - a.punkte; });
  }

  /* --- Modulauskunft aus dem Katalog --------------------------------------- */
  function modulTreffer(frage) {
    var kompakt = normalisieren(frage.replace(/\s+/g, ""));
    var tokens = zerlegen(frage);
    var beste = null, bestPunkte = 0;

    MODULE.forEach(function (m) {
      var name = normalisieren(m.name.replace(/\s+/g, ""));
      var punkte = 0;
      if (name.length > 4 && kompakt.indexOf(name) > -1) punkte += 12;
      // Einzelbegriffe und Abkürzungen aus dem Modulnamen (CRM, DMS, POS, PWA …)
      m.name.split(/[^A-Za-zÄÖÜäöüß0-9]+/).filter(Boolean).forEach(function (teil) {
        var t = normalisieren(teil);
        if (t.length < 2 || STOPP.indexOf(t) > -1) return;   // Bindewörter im Modulnamen (z. B. "bei") sind keine Abkürzung
        var kurz = t.length <= 4;   // Abkürzung
        if (tokens.indexOf(t) > -1 || (kurz && kompakt.indexOf(t) > -1)) punkte += kurz ? 8 : 5;
        var st = stamm(t);
        if (st.length > 3 && tokens.indexOf(st) > -1) punkte += 2;
      });
      if (punkte > bestPunkte) { bestPunkte = punkte; beste = m; }
    });
    return { modul: bestPunkte >= 5 ? beste : null, punkte: bestPunkte };
  }

  // Geschütztes Leerzeichen: Betrag und Eurozeichen bleiben in einer Zeile
  function euro(n) { return n.toLocaleString("de-DE") + "\u00a0€"; }

  function modulAntwort(m) {
    var text = "<b>" + m.name + "</b><br>" + m.kurz + "<br><br>";
    if (m.preis > 0) {
      text += "<b>Kauf:</b> ab " + euro(m.preis) + " einmalig<br>";
      if (m.miete) {
        text += "<b>Miete:</b> " + euro(m.miete) + " im Monat, dazu die Grundgebühr von " +
          euro(MIETE.grundgebuehr) + " im Monat und einmalig " + euro(MIETE.einrichtung) +
          " Einrichtungspauschale – <b>Vertragslaufzeit " + MIETE.mindestlaufzeit + " Monate</b><br>";
      }
    } else if (m.monat) {
      text += "<b>Preis:</b> " + euro(m.monat) + " im Monat, monatlich kündbar<br>";
    }
    if (m.monat && m.preis > 0) text += "Dazu " + euro(m.monat) + " im Monat für die Nutzung der Dienste dahinter<br>";
    text += "<b>Umsetzung:</b> " + m.aufwand;
    if (m.basis) text += "<br><i>Hinweis: Erweiterung – setzt ein passendes Grundmodul voraus.</i>";
    text += "<br><br>Enthalten ist unter anderem:<br>· " + m.punkte.join("<br>· ");
    return { antwort: text, link: { text: "Im Katalog ansehen", href: "module.html#katalog" } };
  }

  /* --- Antwort bestimmen ---------------------------------------------------- */
  function antworten(frage) {
    var treffer = bewerten(frage);
    var m = modulTreffer(frage);
    var wissenPunkte = treffer.length ? treffer[0].punkte : 0;

    if (m.modul && m.punkte > wissenPunkte) {
      return { art: "modul", modul: m.modul, antwort: modulAntwort(m.modul).antwort,
               link: modulAntwort(m.modul).link };
    }
    if (treffer.length && treffer[0].punkte >= 2) {
      return { art: "wissen", eintrag: treffer[0].eintrag, antwort: treffer[0].eintrag.antwort,
               link: treffer[0].eintrag.link, weitere: treffer.slice(1, 4) };
    }
    return null;
  }

  /* Module einer Kategorie auflisten, wenn nach einem Bereich gefragt wird */
  function kategorieAntwort(frage) {
    var tokens = zerlegen(frage);
    var beste = null, punkte = 0;
    (window.MODULE_KATEGORIEN || []).forEach(function (k) {
      var p = 0;
      zerlegen(k.name).forEach(function (t) { if (t.length > 3 && tokens.indexOf(t) > -1) p += 4; });
      if (p > punkte) { punkte = p; beste = k; }
    });
    if (!beste || punkte < 4) return null;
    var liste = MODULE.filter(function (m) { return m.kategorie === beste.id; });
    if (!liste.length) return null;
    return {
      art: "liste",
      antwort: "Im Bereich <b>" + beste.name + "</b> gibt es " + liste.length + " Module:<br>· " +
        liste.map(function (m) {
          return m.name + " – " + (m.preis > 0 ? "ab " + euro(m.preis) : euro(m.monat) + "/Mon.");
        }).join("<br>· "),
      link: { text: "Im Katalog ansehen", href: "module.html#katalog" }
    };
  }

  /* ==========================================================================
     Oberfläche
     ========================================================================== */
  var S = window.SITE || {};

  var THEMEN = [
    { titel: "Preise & Kosten",     frage: "Was kostet das?" },
    { titel: "Kaufen oder mieten",  frage: "Kaufen oder mieten?" },
    { titel: "Vertragslaufzeit",    frage: "Wie lange ist die Vertragslaufzeit?" },
    { titel: "Module im Überblick", frage: "Was ist ein Modul?" },
    { titel: "Ablauf eines Projekts", frage: "Wie läuft das ab?" },
    { titel: "Bei Google gefunden werden", frage: "Wie werde ich bei Google gefunden?" },
    { titel: "Eigener Server",      frage: "Brauche ich einen eigenen Server?" },
    { titel: "Datenschutz",         frage: "Wo liegen meine Daten?" }
  ];

  var huelle = document.createElement("div");
  huelle.className = "kia";
  huelle.innerHTML =
    '<div class="kia-lockruf" id="kiaLockruf" hidden>Fragen zur Seite? Ich helfe sofort weiter.' +
      '<button type="button" class="kia-lockruf-zu" aria-label="Hinweis schließen">×</button></div>' +
    '<button class="kia-knopf" id="kiaKnopf" type="button" aria-expanded="false" aria-controls="kiaFenster">' +
      '<span class="kia-punkt" aria-hidden="true"></span><span data-t="kia.knopf">Fragen oder chatten</span>' +
    "</button>" +

    '<section class="kia-fenster" id="kiaFenster" role="dialog" aria-label="Hilfe und Kontakt" hidden>' +
      '<header class="kia-kopf">' +
        '<button class="kia-zurueck" id="kiaZurueck" type="button" aria-label="Zurück zur Übersicht" hidden>‹</button>' +
        '<div class="kia-titel"><b id="kiaTitel" data-t="kia.titel">Wie können wir helfen?</b>' +
          '<span id="kiaStatus">Antwort sofort oder persönlich</span></div>' +
        '<button class="kia-zu" id="kiaZu" type="button" aria-label="Fenster schließen">×</button>' +
      "</header>" +

      /* Startansicht */
      '<div class="kia-ansicht" id="ansichtStart">' +
        '<div class="kia-wege">' +
          '<button class="kia-weg" type="button" data-ziel="assistent">' +
            '<span class="kia-weg-symbol" aria-hidden="true">⌕</span>' +
            "<b data-t=\"kia.frage\">Frage stellen</b><span data-t=\"kia.frage.sub\">Sofortantwort aus den Seiteninhalten</span></button>" +
          '<button class="kia-weg" type="button" data-ziel="chat">' +
            '<span class="kia-weg-symbol" aria-hidden="true">✉</span>' +
            "<b data-t=\"kia.chat\">Mit uns schreiben</b><span id=\"wegChatStatus\">Nachricht an unser Team</span></button>" +
        "</div>" +
        '<p class="kia-abschnitt" data-t="kia.themen">Häufige Themen</p>' +
        '<div class="kia-themen" id="kiaThemen"></div>' +
        '<div class="kia-direkt">' +
          '<a class="kia-direkt-btn" data-site-link="telefon" href="#"><b data-t="kia.anrufen">Anrufen</b><span data-site="telefon">–</span></a>' +
          '<a class="kia-direkt-btn" href="index.html#kontakt"><b data-t="kia.formular">Formular</b><span data-t="kia.formular.sub">ausführlich anfragen</span></a>' +
        "</div>" +
      "</div>" +

      /* Assistent */
      '<div class="kia-ansicht" id="ansichtAssistent" hidden>' +
        '<div class="kia-verlauf" id="kiaVerlauf" role="log" aria-live="polite"></div>' +
        '<div class="kia-vorschlaege" id="kiaVorschlaege"></div>' +
        '<form class="kia-eingabe" id="kiaForm">' +
          '<label class="visually-hidden" for="kiaFeld">Ihre Frage</label>' +
          '<input id="kiaFeld" type="text" autocomplete="off" placeholder="Frage eingeben …" data-t-platzhalter="kia.eingabe">' +
          '<button class="kia-mikro" id="kiaMikro" type="button" aria-pressed="false" title="Per Mikrofon sprechen" hidden>🎤</button>' +
          '<button class="kia-ton" id="kiaTon" type="button" aria-pressed="false" title="Antworten vorlesen" hidden>🔈</button>' +
          '<button class="kia-senden" type="submit" aria-label="Frage senden">→</button>' +
        "</form>" +
        '<p class="kia-fuss">Antwortet nur mit Inhalten dieser Website · läuft in Ihrem Browser · ' +
          '<button class="kia-reset" id="kiaReset" type="button">Verlauf zurücksetzen</button></p>' +
      "</div>" +

      /* Live-Chat */
      '<div class="kia-ansicht" id="ansichtChat" hidden>' +
        '<div class="kia-verlauf" id="chatVerlauf" role="log" aria-live="polite"></div>' +
        '<form class="kia-eingabe kia-eingabe-chat" id="chatForm">' +
          '<label class="visually-hidden" for="chatFeld">Ihre Nachricht</label>' +
          '<input id="chatFeld" type="text" autocomplete="off" placeholder="Nachricht schreiben …" data-t-platzhalter="kia.nachricht">' +
          '<button class="kia-senden" type="submit" aria-label="Nachricht senden">→</button>' +
        "</form>" +
        '<p class="kia-fuss" id="chatFuss"></p>' +
      "</div>" +
    "</section>";
  document.body.appendChild(huelle);
  if (window.SPRACHE) window.SPRACHE.wechseln(window.SPRACHE.aktuell());

  var $ = function (id) { return document.getElementById(id); };
  var knopf = $("kiaKnopf"), fenster = $("kiaFenster"), verlauf = $("kiaVerlauf");
  var form = $("kiaForm"), feld = $("kiaFeld"), vorschlagBox = $("kiaVorschlaege");
  var zurueck = $("kiaZurueck"), titelEl = $("kiaTitel"), statusEl = $("kiaStatus");
  var ansichten = { start: $("ansichtStart"), assistent: $("ansichtAssistent"), chat: $("ansichtChat") };
  var aktuell = "start";
  var letzteFrage = "";

  /* --- Themenkacheln -------------------------------------------------------- */
  $("kiaThemen").innerHTML = THEMEN.map(function (t) {
    return '<button class="kia-thema" type="button" data-frage="' + t.frage + '">' + t.titel + "</button>";
  }).join("");
  $("kiaThemen").addEventListener("click", function (e) {
    var b = e.target.closest(".kia-thema");
    if (b) { zeige("assistent"); stellen(b.dataset.frage); }
  });
  $("ansichtStart").querySelector(".kia-wege").addEventListener("click", function (e) {
    var b = e.target.closest(".kia-weg");
    if (b) zeige(b.dataset.ziel);
  });

  /* --- Ansichtswechsel ------------------------------------------------------ */
  function zeige(name) {
    aktuell = name;
    Object.keys(ansichten).forEach(function (k) { ansichten[k].hidden = k !== name; });
    zurueck.hidden = name === "start";
    titelEl.textContent = name === "assistent" ? "Website-Assistent"
                        : name === "chat" ? "Live-Chat" : "Wie können wir helfen?";
    statusEl.textContent = name === "assistent" ? "Antwortet aus den Seiteninhalten"
                        : name === "chat" ? (erreichbar() ? "Jetzt besetzt" : "Außerhalb der Zeiten")
                        : "Antwort sofort oder persönlich";
    if (name === "assistent") {
      if (!verlauf.childElementCount) begruessung();
      feld.focus();
    }
    if (name === "chat") { chatStart(); $("chatFeld").focus(); }
  }
  zurueck.addEventListener("click", function () { zeige("start"); });

  /* --- Blasen ---------------------------------------------------------------- */
  function uhrzeit() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }

  function blase(text, wer, link, ziel) {
    var box = ziel || verlauf;
    var el = document.createElement("div");
    el.className = "kia-blase kia-" + wer;
    el.innerHTML = '<div class="kia-text">' + text + "</div>" +
      (link ? '<a class="kia-link" href="' + link.href + '">' + link.text + " →</a>" : "") +
      '<span class="kia-zeit">' + uhrzeit() + "</span>";
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
    return el;
  }

  function vorschlaegeZeigen(liste) {
    vorschlagBox.innerHTML = liste.map(function (v) {
      return '<button class="kia-chip" type="button">' + v + "</button>";
    }).join("");
  }
  vorschlagBox.addEventListener("click", function (e) {
    var chip = e.target.closest(".kia-chip");
    if (chip) stellen(chip.textContent);
  });

  /* --- Rückmeldung zur Antwort ------------------------------------------------ */
  function feedbackAnhaengen(el, frage) {
    var box = document.createElement("div");
    box.className = "kia-feedback";
    box.innerHTML = '<span>Hat das geholfen?</span>' +
      '<button type="button" data-gut="1" aria-label="Ja">Ja</button>' +
      '<button type="button" data-gut="0" aria-label="Nein">Nein</button>';
    el.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var gut = b.dataset.gut === "1";
      if (window.KIA_LERNEN && el.dataset.eintrag) {
        window.KIA_LERNEN.merkeTreffer(frage, el.dataset.eintrag, gut);
      }
      box.innerHTML = gut
        ? "<span>Freut mich – ich merke mir die Formulierung.</span>"
        : "<span>Dann fragen Sie am besten direkt nach.</span>";
      if (!gut) {
        var el2 = blase("Ich gebe Ihre Frage gern an unser Team weiter – dort antwortet ein Mensch.", "es");
        var w = document.createElement("div");
        w.className = "kia-abfrage";
        w.innerHTML = '<button class="kia-chip" type="button" id="uebergabe">Frage ans Team geben</button>';
        el2.appendChild(w);
        w.querySelector("#uebergabe").addEventListener("click", function () {
          zeige("chat");
          $("chatFeld").value = frage;
          $("chatFeld").focus();
        });
      }
    });
  }

  /* --- Frage stellen ---------------------------------------------------------- */
  function stellen(frage) {
    letzteFrage = frage;
    blase(frage, "ich");
    feld.value = "";
    vorschlagBox.innerHTML = "";

    var tippt = document.createElement("div");
    tippt.className = "kia-blase kia-es kia-tippt";
    tippt.innerHTML = "<span></span><span></span><span></span>";
    verlauf.appendChild(tippt);
    verlauf.scrollTop = verlauf.scrollHeight;

    window.setTimeout(function () {
      tippt.remove();
      if (/^lernbericht$/i.test(frage.trim())) { zeigeBericht(); return; }
      var a = kategorieAntwort(frage) || antworten(frage);
      if (a) {
        var el = blase(a.antwort, "es", a.link);
        if (a.eintrag) el.dataset.eintrag = a.eintrag.id;
        vorlesen(a.antwort);
        feedbackAnhaengen(el, frage);
        if (a.weitere && a.weitere.length) {
          vorschlaegeZeigen(a.weitere.map(function (w) {
            var f = w.eintrag.fragen[0];
            return f.charAt(0).toUpperCase() + f.slice(1) + "?";
          }));
        }
      } else {
        var el2 = blase("Dazu finde ich auf dieser Website nichts. Ich kenne nur die Inhalte dieser Seite – " +
          "im Internet suchen kann ich nicht.", "es");
        var w = document.createElement("div");
        w.className = "kia-abfrage";
        w.innerHTML = '<button class="kia-chip" type="button" data-tun="chat">Frage ans Team geben</button>' +
                      '<button class="kia-chip" type="button" data-tun="themen">Themen anzeigen</button>';
        el2.appendChild(w);
        w.addEventListener("click", function (e) {
          var b = e.target.closest("button");
          if (!b) return;
          if (b.dataset.tun === "chat") { zeige("chat"); $("chatFeld").value = frage; $("chatFeld").focus(); }
          else zeige("start");
        });
        vorlesen("Dazu finde ich auf dieser Website nichts.");
        if (window.KIA_LERNEN) window.KIA_LERNEN.merkeOffeneFrage(frage);
      }
    }, 360);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = feld.value.trim();
    if (t) stellen(t);
  });

  /* --- Verlauf zurücksetzen ---------------------------------------------------- */
  var resetKnopf = $("kiaReset");
  if (resetKnopf) {
    resetKnopf.addEventListener("click", function () {
      verlauf.innerHTML = "";
      vorschlagBox.innerHTML = "";
      begruessung();
      feld.focus();
    });
  }

  /* --- Sprachausgabe --------------------------------------------------------- */
  var tonKnopf = $("kiaTon"), tonAn = false, synth = window.speechSynthesis;

  if (S.sprachAusgabe !== false && synth) {
    tonKnopf.hidden = false;
    tonKnopf.addEventListener("click", function () {
      tonAn = !tonAn;
      tonKnopf.setAttribute("aria-pressed", tonAn ? "true" : "false");
      tonKnopf.classList.toggle("an", tonAn);
      tonKnopf.textContent = tonAn ? "🔊" : "🔈";
      tonKnopf.title = tonAn ? "Vorlesen ausschalten" : "Antworten vorlesen";
      if (!tonAn) synth.cancel();
      else blase("Vorlesen ist eingeschaltet. Den Ton erzeugt Ihr Gerät selbst – es werden keine Daten übertragen.", "es");
    });
  }

  function vorlesen(html) {
    if (!tonAn || !synth) return;
    var text = html.replace(/<br\s*\/?>/gi, ". ").replace(/<[^>]+>/g, " ")
      .replace(/·/g, ",").replace(/\s+/g, " ").trim();
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 1.02;
    synth.speak(u);
  }

  /* --- Spracheingabe ---------------------------------------------------------- */
  var Erkennung = window.SpeechRecognition || window.webkitSpeechRecognition;
  var mikro = $("kiaMikro"), erkenner = null, hoertZu = false, mikroErlaubt = false;

  if (S.sprachEingabe !== false && Erkennung) {
    mikro.hidden = false;
    mikro.addEventListener("click", function () {
      if (!mikroErlaubt) { mikroHinweis(); return; }
      hoertZu ? stoppHoeren() : starteHoeren();
    });
  }

  function mikroHinweis() {
    var el = blase("Kurz vorweg: Die <b>Spracherkennung übernimmt Ihr Browser</b>, nicht diese Website. " +
      "Je nach Browser – etwa bei Chrome – wird die Aufnahme dafür an dessen Anbieter übertragen. " +
      "Auswertung und Antwort bleiben vollständig auf Ihrem Gerät. Mikrofon trotzdem nutzen?", "es");
    var box = document.createElement("div");
    box.className = "kia-abfrage";
    box.innerHTML = '<button class="kia-chip" type="button" data-ja="1">Ja, Mikrofon nutzen</button>' +
                    '<button class="kia-chip" type="button" data-ja="0">Lieber tippen</button>';
    el.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      box.remove();
      if (b.dataset.ja === "1") { mikroErlaubt = true; starteHoeren(); }
      else { blase("Kein Problem – tippen Sie einfach.", "es"); feld.focus(); }
    });
  }

  function starteHoeren() {
    if (!erkenner) {
      erkenner = new Erkennung();
      erkenner.lang = "de-DE";
      erkenner.interimResults = true;
      erkenner.continuous = false;
      erkenner.onresult = function (e) {
        var text = "";
        for (var i = e.resultIndex; i < e.results.length; i++) text += e.results[i][0].transcript;
        feld.value = text;
        if (e.results[e.results.length - 1].isFinal) {
          stoppHoeren();
          var t = text.trim();
          if (t) stellen(t);
        }
      };
      erkenner.onerror = function (e) {
        stoppHoeren();
        blase(e.error === "not-allowed"
          ? "Der Zugriff auf das Mikrofon wurde abgelehnt. Sie können die Frage gern eintippen."
          : "Ich konnte nichts verstehen. Versuchen Sie es noch einmal oder tippen Sie die Frage.", "es");
      };
      erkenner.onend = function () { stoppHoeren(); };
    }
    try {
      if (synth) synth.cancel();
      erkenner.start();
      hoertZu = true;
      mikro.classList.add("an");
      mikro.setAttribute("aria-pressed", "true");
      feld.placeholder = "Ich höre zu …";
    } catch (err) { stoppHoeren(); }
  }

  function stoppHoeren() {
    hoertZu = false;
    mikro.classList.remove("an");
    mikro.setAttribute("aria-pressed", "false");
    feld.placeholder = "Frage eingeben …";
    if (erkenner) { try { erkenner.stop(); } catch (e) {} }
  }

  /* --- Live-Chat --------------------------------------------------------------- */
  var chatVerlauf = $("chatVerlauf"), chatForm = $("chatForm"), chatFeld = $("chatFeld"),
      chatFuss = $("chatFuss"), chatBegonnen = false, chatPuffer = [];

  function erreichbar() {
    var z = S.chatZeiten || { tage: [1, 2, 3, 4, 5], von: 8, bis: 17 };
    var j = new Date();
    return z.tage.indexOf(j.getDay()) > -1 && j.getHours() >= z.von && j.getHours() < z.bis;
  }

  function statusPflegen() {
    var da = erreichbar();
    var p = document.querySelector(".kia-punkt");
    if (p) p.classList.toggle("aus", !da);
    var w = $("wegChatStatus");
    if (w) w.textContent = da ? "Jetzt besetzt – wir antworten zügig" : "Gerade unbesetzt – wir melden uns";
    if (aktuell === "chat") statusEl.textContent = da ? "Jetzt besetzt" : "Außerhalb der Zeiten";
  }
  statusPflegen();
  window.setInterval(statusPflegen, 60000);

  function chatStart() {
    chatFuss.textContent = S.chatEndpoint
      ? "Nachrichten gehen direkt an unser Team."
      : "Sie wählen selbst, wie die Nachricht zu uns kommt.";
    if (chatBegonnen) return;
    chatBegonnen = true;
    var z = S.chatZeiten || {};
    blase(erreichbar()
      ? "Moin, hier schreiben Sie mit einem Menschen. Schildern Sie kurz Ihr Anliegen – wir antworten " +
        (S.chatAntwort || "so schnell wie möglich") + "."
      : "Moin! Gerade sitzt niemand am Rechner – erreichbar sind wir montags bis freitags von " +
        (z.von || 8) + " bis " + (z.bis || 17) + " Uhr. Schreiben Sie trotzdem, wir melden uns am nächsten Werktag.",
      "es", null, chatVerlauf);
  }

  function kanalWahl() {
    var text = chatPuffer.join("\n");
    var el = blase("Damit wir antworten können, wählen Sie bitte einen Weg. Ihre Nachricht ist schon vorbereitet.",
      "es", null, chatVerlauf);
    var box = document.createElement("div");
    box.className = "kia-kanaele";
    var teile = [];
    if (S.whatsapp) {
      teile.push('<a class="kia-kanal" target="_blank" rel="noopener" href="https://wa.me/' + S.whatsapp +
        "?text=" + encodeURIComponent(text) + '"><b>WhatsApp</b><span>sofort, Antwort aufs Handy</span></a>');
    }
    if (S.email) {
      teile.push('<a class="kia-kanal" href="mailto:' + S.email + "?subject=" +
        encodeURIComponent("Chat-Anfrage über die Website") + "&body=" + encodeURIComponent(text) +
        '"><b>E-Mail</b><span>' + S.email + "</span></a>");
    }
    if (S.telefon) {
      teile.push('<a class="kia-kanal" href="tel:' + String(S.telefon).replace(/[^+0-9]/g, "") +
        '"><b>Anrufen</b><span>' + S.telefon + "</span></a>");
    }
    teile.push('<a class="kia-kanal" href="index.html#kontakt"><b>Formular</b><span>ausführlich mit Rückrufwunsch</span></a>');
    box.innerHTML = teile.join("");
    el.appendChild(box);
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = chatFeld.value.trim();
    if (!t) return;
    blase(t, "ich", null, chatVerlauf);
    chatFeld.value = "";
    chatPuffer.push(t);

    if (S.chatEndpoint) {
      fetch(S.chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nachricht: t, seite: window.location.pathname })
      }).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (d) {
          blase(d && d.antwort ? d.antwort : "Ihre Nachricht ist angekommen. Wir melden uns gleich.",
            "es", null, chatVerlauf);
        })
        .catch(function () {
          blase("Die Verbindung hat gerade nicht funktioniert.", "es", null, chatVerlauf);
          kanalWahl();
        });
    } else if (chatPuffer.length === 1) {
      window.setTimeout(kanalWahl, 450);
    }
  });

  /* --- Fenster öffnen und schließen -------------------------------------------- */
  var lockruf = $("kiaLockruf");

  function oeffnen(auf) {
    fenster.hidden = !auf;
    knopf.setAttribute("aria-expanded", auf ? "true" : "false");
    document.body.classList.toggle("kia-offen", auf);
    if (auf) {
      if (lockruf) lockruf.hidden = true;
      statusPflegen();
      zeige(aktuell === "start" ? "start" : aktuell);
    } else {
      if (synth) synth.cancel();
      if (hoertZu) stoppHoeren();
    }
  }

  knopf.addEventListener("click", function () { oeffnen(fenster.hidden); });
  $("kiaZu").addEventListener("click", function () { oeffnen(false); knopf.focus(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !fenster.hidden) {
      if (aktuell !== "start") zeige("start"); else { oeffnen(false); knopf.focus(); }
    }
  });

  /* --- Lernbericht für den Betreiber ------------------------------------------ */
  function zeigeBericht() {
    if (!window.KIA_LERNEN) { blase("Das Lernmodul ist nicht geladen.", "es"); return; }
    var b = window.KIA_LERNEN.bericht();
    var text = "<b>Lernbericht</b><br>Besuche dieses Geräts: " + b.besuche +
      "<br>Fragen mit Rückmeldung: " + b.beantwortet +
      "<br>Gelernte Verknüpfungen: " + b.gewichte +
      "<br>Meistgelesene Themen: " + (b.themen.slice(0, 4).join(", ") || "keine") +
      "<br><br><b>Unbeantwortet (" + b.offeneFragen.length + ")</b>";
    if (b.offeneFragen.length) {
      text += "<br>· " + b.offeneFragen.slice(0, 8).map(function (f) {
        return f.anzahl + "× „" + f.text + "“";
      }).join("<br>· ");
    } else text += "<br>keine";
    var el = blase(text, "es");
    var box = document.createElement("div");
    box.className = "kia-abfrage";
    box.innerHTML = '<button class="kia-chip" type="button" id="berichtKopieren">Bericht kopieren</button>';
    el.appendChild(box);
    box.querySelector("#berichtKopieren").addEventListener("click", function () {
      var t = window.KIA_LERNEN.berichtText();
      if (navigator.clipboard) navigator.clipboard.writeText(t);
      blase("Der Bericht liegt in der Zwischenablage. Die offenen Fragen gehören als neue Einträge in <b>assistant-data.js</b>.", "es");
    });
  }

  /* --- Einwilligung zum Merken ------------------------------------------------- */
  function merkenFragen() {
    var el = blase("Damit ich mich beim nächsten Besuch an unser Gespräch erinnere und passendere Vorschläge machen kann, " +
      "würde ich mir ein paar Angaben <b>auf Ihrem Gerät</b> merken: welche Themen Sie gelesen haben und welche Antworten " +
      "geholfen haben. Nichts davon wird an uns übertragen, und Sie können es jederzeit wieder löschen. Einverstanden?", "es");
    var box = document.createElement("div");
    box.className = "kia-abfrage";
    box.innerHTML = '<button class="kia-chip" type="button" data-ja="1">Ja, merken</button>' +
                    '<button class="kia-chip" type="button" data-ja="0">Nein, danke</button>';
    el.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      box.remove();
      if (b.dataset.ja === "1") {
        window.KIA_LERNEN.einwilligen();
        blase("Gemerkt. Sie können das jederzeit über „Merken beenden“ unten im Fenster rückgängig machen.", "es");
        loeschKnopfPflegen();
      } else {
        window.KIA_LERNEN.ablehnen();
        blase("Alles klar – dann vergesse ich alles, sobald Sie die Seite schließen.", "es");
      }
    });
  }

  function loeschKnopfPflegen() {
    var fuss = document.querySelector("#ansichtAssistent .kia-fuss");
    if (!fuss || !window.KIA_LERNEN) return;
    var alt = document.getElementById("kiaVergessen");
    if (alt) alt.remove();
    if (!window.KIA_LERNEN.speicherFrei()) return;
    var b = document.createElement("button");
    b.id = "kiaVergessen";
    b.type = "button";
    b.className = "kia-vergessen";
    b.textContent = "Merken beenden und Daten löschen";
    b.addEventListener("click", function () {
      window.KIA_LERNEN.loeschen();
      b.remove();
      blase("Erledigt – alle gespeicherten Angaben auf diesem Gerät sind gelöscht.", "es");
    });
    fuss.parentNode.insertBefore(b, fuss);
  }

  /* --- Begrüßung je nach Vorgeschichte ------------------------------------------ */
  function begruessung() {
    var L = window.KIA_LERNEN;
    if (L && L.istWiederkehrer()) {
      var thema = L.hauptthema();
      blase("Schön, dass Sie wieder da sind – das ist Ihr " + L.besuche() + ". Besuch." +
        (thema ? " Beim letzten Mal ging es vor allem um <b>" + thema + "</b>." : "") +
        " Woran arbeiten wir heute?", "es");
    } else {
      blase("Moin! Stellen Sie Ihre Frage – tippen oder per Mikrofon. Ich antworte mit den Inhalten dieser Website.", "es");
    }
    var themen = THEMEN.slice(0, 4).map(function (t) { return t.frage; });
    var h = L && L.hauptthema();
    var passend = { preise: "Was kostet das?", miete: "Kaufen oder mieten?", server: "Brauche ich einen eigenen Server?",
                    sichtbarkeit: "Wie werde ich bei Google gefunden?", module: "Was ist ein Modul?" }[h];
    if (passend) themen = [passend].concat(themen.filter(function (t) { return t !== passend; })).slice(0, 4);
    vorschlaegeZeigen(themen);
    loeschKnopfPflegen();
    if (L && L.darfFragen() && !L.speicherFrei()) window.setTimeout(merkenFragen, 900);
  }

  /* --- Hilfe von sich aus anbieten ---------------------------------------------- */
  if (lockruf) {
    lockruf.querySelector(".kia-lockruf-zu").addEventListener("click", function () {
      lockruf.hidden = true;
      if (window.KIA_LERNEN) window.KIA_LERNEN.gefragt();
    });

    var aktivSeit = 0, letzterTick = Date.now(), aktiv = true;
    ["mousemove", "keydown", "scroll", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, function () { aktiv = true; }, { passive: true });
    });
    document.addEventListener("visibilitychange", function () { aktiv = !document.hidden; });

    var takt = window.setInterval(function () {
      var jetzt = Date.now();
      if (aktiv) aktivSeit += jetzt - letzterTick;
      letzterTick = jetzt;
      aktiv = !document.hidden;

      var L = window.KIA_LERNEN;
      var wartezeit = L ? L.wartezeit : 45000;
      if (aktivSeit < wartezeit) return;
      window.clearInterval(takt);
      if (!fenster.hidden || (L && L.schonGefragt())) return;

      var a = L ? L.ansprache() : { text: "Kann ich bei etwas helfen?", frage: null };
      lockruf.innerHTML = '<button type="button" class="kia-lockruf-zu" aria-label="Hinweis schließen">×</button>' +
        '<p class="kia-lockruf-text">' + a.text + "</p>" +
        '<div class="kia-lockruf-aktionen">' +
          (a.frage ? '<button type="button" class="kia-chip" data-frage="' + a.frage + '">' + a.frage + "</button>" : "") +
          '<button type="button" class="kia-chip" data-oeffnen="1">Assistent öffnen</button>' +
        "</div>";
      lockruf.hidden = false;
      if (L) L.gefragt();

      lockruf.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        if (b.classList.contains("kia-lockruf-zu")) { lockruf.hidden = true; return; }
        lockruf.hidden = true;
        oeffnen(true);
        zeige("assistent");
        if (b.dataset.frage) stellen(b.dataset.frage);
      });
    }, 1000);
  }
})();
