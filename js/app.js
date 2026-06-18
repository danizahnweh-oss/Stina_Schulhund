// Schulhund-Lernwebsite — App-Logik
(function () {
  'use strict';

  var MODULE = window.LERN_MODULE.slice().sort(function (a, b) { return a.nr - b.nr; });
  var QUIZ = window.QUIZ || {};
  var KARTEN = window.KARTEN || {};
  var GRAFIK = window.GRAFIK || {};
  var SKEY = 'shb-lern-fortschritt-v1';
  var MODUL_QUIZ_ANZAHL = 6;    // Fragen pro Modul-Quiz-Runde – rotierend aus dem Pool gezogen

  // Farbe + Icon je Modul
  var META = {
    grundlagen:          { c: '#C2693F', i: 'schule' },
    begriffe:            { c: '#B07A3C', i: 'besuch' },
    bindung:             { c: '#B0566B', i: 'herz' },
    wirkmechanismen:     { c: '#C28A3F', i: 'kopf' },
    lernverhalten:       { c: '#6F8F5E', i: 'pfote' },
    markertraining:      { c: '#4E8478', i: 'klick' },
    belohnungen:         { c: '#C97F3A', i: 'keks' },
    signale:             { c: '#7C7BB0', i: 'reden' },
    stress:              { c: '#B5503C', i: 'lupe' },
    koerpersprache:      { c: '#5E7CA6', i: 'pfote' },
    'verhalten-schule':  { c: '#A8743F', i: 'schild' },
    'regeln-interaktionen': { c: '#8A8F4E', i: 'stern' },
    'recht-konzept':     { c: '#6E8FA0', i: 'kreuz' },
    gewoehnung:          { c: '#9A6A8E', i: 'teppich' },
    entspannung:         { c: '#6E9E86', i: 'mond' },
    tierarzt:            { c: '#C58A55', i: 'hand' },
    'erste-hilfe':       { c: '#BD5547', i: 'puls' }
  };
  function metaC(id) { return (META[id] || {}).c || '#C2693F'; }
  function metaIcon(id) { return (window.ICON ? window.ICON((META[id] || {}).i || 'pfote') : ''); }

  // Festes Titelfoto je Modul (aus der Foto-Sammlung herausgeschnitten)
  var FOTO = {
    grundlagen:            [{ s: '01-unter-tisch',        c: 'Der Hund als selbstverständlicher Teil des Klassenraums.' }],
    begriffe:              [{ s: '02-klassenzimmer-sitz',  c: 'Schul(begleit)hund, Besuchshund & Co. – Begriffe mit Geschichte.' }],
    bindung:               [{ s: '03-kopf-streicheln',     c: 'Vertraute Berührung: sichtbares Zeichen einer tragfähigen Bindung.' }],
    wirkmechanismen:       [{ s: '04-sitzkreis',           c: 'Im Sitzkreis: soziale, psychologische und physiologische Wirkung in einem.' }],
    lernverhalten:         [{ s: '05-leckerli',            c: 'Verhalten – Konsequenz – Belohnung: operante Konditionierung in Aktion.' }],
    markertraining:        [{ s: '06-clicker',             c: 'Clicker und Leckerlibeutel – das Markersignal als „Versprechen".' }],
    belohnungen:           [{ s: '07-belohnungen',         c: 'Futter, Spielzeug, Schnüffelmatte – Belohnungen variabel halten.' }],
    signale:               [{ s: '08-matte',               c: 'Auf der Decke: ein generalisiertes „Geh auf deinen Platz".' }],
    stress:                [{ s: '09-profil',              c: 'Genau hinschauen: Ohren, Blick und Maul verraten den Stresslevel.' }],
    koerpersprache:        [{ s: '10-kp-1', fit: 'contain', c: 'Vorderkörper-Tiefstellung – die klassische Spielaufforderung.' },
                            { s: '10-kp-2', fit: 'contain', c: 'Aufrechte, neutral-aufmerksame Körperhaltung.' }],
    'verhalten-schule':    [{ s: '11-unter-schultisch',    c: 'Ruhiger Rückzug unter den Tisch statt Verbote im Schulalltag.' }],
    'regeln-interaktionen':[{ s: '12-kind-streichelt',     c: 'Geregelte Interaktion: das Kind respektiert Tempo und Nähe des Hundes.' }],
    'recht-konzept':       [{ s: '13-koerbchen',           c: 'Eigener Ruheplatz mit Napf & Hygiene-Utensilien – im Konzept festgehalten.' }],
    gewoehnung:            [{ s: '14-hundebox',            c: 'Hundebox als sicherer Rückzugsort – Teil der Klassenzimmer-Ausstattung.' }],
    entspannung:           [{ s: '15-schlafen',            c: 'Tiefenentspannung: das Ziel jeder konditionierten Ruhe.' }],
    tierarzt:              [{ s: '16-pfote',               c: 'Pfote geben & halten – Anfass- und Fixierübungen positiv aufgebaut.' }],
    'erste-hilfe':         [{ s: '17-maul',                c: 'Schleimhaut- und Zahnkontrolle am entspannten Hund üben.' }]
  };

  // Bild-Felder zum Selbstbefüllen (eigene Skript-Grafiken / Fotos)
  var SLOTS = {
    koerpersprache: [
      { id: 'kp-1', ph: 'Eigene Körpersprache-Grafik hierher ziehen' },
      { id: 'kp-2', ph: 'z. B. Beschwichtigungssignale' }
    ],
    stress: [{ id: 'st-1', ph: 'Stressanzeichen-Schaubild hierher ziehen' }],
    gewoehnung: [
      { id: 'gw-1', ph: 'Foto: Ruhezone / Klassenzimmer' },
      { id: 'gw-2', ph: 'Foto: Ausstattung' }
    ],
    'regeln-interaktionen': [{ id: 'ri-1', ph: 'Eigenes Regel-Plakat hierher ziehen' }],
    tierarzt: [{ id: 'ta-1', ph: 'Foto: Anfass-/Fixierübung' }],
    'erste-hilfe': [{ id: 'eh-1', ph: 'Foto: Schleimhaut- / Pulskontrolle' }]
  };

  // ---------- Fortschritt (localStorage) ----------
  function ladeStand() {
    try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch (e) { return {}; }
  }
  function speichereStand(s) {
    try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {}
  }
  var stand = ladeStand();
  stand.gelesen = stand.gelesen || {};
  stand.quiz = stand.quiz || {};
  stand.karten = stand.karten || {};
  stand.fehler = stand.fehler || {};
  stand.examGesehen = stand.examGesehen || [];
  stand.ftGesehen = stand.ftGesehen || [];
  stand.quizGesehen = stand.quizGesehen || {};
  if (!stand.pruefungsDatum) { stand.pruefungsDatum = '2026-06-18'; speichereStand(stand); }

  function quizBest(id) { return (stand.quiz[id] && stand.quiz[id].best) || 0; }
  function modulFertig(id) { return !!stand.gelesen[id] && quizBest(id) >= 80; }

  function gesamtFortschritt() {
    var sum = 0;
    MODULE.forEach(function (m) {
      var p = 0;
      if (stand.gelesen[m.id]) p += 0.4;
      p += 0.6 * Math.min(1, quizBest(m.id) / 100);
      sum += p;
    });
    return Math.round((sum / MODULE.length) * 100);
  }

  // ---------- Hilfsfunktionen ----------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function mische(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Wählt `anzahl` Fragen rotierend aus `alle`: zuletzt gezeigte (in `gesehen`,
  // Liste von Fragetexten) kommen zuletzt dran, sodass beim Wiederholen
  // bevorzugt andere Fragen erscheinen und der ganze Pool durchlaufen wird,
  // bevor sich etwas wiederholt. Gibt die Auswahl + aktualisierte Historie zurück.
  function waehleRotierend(alle, anzahl, gesehen) {
    gesehen = gesehen || [];
    var gs = {};
    gesehen.forEach(function (k) { gs[k] = true; });
    var frisch = mische(alle.filter(function (q) { return !gs[q.f]; }));
    var alt = mische(alle.filter(function (q) { return gs[q.f]; }));
    var auswahl = frisch.concat(alt).slice(0, Math.min(anzahl, alle.length));
    var maxHist = Math.max(0, alle.length - auswahl.length);
    var neu = gesehen.slice();
    auswahl.forEach(function (q) {
      var i = neu.indexOf(q.f);
      if (i >= 0) neu.splice(i, 1);
      neu.push(q.f);
    });
    if (neu.length > maxHist) neu = neu.slice(neu.length - maxHist);
    return { auswahl: mische(auswahl), gesehen: neu };
  }
  var PFOTE = '<span class="pfote" aria-hidden="true"><i></i><i></i><i></i><b></b></span>';

  // ---------- Countdown ----------
  function tageBisPruefung() {
    if (!stand.pruefungsDatum) return null;
    var heute = new Date(); heute.setHours(0, 0, 0, 0);
    var ziel = new Date(stand.pruefungsDatum + 'T00:00:00');
    return Math.round((ziel - heute) / 86400000);
  }

  // ---------- Header / Sidebar ----------
  function zeichneKopf() {
    var tage = tageBisPruefung();
    var cdTxt;
    if (tage === null) cdTxt = 'Prüfungstermin festlegen';
    else if (tage > 1) cdTxt = 'Noch <strong>' + tage + ' Tage</strong> bis zur Prüfung';
    else if (tage === 1) cdTxt = 'Morgen ist <strong>Prüfung!</strong>';
    else if (tage === 0) cdTxt = '<strong>Heute ist Prüfungstag – viel Erfolg!</strong>';
    else cdTxt = 'Prüfung war vor ' + (-tage) + ' Tag(en)';
    document.getElementById('countdown').innerHTML = cdTxt;
    var pct = gesamtFortschritt();
    document.getElementById('kopf-prozent').textContent = pct + ' %';
    document.getElementById('kopf-balken').style.width = pct + '%';
  }

  function zeichneSeitenleiste(aktiv) {
    var nav = document.getElementById('seitenleiste');
    nav.innerHTML = '';
    var home = el('a', 'nav-eintrag nav-home' + (aktiv === 'home' ? ' aktiv' : ''),
      PFOTE + '<span>Übersicht</span>');
    home.href = '#/';
    nav.appendChild(home);

    MODULE.forEach(function (m) {
      var fertig = modulFertig(m.id);
      var a = el('a', 'nav-eintrag' + (aktiv === m.id ? ' aktiv' : '') + (fertig ? ' fertig' : ''),
        '<span class="nav-ic" style="color:' + metaC(m.id) + '">' + metaIcon(m.id) + '</span>' +
        '<span class="nav-titel">' + m.titel + '</span>' +
        '<span class="nav-status">' + (fertig ? '✓' : (quizBest(m.id) > 0 || stand.gelesen[m.id] ? '…' : '')) + '</span>');
      a.href = '#/modul/' + m.id;
      nav.appendChild(a);
    });

    var pruef = el('a', 'nav-eintrag nav-pruefung' + (aktiv === 'pruefung' ? ' aktiv' : ''),
      '<span class="nav-nr">★</span><span class="nav-titel">Abschlussprüfung</span>' +
      '<span class="nav-status">' + (stand.examBest ? stand.examBest + '%' : '') + '</span>');
    pruef.href = '#/pruefung';
    nav.appendChild(pruef);

    var fehlerN = Object.keys(stand.fehler || {}).length;
    var fehler = el('a', 'nav-eintrag' + (aktiv === 'fehler' ? ' aktiv' : ''),
      '<span class="nav-nr" style="background:var(--rot-hell);color:var(--rot)">!</span>' +
      '<span class="nav-titel">Meine Fehler</span>' +
      '<span class="nav-status" style="color:var(--akzent-dunkel)">' + (fehlerN || '') + '</span>');
    fehler.href = '#/fehler';
    nav.appendChild(fehler);
  }

  // ---------- Startseite ----------
  function zeigeStart() {
    var main = document.getElementById('inhalt');
    main.innerHTML = '';
    main.scrollTop = 0;

    var pct = gesamtFortschritt();
    var tage = tageBisPruefung();

    var hero = el('section', 'hero');
    hero.innerHTML =
      '<div class="hero-text"><p class="hero-eyebrow">Schulhundausbildung 2025/26 · Schulhunde Bayern e.V.</p>' +
      '<h1>Deine Prüfungs&shy;vorbereitung</h1>' +
      '<p class="hero-sub">' + MODULE.length + ' Lernmodule aus den Ausbildungsskripten – mit Zusammenfassungen, Quiz und Karteikarten. Dein Fortschritt wird automatisch gespeichert.</p>' +
      '<div class="hero-aktionen"></div></div>' +
      '<div class="hero-status"><div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<p class="ring-label">Gesamtfortschritt</p>' +
      '<span class="datum-wrap"><button class="datum-knopf" type="button">' + (stand.pruefungsDatum
        ? 'Prüfung: ' + new Date(stand.pruefungsDatum + 'T00:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) + (tage !== null && tage >= 0 ? ' · noch ' + tage + ' Tage' : '')
        : 'Prüfungstermin festlegen') + '</button>' +
      '<input type="date" class="datum-input" aria-label="Prüfungstermin wählen" value="' + (stand.pruefungsDatum || '') + '"></span></div>';
    main.appendChild(hero);

    var aktionen = hero.querySelector('.hero-aktionen');
    var weiter = naechstesModul();
    if (weiter) {
      var b1 = el('a', 'knopf primaer', (pct > 0 ? 'Weiterlernen' : 'Loslegen') + ' · Modul ' + weiter.nr);
      b1.href = '#/modul/' + weiter.id;
      aktionen.appendChild(b1);
    }
    var b2 = el('a', 'knopf sekundaer', 'Abschlussprüfung üben');
    b2.href = '#/pruefung';
    aktionen.appendChild(b2);

    var datumInput = hero.querySelector('.datum-input');
    hero.querySelector('.datum-knopf').addEventListener('click', function () {
      if (datumInput.showPicker) { try { datumInput.showPicker(); return; } catch (e) {} }
      datumInput.focus(); datumInput.click();
    });
    datumInput.addEventListener('change', function () {
      if (/^\d{4}-\d{2}-\d{2}$/.test(datumInput.value)) {
        stand.pruefungsDatum = datumInput.value;
        speichereStand(stand);
        zeichneKopf(); zeigeStart();
      }
    });

    var grid = el('section', 'modul-grid');
    MODULE.forEach(function (m) {
      var qb = quizBest(m.id);
      var fertig = modulFertig(m.id);
      var karte = el('a', 'modul-karte' + (fertig ? ' fertig' : ''));
      karte.href = '#/modul/' + m.id;
      karte.style.setProperty('--mod', metaC(m.id));
      karte.innerHTML =
        '<div class="mk-kopf"><span class="mk-ic" style="color:' + metaC(m.id) + '">' + metaIcon(m.id) + '</span>' +
        '<span class="mk-tag">' + m.tag + '</span>' +
        '<span class="mk-nr">' + (fertig ? '✓' : String(m.nr).padStart(2, '0')) + '</span></div>' +
        '<h3>' + m.titel + '</h3><p>' + m.kurz + '</p>' +
        '<div class="mk-fuss">' +
        '<span class="mk-chip' + (stand.gelesen[m.id] ? ' an' : '') + '">Gelesen</span>' +
        '<span class="mk-chip' + (qb >= 80 ? ' an' : '') + '">Quiz ' + (qb > 0 ? qb + '%' : '') + '</span>' +
        '</div>';
      grid.appendChild(karte);
    });
    main.appendChild(el('h2', 'grid-titel', 'Lernmodule'));
    main.appendChild(grid);
  }

  function naechstesModul() {
    for (var i = 0; i < MODULE.length; i++) {
      if (!modulFertig(MODULE[i].id)) return MODULE[i];
    }
    return null;
  }

  // ---------- Modulansicht ----------
  function zeigeModul(id, tab) {
    var m = MODULE.filter(function (x) { return x.id === id; })[0];
    if (!m) { location.hash = '#/'; return; }
    tab = tab || 'lernen';
    var main = document.getElementById('inhalt');
    main.innerHTML = '';
    main.scrollTop = 0;
    main.style.setProperty('--mod', metaC(m.id));

    var kopf = el('div', 'modul-kopf');
    kopf.setAttribute('data-screen-label', 'Modul ' + m.nr + ': ' + m.titel);
    kopf.innerHTML = '<span class="modul-kopf-ic" style="color:' + metaC(m.id) + '">' + metaIcon(m.id) + '</span>' +
      '<div><p class="modul-tag">' + m.tag + ' · Modul ' + m.nr + ' von ' + MODULE.length + '</p>' +
      '<h1>' + m.titel + '</h1></div>';
    main.appendChild(kopf);

    var tabs = el('div', 'tab-leiste');
    [['lernen', 'Lernen'], ['quiz', 'Quiz'], ['karten', 'Karteikarten']].forEach(function (t) {
      var b = el('button', 'tab' + (tab === t[0] ? ' aktiv' : ''), t[1]);
      b.type = 'button';
      b.addEventListener('click', function () { location.hash = '#/modul/' + id + '/' + t[0]; });
      tabs.appendChild(b);
    });
    main.appendChild(tabs);

    var bereich = el('div', 'tab-inhalt');
    main.appendChild(bereich);

    if (tab === 'lernen') zeichneLernen(m, bereich);
    else if (tab === 'quiz') {
      // Rotierende Auswahl: jede Runde bevorzugt Fragen, die zuletzt nicht
      // dran waren – „nochmal üben" bringt so andere Fragen.
      var alleQ = QUIZ[m.id] || [];
      var res = waehleRotierend(alleQ, MODUL_QUIZ_ANZAHL, stand.quizGesehen[m.id]);
      stand.quizGesehen[m.id] = res.gesehen;
      speichereStand(stand);
      zeichneQuiz(res.auswahl, bereich, m.id, 'modul');
    }
    else zeichneKarten(m, bereich);
  }

  function zeichneLernen(m, wrap) {
    // Audio-Player – lädt nur die fertige MP3, wird ausgeblendet falls (noch) keine da ist
    var audioPanel = el('section', 'audio-panel');
    audioPanel.innerHTML = '<span class="audio-ic">🔊</span>' +
      '<span class="audio-txt">Seite anhören</span>' +
      '<audio controls preload="none" src="assets/audio/' + m.id + '.m4a"></audio>';
    audioPanel.style.display = 'none';
    var au = audioPanel.querySelector('audio');
    au.addEventListener('loadedmetadata', function () { audioPanel.style.display = ''; });
    au.addEventListener('error', function () { audioPanel.style.display = 'none'; });
    au.load();
    wrap.appendChild(audioPanel);

    if (FOTO[m.id]) {
      var fb = el('section', 'foto-bereich');
      var fhtml = (FOTO[m.id].length > 1 ? '<div class="foto-zwei">' : '');
      FOTO[m.id].forEach(function (f) {
        fhtml += '<figure class="foto-figur' + (f.fit === 'contain' ? ' zeichnung' : '') + '">' +
          '<img src="assets/fotos/' + f.s + '.jpg" alt="' + f.c + '" loading="lazy">' +
          '<figcaption>' + f.c + '</figcaption></figure>';
      });
      if (FOTO[m.id].length > 1) fhtml += '</div>';
      fb.innerHTML = fhtml;
      wrap.appendChild(fb);
    }

    if (GRAFIK[m.id]) {
      var graf = el('section', 'grafik-panel');
      graf.innerHTML = '<h2>' + metaIcon(m.id) + ' Auf einen Blick</h2><div class="grafik-inhalt">' + GRAFIK[m.id] + '</div>';
      wrap.appendChild(graf);
    }

    var zus = el('section', 'zusammenfassung');
    zus.innerHTML = '<h2>' + PFOTE + ' Das Wichtigste in Kürze</h2>' + m.zusammenfassung;
    wrap.appendChild(zus);

    var dt = el('section', 'details-bereich');
    dt.innerHTML = '<h2>Im Detail</h2>';
    m.details.forEach(function (d) {
      var box = el('details', 'detail-box');
      box.innerHTML = '<summary>' + d.t + '</summary><div class="detail-inhalt">' + d.h + '</div>';
      dt.appendChild(box);
    });
    wrap.appendChild(dt);

    var fuss = el('div', 'lern-fuss');
    var gelesen = !!stand.gelesen[m.id];
    var btn = el('button', 'knopf ' + (gelesen ? 'sekundaer' : 'primaer'),
      gelesen ? '✓ Als gelesen markiert' : 'Modul als gelesen markieren');
    btn.type = 'button';
    btn.addEventListener('click', function () {
      stand.gelesen[m.id] = !stand.gelesen[m.id];
      speichereStand(stand);
      zeichneKopf(); zeichneSeitenleiste(m.id); zeigeModul(m.id, 'lernen');
    });
    fuss.appendChild(btn);
    var weiterQuiz = el('button', 'knopf sekundaer', 'Zum Quiz');
    weiterQuiz.type = 'button';
    weiterQuiz.addEventListener('click', function () { location.hash = '#/modul/' + m.id + '/quiz'; });
    fuss.appendChild(weiterQuiz);
    wrap.appendChild(fuss);
  }

  // ---------- Quiz ----------
  function zeichneQuiz(fragen, wrap, modId, modus, herkunft) {
    modus = modus || 'modul';
    herkunft = herkunft || modus;
    wrap.innerHTML = '';
    if (!fragen.length) { wrap.appendChild(el('p', 'leer', 'Für dieses Modul gibt es noch kein Quiz.')); return; }

    var info = el('div', 'quiz-info');
    var best = modus === 'pruefung' ? (stand.examBest || 0) : (modus === 'modul' ? quizBest(modId) : 0);
    info.innerHTML = '<p>' + (modus === 'uebung' ? 'Wiederholung · ' : '') + fragen.length + ' Fragen · Antwort anklicken, du bekommst sofort Rückmeldung.' +
      (best > 0 ? ' Bisheriges Bestergebnis: <strong>' + best + ' %</strong>' : '') +
      (modus === 'modul' ? ' · Ab <strong>80 %</strong> gilt das Modul-Quiz als bestanden.' : '') + '</p>';
    wrap.appendChild(info);

    var beantwortet = 0, richtig = 0;
    var falsche = [];
    var liste = el('div', 'quiz-liste');
    wrap.appendChild(liste);

    fragen.forEach(function (q, qi) {
      var fk = el('div', 'frage-karte');
      fk.innerHTML = '<p class="frage-nr">Frage ' + (qi + 1) + ' / ' + fragen.length + '</p><h3>' + q.f + '</h3>';
      var optWrap = el('div', 'optionen');
      var reihenfolge = mische(q.a.map(function (txt, i) { return { txt: txt, i: i }; }));
      var gesperrt = false;
      reihenfolge.forEach(function (o) {
        var ob = el('button', 'option', o.txt);
        ob.type = 'button';
        ob.addEventListener('click', function () {
          if (gesperrt) return;
          gesperrt = true;
          beantwortet++;
          var korrekt = o.i === q.k;
          if (korrekt) {
            richtig++;
            if (herkunft === 'fehler') { delete stand.fehler[q.f]; speichereStand(stand); }
          } else {
            falsche.push(q);
            if (modus === 'pruefung') { stand.fehler[q.f] = { f: q.f, a: q.a, k: q.k, e: q.e }; speichereStand(stand); }
          }
          Array.prototype.forEach.call(optWrap.children, function (kind, ki) {
            kind.disabled = true;
            if (reihenfolge[ki].i === q.k) kind.classList.add('korrekt');
          });
          if (!korrekt) ob.classList.add('falsch');
          var erk = el('div', 'erklaerung ' + (korrekt ? 'gut' : 'schlecht'),
            '<strong>' + (korrekt ? 'Richtig!' : 'Leider nicht.') + '</strong> ' + q.e);
          fk.appendChild(erk);
          if (beantwortet === fragen.length) zeigeErgebnis();
        });
        optWrap.appendChild(ob);
      });
      fk.appendChild(optWrap);
      liste.appendChild(fk);
    });

    var ergebnisBox = el('div', 'quiz-ergebnis');
    wrap.appendChild(ergebnisBox);

    function neuStart() {
      if (herkunft === 'pruefung') zeigePruefung();
      else if (herkunft === 'fehler') zeigeFehler();
      else zeigeModul(modId, 'quiz');
    }

    function zeigeErgebnis() {
      var pct = Math.round((richtig / fragen.length) * 100);
      var note;
      if (pct >= 92) note = 'Hervorragend – du bist bereit!';
      else if (pct >= 80) note = 'Stark! Das sitzt.';
      else if (pct >= 60) note = 'Gut dabei – schau dir die Fehler nochmal an.';
      else note = 'Noch nicht ganz – lies das Modul nochmal in Ruhe.';
      ergebnisBox.innerHTML = '<div class="ergebnis-karte' + (pct >= 80 ? ' bestanden' : '') + '">' +
        '<div class="ring klein" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
        '<div><h3>' + richtig + ' von ' + fragen.length + ' richtig</h3><p>' + note + '</p></div></div>';

      var knoepfe = el('div', 'ergebnis-aktionen');
      if (falsche.length) {
        var subset = mische(falsche.slice());
        var nurFalsch = el('button', 'knopf primaer', 'Nur die ' + falsche.length + ' falsche' + (falsche.length === 1 ? '' : 'n') + ' wiederholen');
        nurFalsch.type = 'button';
        nurFalsch.addEventListener('click', function () { zeichneQuiz(subset, wrap, modId, 'uebung', herkunft); });
        knoepfe.appendChild(nurFalsch);
      }
      var nochmal = el('button', 'knopf ' + (falsche.length ? 'sekundaer' : 'primaer'), falsche.length ? 'Ganzes Quiz neu' : 'Nochmal üben');
      nochmal.type = 'button';
      nochmal.addEventListener('click', neuStart);
      knoepfe.appendChild(nochmal);
      ergebnisBox.appendChild(knoepfe);

      if (modus === 'pruefung') {
        if (pct > (stand.examBest || 0)) { stand.examBest = pct; speichereStand(stand); }
      } else if (modus === 'modul') {
        stand.quiz[modId] = stand.quiz[modId] || {};
        stand.quiz[modId].last = pct;
        if (pct > (stand.quiz[modId].best || 0)) stand.quiz[modId].best = pct;
        speichereStand(stand);
      }
      zeichneKopf();
      zeichneSeitenleiste(herkunft === 'pruefung' ? 'pruefung' : (herkunft === 'fehler' ? 'fehler' : modId));
    }
  }

  // ---------- Karteikarten ----------
  function zeichneKarten(m, wrap) {
    var karten = KARTEN[m.id] || [];
    wrap.innerHTML = '';
    if (!karten.length) { wrap.appendChild(el('p', 'leer', 'Für dieses Modul gibt es noch keine Karteikarten.')); return; }

    var st = stand.karten[m.id] = stand.karten[m.id] || {};
    // Migration: altes Format { gewusst: [...] } -> Stufen (gewusst = gemeistert)
    if (!st.stufe) {
      st.stufe = {};
      if (st.gewusst && st.gewusst.length) st.gewusst.forEach(function (i) { st.stufe[i] = 2; });
      speichereStand(stand);
    }
    var stufe = st.stufe;
    function lvl(i) { return stufe[i] || 0; }
    function gemeistert() { var n = 0; karten.forEach(function (k, i) { if (lvl(i) === 2) n++; }); return n; }

    // Stapel dieser Runde: alle Karten mit Stufe < 2, „schwer" zuerst
    var schwer = [], ok = [];
    karten.forEach(function (k, i) { if (lvl(i) === 0) schwer.push(i); else if (lvl(i) === 1) ok.push(i); });
    var stapel = mische(schwer).concat(mische(ok));
    var pos = 0;

    var status = el('p', 'karten-status');
    wrap.appendChild(status);

    var buehne = el('div', 'karten-buehne');
    wrap.appendChild(buehne);

    var aktionen = el('div', 'karten-aktionen');
    wrap.appendChild(aktionen);

    var resetWrap = el('div', 'karten-reset');
    var reset = el('button', 'knopf leise', 'Alle Karten zurücksetzen (' + gemeistert() + ' gemeistert)');
    reset.type = 'button';
    reset.addEventListener('click', function () {
      st.stufe = {};
      speichereStand(stand);
      zeigeModul(m.id, 'karten');
    });
    resetWrap.appendChild(reset);
    wrap.appendChild(resetWrap);

    function bewerte(idx, level, nochmal) {
      stufe[idx] = level;
      speichereStand(stand);
      if (nochmal) stapel.push(idx); // „schwer": kommt in dieser Runde nochmal
      pos++;
      zeigeKarte();
    }

    function zeigeKarte() {
      status.innerHTML = 'Gemeistert: <strong>' + gemeistert() + ' / ' + karten.length + '</strong>' +
        (pos < stapel.length ? ' · Noch in dieser Runde: ' + (stapel.length - pos) : '');
      aktionen.innerHTML = '';
      buehne.innerHTML = '';

      if (pos >= stapel.length) {
        var fertigAlle = gemeistert() >= karten.length;
        buehne.appendChild(el('div', 'karte-fertig',
          '<h3>' + (fertigAlle ? 'Alle Karten gemeistert – stark!' : 'Runde geschafft!') + '</h3>' +
          '<p>' + (fertigAlle ? 'Du kannst den Stapel zurücksetzen und erneut üben.' : 'Karten, die du mit „Ok" oder „Schwer" bewertet hast, kommen in der nächsten Runde wieder.') + '</p>'));
        var weiter = el('button', 'knopf primaer', fertigAlle ? 'Von vorn üben' : 'Nächste Runde');
        weiter.type = 'button';
        weiter.addEventListener('click', function () {
          if (fertigAlle) { st.stufe = {}; speichereStand(stand); }
          zeigeModul(m.id, 'karten');
        });
        aktionen.appendChild(weiter);
        return;
      }

      var idx = stapel[pos];
      var k = karten[idx];
      var karte = el('button', 'lernkarte');
      karte.type = 'button';
      karte.innerHTML = '<span class="lk-seite lk-vorn"><em>Frage</em><span>' + k.v + '</span><small>Zum Umdrehen tippen</small></span>' +
        '<span class="lk-seite lk-hinten"><em>Antwort</em><span>' + k.h + '</span></span>';
      karte.addEventListener('click', function () {
        karte.classList.toggle('gedreht');
        zeigeBewertung(karte.classList.contains('gedreht'));
      });
      buehne.appendChild(karte);
      zeigeBewertung(false);

      function zeigeBewertung(anzeigen) {
        aktionen.innerHTML = '';
        if (!anzeigen) {
          aktionen.appendChild(el('p', 'karten-hinweis', 'Erst überlegen – dann umdrehen und ehrlich bewerten.'));
          return;
        }
        var bSchwer = el('button', 'knopf sekundaer bw-schwer', 'Schwer');
        bSchwer.type = 'button';
        bSchwer.addEventListener('click', function () { bewerte(idx, 0, true); });
        var bOk = el('button', 'knopf sekundaer', 'Ok');
        bOk.type = 'button';
        bOk.addEventListener('click', function () { bewerte(idx, 1, false); });
        var bLeicht = el('button', 'knopf primaer', 'Leicht ✓');
        bLeicht.type = 'button';
        bLeicht.addEventListener('click', function () { bewerte(idx, 2, false); });
        aktionen.appendChild(bSchwer);
        aktionen.appendChild(bOk);
        aktionen.appendChild(bLeicht);
      }
    }
    zeigeKarte();
  }

  // ---------- Abschlussprüfung ----------
  var EXAM_ANZAHL = 30;   // Fragen pro Prüfung (mehr als die früheren 20)
  var EXAM_SCHWER = 12;   // davon garantiert schwere Fragen (Rest: gemischt/leichter)

  function alleFragen() {
    var alle = [];
    Object.keys(QUIZ).forEach(function (mid) {
      QUIZ[mid].forEach(function (q) { alle.push(q); });
    });
    return alle;
  }

  // Stellt die Prüfung zusammen: feste Mischung aus schweren (d:3) und
  // leichteren Fragen. Bevorzugt dabei Fragen, die zuletzt NICHT dran
  // waren – so erneuert sich die Prüfung stark, statt sich zu wiederholen.
  function baueExam() {
    var alle = alleFragen();
    var schwer = alle.filter(function (q) { return q.d === 3; });
    var rest = alle.filter(function (q) { return q.d !== 3; });

    var gesehen = stand.examGesehen || [];
    var gesehenSet = {};
    gesehen.forEach(function (k) { gesehenSet[k] = true; });

    // aus einer Liste n Fragen ziehen – zuletzt gezeigte kommen zuletzt
    function ziehe(liste, n, schon) {
      var frisch = mische(liste.filter(function (q) { return !gesehenSet[q.f] && !schon[q.f]; }));
      var alt = mische(liste.filter(function (q) { return gesehenSet[q.f] && !schon[q.f]; }));
      return frisch.concat(alt).slice(0, n);
    }

    var schon = {};
    var auswahl = [];
    function nimm(liste, n) {
      ziehe(liste, n, schon).forEach(function (q) { schon[q.f] = true; auswahl.push(q); });
    }

    // Nur so viele schwere Fragen, wie es noch FRISCHE (zuletzt nicht gezeigte)
    // gibt – sind keine frischen schweren mehr da, füllen frische Standard-/
    // Szenariofragen die Plätze, statt schwere zu wiederholen. So bleibt die
    // Prüfung frisch, bis der ganze Pool durchlaufen ist.
    var schwerFrisch = schwer.filter(function (q) { return !gesehenSet[q.f]; }).length;
    nimm(schwer, Math.min(EXAM_SCHWER, schwerFrisch));
    nimm(rest, EXAM_ANZAHL - auswahl.length);
    if (auswahl.length < EXAM_ANZAHL) nimm(alle, EXAM_ANZAHL - auswahl.length); // Auffüllen (notfalls auch Wiederholungen)

    // Historie fortschreiben: gewählte Fragen als „zuletzt gesehen" merken,
    // aber immer genug übrig lassen, damit weiter rotiert werden kann.
    var maxHist = Math.max(0, alle.length - EXAM_ANZAHL);
    var neu = gesehen.slice();
    auswahl.forEach(function (q) {
      var i = neu.indexOf(q.f);
      if (i >= 0) neu.splice(i, 1);
      neu.push(q.f);
    });
    if (neu.length > maxHist) neu = neu.slice(neu.length - maxHist);
    stand.examGesehen = neu;
    speichereStand(stand);

    return mische(auswahl);
  }

  // ---------- Freitext-Teil: Pool, Rotation, KI-Bewertung ----------
  var FT = window.QUIZ_FREITEXT || [];
  var FT_KRIT = window.QUIZ_FREITEXT_KRITERIEN || ['Fachliche Richtigkeit', 'Vollständigkeit', 'Praxisbezug', 'Argumentationsqualität', 'Bezug zum Schulhund-Einsatz'];
  var FT_ANZAHL = 5;          // verpflichtende Freitextfragen pro Prüfung
  var FT_MAX = 10;            // Punkte je Freitextfrage
  var MC_GEWICHT = 0.7;       // Anteil Multiple-Choice an der Gesamtnote
  var FT_GEWICHT = 0.3;       // Anteil Freitext an der Gesamtnote
  var CLAUDE_KEY = 'shb-claude-key';
  var CLAUDE_MODELL = 'claude-opus-4-8';

  function holeKey() { try { return localStorage.getItem(CLAUDE_KEY) || ''; } catch (e) { return ''; } }
  function setzeKey(k) { try { if (k) localStorage.setItem(CLAUDE_KEY, k); else localStorage.removeItem(CLAUDE_KEY); } catch (e) {} }

  // 5 Freitextfragen mit Rotation wählen (zuletzt gezeigte zuletzt)
  function baueFreitext() {
    if (!FT.length) return [];
    var gesehen = stand.ftGesehen || [];
    var gs = {}; gesehen.forEach(function (k) { gs[k] = true; });
    var frisch = mische(FT.filter(function (q) { return !gs[q.id]; }));
    var alt = mische(FT.filter(function (q) { return gs[q.id]; }));
    var auswahl = frisch.concat(alt).slice(0, Math.min(FT_ANZAHL, FT.length));

    var maxHist = Math.max(0, FT.length - auswahl.length);
    var neu = gesehen.slice();
    auswahl.forEach(function (q) {
      var i = neu.indexOf(q.id);
      if (i >= 0) neu.splice(i, 1);
      neu.push(q.id);
    });
    if (neu.length > maxHist) neu = neu.slice(neu.length - maxHist);
    stand.ftGesehen = neu;
    speichereStand(stand);
    return mische(auswahl);
  }

  // Ruft Claude zur Bewertung einer Freitextantwort auf. Gibt ein
  // strukturiertes Ergebnis zurück oder wirft einen Fehler (mit dt. Meldung).
  function bewerteMitKI(frage, antwort) {
    var key = holeKey();
    if (!key) return Promise.reject(new Error('kein-key'));

    var schema = {
      type: 'object', additionalProperties: false,
      properties: {
        punkte: { type: 'integer' },
        kriterien: {
          type: 'array',
          items: {
            type: 'object', additionalProperties: false,
            properties: {
              name: { type: 'string' },
              erfuellung: { type: 'string', enum: ['voll', 'teilweise', 'nicht'] },
              kommentar: { type: 'string' }
            },
            required: ['name', 'erfuellung', 'kommentar']
          }
        },
        staerken: { type: 'array', items: { type: 'string' } },
        verbesserungen: { type: 'array', items: { type: 'string' } },
        begruendung: { type: 'string' }
      },
      required: ['punkte', 'kriterien', 'staerken', 'verbesserungen', 'begruendung']
    };

    var sys = 'Du bist eine erfahrene, faire Prüferin für die Zertifizierung von Schulhund-Teams (Schulhunde Bayern e.V.). ' +
      'Du bewertest die Freitext-Antwort einer angehenden Schulhund-Lehrkraft auf dem Niveau einer anspruchsvollen Zertifizierungsprüfung – streng, aber fair und konstruktiv. ' +
      'Bewerte ausschließlich die fachlichen Inhalte (keine Rechtschreibung/Stilnoten). Vergib 0 bis ' + FT_MAX + ' Punkte. ' +
      'Beziehe dich auf die fünf Kriterien: ' + FT_KRIT.join(', ') + '. ' +
      'Die Referenz-Musterlösung ist Maßstab, aber fachlich richtige Antworten mit anderen Worten/Beispielen sind voll zu werten. ' +
      'Sei konkret und ermutigend. Antworte auf Deutsch und fülle das vorgegebene JSON-Schema.';

    var userText = 'PRÜFUNGSFRAGE:\n' + frage.f +
      '\n\nREFERENZ-MUSTERLÖSUNG (Bewertungsmaßstab, nicht wörtlich verlangt):\n' + frage.muster +
      '\n\nANTWORT DER PRÜFLINGS:\n' + antwort +
      '\n\nBewerte die Antwort: vergib „punkte“ (0–' + FT_MAX + '), beurteile jedes der fünf Kriterien (' + FT_KRIT.join(', ') +
      ') mit erfuellung „voll“/„teilweise“/„nicht“ und einem kurzen Kommentar, nenne Stärken, konkrete Verbesserungsvorschläge und eine knappe Gesamtbegründung.';

    var body = JSON.stringify({
      model: CLAUDE_MODELL,
      max_tokens: 1500,
      system: sys,
      output_config: { format: { type: 'json_schema', schema: schema } },
      messages: [{ role: 'user', content: userText }]
    });

    function warte(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    function auswerten(data) {
      if (data.stop_reason === 'refusal') throw new Error('Die KI konnte diese Antwort nicht bewerten.');
      var txt = (data.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
      var parsed = JSON.parse(txt);
      var p = Math.max(0, Math.min(FT_MAX, Math.round(parsed.punkte)));
      return { punkte: p, max: FT_MAX, kriterien: parsed.kriterien || [], staerken: parsed.staerken || [], verbesserungen: parsed.verbesserungen || [], begruendung: parsed.begruendung || '', ki: true };
    }

    // Bei Überlastung (429/529/5xx) oder Netzwerkfehlern automatisch erneut
    // versuchen. Exponentielles Backoff mit Jitter, plus Respektierung des
    // „retry-after“-Headers (in Sekunden), den Anthropic bei 529/429 mitschickt.
    var MAX_VERSUCHE = 5;

    // Wartezeit für den nächsten Versuch. nr = bereits gescheiterte Versuche
    // (1 = erster Retry). Ohne Header: 1,5 s · 3 s · 6 s · 12 s (max 20 s),
    // jeweils + bis zu 1 s Zufall, damit nicht alle gleichzeitig erneut anfragen.
    function backoff(nr, retryAfterSek) {
      if (retryAfterSek > 0) return Math.min(retryAfterSek * 1000, 30000);
      var basis = Math.min(1500 * Math.pow(2, nr - 1), 20000);
      return basis + Math.floor(Math.random() * 1000);
    }

    function versuch(nr) {
      return fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: body
      }).then(function (res) {
        if (res.ok) return res.json().then(auswerten);
        if (res.status === 401) throw new Error('Der API-Schlüssel wurde nicht akzeptiert. Bitte prüfe ihn in den Einstellungen.');
        var transient = res.status === 429 || res.status === 529 || res.status >= 500;
        if (transient && nr < MAX_VERSUCHE) {
          var ra = parseFloat(res.headers.get('retry-after'));
          return warte(backoff(nr, ra)).then(function () { return versuch(nr + 1); });
        }
        if (transient) throw new Error('Die KI ist gerade stark überlastet (Fehler ' + res.status + '). Bitte ein bis zwei Minuten warten und „Antwort bewerten" erneut klicken.');
        throw new Error('Die KI-Bewertung ist fehlgeschlagen (Fehler ' + res.status + ').');
      }, function () {
        // Netzwerk-/Verbindungsfehler – ebenfalls erneut versuchen.
        if (nr < MAX_VERSUCHE) return warte(backoff(nr, 0)).then(function () { return versuch(nr + 1); });
        throw new Error('Keine Verbindung zur KI möglich. Bitte Internet­verbindung prüfen und erneut versuchen.');
      });
    }

    return versuch(1);
  }

  // ---------- Abschlussprüfung (Multiple-Choice + Freitext) ----------
  function zeigePruefung() {
    var main = document.getElementById('inhalt');
    main.innerHTML = '';
    main.scrollTop = 0;

    var kopf = el('div', 'modul-kopf');
    kopf.setAttribute('data-screen-label', 'Abschlussprüfung');
    kopf.innerHTML = '<p class="modul-tag">Zertifizierungs-Simulation</p><h1>Abschlussprüfung</h1>' +
      '<p class="hero-sub"><strong>Teil 1:</strong> ' + EXAM_ANZAHL + ' Multiple-Choice-Fragen aus allen Modulen (Mischung schwer/leicht, stark rotierend). ' +
      '<strong>Teil 2:</strong> ' + FT_ANZAHL + ' Freitextfragen mit KI-Bewertung. ' +
      'Die Gesamtnote zählt zu ' + Math.round(MC_GEWICHT * 100) + ' % aus Teil 1 und ' + Math.round(FT_GEWICHT * 100) + ' % aus Teil 2. Bestanden ab 80 %.</p>';
    main.appendChild(kopf);

    var mcFragen = baueExam();
    var ftFragen = baueFreitext();

    // Zustand
    var mcGesamt = mcFragen.length;
    var mcRichtig = 0, mcBeantwortet = 0;
    var ftErgebnis = {};   // index -> { punkte, max } | undefined

    // ===== Teil 1: Multiple Choice =====
    var t1 = el('div', 'pruef-teil');
    t1.innerHTML = '<h2><span class="teil-nr">1</span> Wissens-Check</h2>' +
      '<p>' + mcGesamt + ' Fragen · Antwort anklicken, du bekommst sofort Rückmeldung. Falsche Antworten sammeln sich unter „Meine Fehler“.</p>';
    main.appendChild(t1);

    var mcListe = el('div', 'quiz-liste');
    main.appendChild(mcListe);

    mcFragen.forEach(function (q, qi) {
      var fk = el('div', 'frage-karte');
      fk.innerHTML = '<p class="frage-nr">Frage ' + (qi + 1) + ' / ' + mcGesamt + '</p><h3>' + q.f + '</h3>';
      var optWrap = el('div', 'optionen');
      var reihenfolge = mische(q.a.map(function (txt, i) { return { txt: txt, i: i }; }));
      var gesperrt = false;
      reihenfolge.forEach(function (o) {
        var ob = el('button', 'option', o.txt);
        ob.type = 'button';
        ob.addEventListener('click', function () {
          if (gesperrt) return;
          gesperrt = true;
          mcBeantwortet++;
          var korrekt = o.i === q.k;
          if (korrekt) {
            mcRichtig++;
          } else {
            stand.fehler[q.f] = { f: q.f, a: q.a, k: q.k, e: q.e };
            speichereStand(stand);
          }
          Array.prototype.forEach.call(optWrap.children, function (kind, ki) {
            kind.disabled = true;
            if (reihenfolge[ki].i === q.k) kind.classList.add('korrekt');
          });
          if (!korrekt) ob.classList.add('falsch');
          fk.appendChild(el('div', 'erklaerung ' + (korrekt ? 'gut' : 'schlecht'),
            '<strong>' + (korrekt ? 'Richtig!' : 'Leider nicht.') + '</strong> ' + q.e));
          aktualisiereStatus();
        });
        optWrap.appendChild(ob);
      });
      fk.appendChild(optWrap);
      mcListe.appendChild(fk);
    });

    // ===== Teil 2: Freitext =====
    if (ftFragen.length) {
      var t2 = el('div', 'pruef-teil');
      t2.innerHTML = '<h2><span class="teil-nr">2</span> Freitext &amp; Transfer</h2>' +
        '<p>' + ftFragen.length + ' anspruchsvolle Fragen. Schreibe deine Antwort und lass sie bewerten – du bekommst Punkte, eine Bewertung nach fünf Kriterien, eine Musterlösung und konkrete Verbesserungsvorschläge.</p>';
      main.appendChild(t2);

      // KI-Schlüssel-Panel
      var kiPanel = el('div', 'ki-panel');
      main.appendChild(kiPanel);
      zeichneKiPanel(kiPanel);

      ftFragen.forEach(function (frage, fi) {
        var karte = el('div', 'ft-karte');
        karte.innerHTML = '<div class="ft-kopf"><span class="ft-nr">Freitextfrage ' + (fi + 1) + ' / ' + ftFragen.length + '</span>' +
          '<span class="ft-modul">' + frage.modul + '</span></div><h3>' + frage.f + '</h3>';
        var ta = el('textarea');
        ta.setAttribute('placeholder', 'Deine Antwort …');
        ta.setAttribute('aria-label', 'Antwort auf Freitextfrage ' + (fi + 1));
        karte.appendChild(ta);
        var aktion = el('div', 'ft-aktion');
        var btn = el('button', 'knopf primaer', 'Antwort bewerten');
        btn.type = 'button';
        aktion.appendChild(btn);
        karte.appendChild(aktion);
        var fb = el('div', 'ft-feedback');
        fb.style.display = 'none';
        karte.appendChild(fb);
        main.appendChild(karte);

        btn.addEventListener('click', function () {
          var antwort = ta.value.trim();
          if (antwort.length < 10) { ta.focus(); ta.style.borderColor = 'var(--rot)'; return; }
          ta.style.borderColor = '';
          if (holeKey()) {
            aktion.innerHTML = '<span class="ft-laeuft"><span class="spin"></span> KI bewertet deine Antwort …</span>';
            bewerteMitKI(frage, antwort).then(function (erg) {
              ftErgebnis[fi] = { punkte: erg.punkte, max: erg.max };
              zeigeKiFeedback(fb, frage, erg);
              aktion.innerHTML = '';
              ta.setAttribute('readonly', 'readonly');
              aktualisiereStatus();
            }).catch(function (err) {
              var msg = err && err.message === 'kein-key' ? 'Kein API-Schlüssel hinterlegt.' : (err && err.message) || 'Bewertung fehlgeschlagen.';
              aktion.innerHTML = '';
              btn.textContent = 'Erneut mit KI bewerten';
              aktion.appendChild(btn);   // erneuter KI-Versuch bleibt möglich (z. B. nach Überlastung)
              zeigeSelbstbewertung(fb, frage, fi, ftErgebnis, aktualisiereStatus, msg);
            });
          } else {
            ta.setAttribute('readonly', 'readonly');
            btn.style.display = 'none';
            zeigeSelbstbewertung(fb, frage, fi, ftErgebnis, aktualisiereStatus, null);
          }
        });
      });
    }

    // ===== Abschluss / Auswertung =====
    var statusZeile = el('p', 'pruef-status');
    var abschluss = el('div', 'pruef-abschluss');
    var auswertenBtn = el('button', 'knopf primaer', 'Prüfung auswerten');
    auswertenBtn.type = 'button';
    abschluss.appendChild(auswertenBtn);
    main.appendChild(abschluss);
    main.appendChild(statusZeile);
    var ergebnisBox = el('div');
    main.appendChild(ergebnisBox);

    function offeneFreitexte() {
      var n = 0;
      for (var i = 0; i < ftFragen.length; i++) if (!ftErgebnis[i]) n++;
      return n;
    }
    function aktualisiereStatus() {
      var mcOffen = mcGesamt - mcBeantwortet;
      var ftOffen = offeneFreitexte();
      var teile = [];
      if (mcOffen > 0) teile.push(mcOffen + ' MC-Frage' + (mcOffen === 1 ? '' : 'n'));
      if (ftOffen > 0) teile.push(ftOffen + ' Freitextfrage' + (ftOffen === 1 ? '' : 'n'));
      statusZeile.textContent = teile.length ? 'Noch offen: ' + teile.join(' · ') : 'Alles beantwortet – du kannst die Prüfung auswerten.';
    }
    aktualisiereStatus();

    auswertenBtn.addEventListener('click', function () {
      var mcOffen = mcGesamt - mcBeantwortet;
      var ftOffen = offeneFreitexte();
      if (mcOffen > 0 || ftOffen > 0) {
        statusZeile.textContent = 'Bitte erst alles beantworten – noch offen: ' +
          (mcOffen > 0 ? mcOffen + ' MC' : '') + (mcOffen > 0 && ftOffen > 0 ? ', ' : '') + (ftOffen > 0 ? ftOffen + ' Freitext' : '') + '.';
        statusZeile.style.color = 'var(--rot)';
        return;
      }
      statusZeile.style.color = '';
      zeigeGesamtergebnis(ergebnisBox, mcRichtig, mcGesamt, ftErgebnis, ftFragen.length);
      auswertenBtn.disabled = true;
      ergebnisBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function zeichneKiPanel(panel) {
    panel.innerHTML = '';
    if (holeKey()) {
      panel.appendChild(el('span', 'ki-stat an', '✓ KI-Bewertung aktiv (Claude)'));
      var aendern = el('button', 'knopf sekundaer', 'Schlüssel ändern');
      aendern.type = 'button';
      var entfernen = el('button', 'knopf leise', 'Entfernen');
      entfernen.type = 'button';
      aendern.addEventListener('click', function () { setzeKey(''); zeichneKiPanel(panel); panel.querySelector('input') && panel.querySelector('input').focus(); });
      entfernen.addEventListener('click', function () { setzeKey(''); zeichneKiPanel(panel); });
      panel.appendChild(aendern);
      panel.appendChild(entfernen);
    } else {
      panel.appendChild(el('span', 'ki-stat aus', '○ KI-Bewertung nicht eingerichtet'));
      var inp = el('input');
      inp.type = 'password';
      inp.placeholder = 'Anthropic API-Schlüssel (sk-ant-…)';
      inp.autocomplete = 'off';
      panel.appendChild(inp);
      var speichern = el('button', 'knopf primaer', 'Speichern');
      speichern.type = 'button';
      speichern.addEventListener('click', function () {
        var v = inp.value.trim();
        if (v) { setzeKey(v); zeichneKiPanel(panel); }
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') speichern.click(); });
      panel.appendChild(speichern);
      panel.appendChild(el('p', 'ki-hint', 'Ohne Schlüssel bekommst du nach dem Antworten die Musterlösung zum Selbst&shy;einschätzen. Der Schlüssel wird nur lokal in diesem Browser gespeichert und nur zur Bewertung an Anthropic gesendet.'));
    }
  }

  function punkteKlasse(p, max) {
    var q = p / max;
    if (q >= 0.8) return 'gut';
    if (q >= 0.5) return 'mittel';
    return 'schwach';
  }

  function zeigeKiFeedback(fb, frage, erg) {
    fb.style.display = '';
    fb.innerHTML = '';
    fb.appendChild(el('div', 'ft-punkte ' + punkteKlasse(erg.punkte, erg.max), '<b>' + erg.punkte + '</b> / ' + erg.max + ' Punkte'));

    if (erg.kriterien && erg.kriterien.length) {
      fb.appendChild(el('h4', null, 'Bewertung nach Kriterien'));
      var ul = el('ul', 'ft-krit');
      erg.kriterien.forEach(function (k) {
        var cls = k.erfuellung === 'voll' ? 'k-voll' : (k.erfuellung === 'teilweise' ? 'k-teil' : 'k-nicht');
        var ic = k.erfuellung === 'voll' ? '✓' : (k.erfuellung === 'teilweise' ? '~' : '✕');
        ul.appendChild(el('li', null, '<span class="k-ic ' + cls + '">' + ic + '</span><span><span class="k-name">' + k.name + ':</span> ' + k.kommentar + '</span>'));
      });
      fb.appendChild(ul);
    }
    if (erg.begruendung) { fb.appendChild(el('h4', null, 'Begründung')); fb.appendChild(el('p', null, erg.begruendung)); }
    if (erg.verbesserungen && erg.verbesserungen.length) {
      fb.appendChild(el('h4', null, 'Verbesserungsvorschläge'));
      var tl = el('ul', 'ft-tipps');
      erg.verbesserungen.forEach(function (v) { tl.appendChild(el('li', null, v)); });
      fb.appendChild(tl);
    }
    var muster = el('details', 'ft-muster');
    muster.innerHTML = '<summary>Musterlösung anzeigen</summary><p>' + frage.muster + '</p>';
    fb.appendChild(muster);
  }

  function zeigeSelbstbewertung(fb, frage, fi, ftErgebnis, onFertig, hinweis) {
    fb.style.display = '';
    fb.innerHTML = '';
    if (hinweis) fb.appendChild(el('p', 'ft-fehler', hinweis + ' – bitte schätze dich anhand der Musterlösung selbst ein.'));
    var muster = el('details', 'ft-muster');
    muster.open = true;
    muster.innerHTML = '<summary>Musterlösung &amp; Bewertungskriterien</summary><p>' + frage.muster + '</p>';
    var kl = el('p', null, '<strong>Kriterien:</strong> ' + FT_KRIT.join(' · '));
    muster.appendChild(kl);
    fb.appendChild(muster);

    var box = el('div', 'ft-selbst');
    box.appendChild(el('label', null, 'Deine Selbsteinschätzung:'));
    var sel = el('select');
    for (var p = 0; p <= FT_MAX; p++) { var o = el('option', null, p + ' / ' + FT_MAX); o.value = String(p); sel.appendChild(o); }
    sel.value = String(Math.round(FT_MAX * 0.6));
    box.appendChild(sel);
    var ok = el('button', 'knopf sekundaer', 'Übernehmen');
    ok.type = 'button';
    ok.addEventListener('click', function () {
      ftErgebnis[fi] = { punkte: parseInt(sel.value, 10), max: FT_MAX, selbst: true };
      box.innerHTML = '<span class="ft-punkte ' + punkteKlasse(ftErgebnis[fi].punkte, FT_MAX) + '"><b>' + ftErgebnis[fi].punkte + '</b> / ' + FT_MAX + ' Punkte (selbst eingeschätzt)</span>';
      onFertig();
    });
    box.appendChild(ok);
    fb.appendChild(box);
    onFertig();
  }

  function zeigeGesamtergebnis(box, mcRichtig, mcGesamt, ftErgebnis, ftAnzahl) {
    var mcPct = mcGesamt ? (mcRichtig / mcGesamt) * 100 : 0;
    var ftPunkte = 0, ftMax = 0, ftSelbst = false;
    for (var i = 0; i < ftAnzahl; i++) {
      if (ftErgebnis[i]) { ftPunkte += ftErgebnis[i].punkte; ftMax += ftErgebnis[i].max; if (ftErgebnis[i].selbst) ftSelbst = true; }
    }
    var ftPct = ftMax ? (ftPunkte / ftMax) * 100 : 0;
    var gesamt = ftAnzahl ? Math.round(MC_GEWICHT * mcPct + FT_GEWICHT * ftPct) : Math.round(mcPct);

    var note;
    if (gesamt >= 92) note = 'Hervorragend – sicher auf Zertifizierungs-Niveau!';
    else if (gesamt >= 80) note = 'Bestanden – das sitzt fachlich.';
    else if (gesamt >= 60) note = 'Knapp – sieh dir die schwächeren Punkte gezielt an.';
    else note = 'Noch nicht bestanden – arbeite die Module und „Meine Fehler“ nochmal durch.';

    box.innerHTML = '';
    var karte = el('div', 'gesamt-karte' + (gesamt >= 80 ? ' bestanden' : ''));
    karte.innerHTML =
      '<div class="gesamt-kopf"><div class="ring" style="--p:' + gesamt + '"><span>' + gesamt + '%</span></div>' +
      '<div><h3>Gesamtergebnis: ' + gesamt + ' %</h3><p>' + note + '</p></div></div>' +
      '<div class="gesamt-teile">' +
        '<div class="gesamt-teil"><div class="gt-label">Teil 1 · Multiple Choice (' + Math.round(MC_GEWICHT * 100) + ' %)</div>' +
          '<div class="gt-wert">' + Math.round(mcPct) + ' %</div><div class="gt-detail">' + mcRichtig + ' von ' + mcGesamt + ' richtig</div></div>' +
        (ftAnzahl ? '<div class="gesamt-teil"><div class="gt-label">Teil 2 · Freitext (' + Math.round(FT_GEWICHT * 100) + ' %)</div>' +
          '<div class="gt-wert">' + Math.round(ftPct) + ' %</div><div class="gt-detail">' + ftPunkte + ' von ' + ftMax + ' Punkten' + (ftSelbst ? ' (teils selbst eingeschätzt)' : '') + '</div></div>' : '') +
      '</div>';
    box.appendChild(karte);

    var knoepfe = el('div', 'ergebnis-aktionen');
    var neu = el('button', 'knopf primaer', 'Neue Prüfung starten');
    neu.type = 'button';
    neu.addEventListener('click', zeigePruefung);
    knoepfe.appendChild(neu);
    if (Object.keys(stand.fehler || {}).length) {
      var zuFehler = el('button', 'knopf sekundaer', 'Meine Fehler üben');
      zuFehler.type = 'button';
      zuFehler.addEventListener('click', function () { location.hash = '#/fehler'; });
      knoepfe.appendChild(zuFehler);
    }
    box.appendChild(knoepfe);

    if (gesamt > (stand.examBest || 0)) { stand.examBest = gesamt; speichereStand(stand); }
    zeichneKopf();
    zeichneSeitenleiste('pruefung');
  }

  // ---------- Meine Fehler ----------
  function zeigeFehler() {
    var main = document.getElementById('inhalt');
    main.innerHTML = '';
    main.scrollTop = 0;

    var kopf = el('div', 'modul-kopf');
    kopf.setAttribute('data-screen-label', 'Meine Fehler');
    kopf.innerHTML = '<p class="modul-tag">Gesammelt aus der Abschlussprüfung</p><h1>Meine Fehler</h1>';
    main.appendChild(kopf);

    var liste = Object.keys(stand.fehler || {}).map(function (k) { return stand.fehler[k]; });
    var bereich = el('div', 'tab-inhalt');
    main.appendChild(bereich);

    if (!liste.length) {
      bereich.appendChild(el('p', 'leer',
        'Noch keine Fehler gesammelt. Alles, was du in der Abschlussprüfung falsch beantwortest, landet hier – zum gezielten Nachüben. Beantwortest du eine Frage hier richtig, verschwindet sie wieder aus der Liste.'));
      return;
    }
    zeichneQuiz(mische(liste), bereich, null, 'fehler');
  }

  // ---------- Router ----------
  function route() {
    var h = location.hash || '#/';
    var teile = h.replace(/^#\//, '').split('/');
    if (teile[0] === 'modul' && teile[1]) {
      zeichneSeitenleiste(teile[1]);
      zeigeModul(teile[1], teile[2]);
    } else if (teile[0] === 'pruefung') {
      zeichneSeitenleiste('pruefung');
      zeigePruefung();
    } else if (teile[0] === 'fehler') {
      zeichneSeitenleiste('fehler');
      zeigeFehler();
    } else {
      zeichneSeitenleiste('home');
      zeigeStart();
    }
    zeichneKopf();
    document.getElementById('seitenleiste').classList.remove('offen');
  }

  window.addEventListener('hashchange', route);
  document.getElementById('menue-knopf').addEventListener('click', function () {
    document.getElementById('seitenleiste').classList.toggle('offen');
  });

  route();
})();
