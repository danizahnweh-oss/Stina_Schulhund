// Schulhund-Lernwebsite — App-Logik
(function () {
  'use strict';

  var MODULE = window.LERN_MODULE.slice().sort(function (a, b) { return a.nr - b.nr; });
  var QUIZ = window.QUIZ || {};
  var KARTEN = window.KARTEN || {};
  var GRAFIK = window.GRAFIK || {};
  var SKEY = 'shb-lern-fortschritt-v1';

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
      b.addEventListener('click', function () { zeigeModul(id, t[0]); });
      tabs.appendChild(b);
    });
    main.appendChild(tabs);

    var bereich = el('div', 'tab-inhalt');
    main.appendChild(bereich);

    if (tab === 'lernen') zeichneLernen(m, bereich);
    else if (tab === 'quiz') zeichneQuiz(QUIZ[m.id] || [], bereich, m.id, false);
    else zeichneKarten(m, bereich);
  }

  function zeichneLernen(m, wrap) {
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
    weiterQuiz.addEventListener('click', function () { zeigeModul(m.id, 'quiz'); });
    fuss.appendChild(weiterQuiz);
    wrap.appendChild(fuss);
  }

  // ---------- Quiz ----------
  function zeichneQuiz(fragen, wrap, modId, istPruefung) {
    wrap.innerHTML = '';
    if (!fragen.length) { wrap.appendChild(el('p', 'leer', 'Für dieses Modul gibt es noch kein Quiz.')); return; }

    var info = el('div', 'quiz-info');
    var best = istPruefung ? (stand.examBest || 0) : quizBest(modId);
    info.innerHTML = '<p>' + fragen.length + ' Fragen · Antwort anklicken, du bekommst sofort Rückmeldung.' +
      (best > 0 ? ' Bisheriges Bestergebnis: <strong>' + best + ' %</strong>' : '') +
      (istPruefung ? '' : ' · Ab <strong>80 %</strong> gilt das Modul-Quiz als bestanden.') + '</p>';
    wrap.appendChild(info);

    var beantwortet = 0, richtig = 0;
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
          if (korrekt) richtig++;
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
      var nochmal = el('button', 'knopf primaer', 'Nochmal üben');
      nochmal.type = 'button';
      nochmal.addEventListener('click', function () {
        if (istPruefung) zeigePruefung();
        else zeigeModul(modId, 'quiz');
      });
      ergebnisBox.appendChild(nochmal);

      if (istPruefung) {
        if (pct > (stand.examBest || 0)) { stand.examBest = pct; speichereStand(stand); }
      } else {
        stand.quiz[modId] = stand.quiz[modId] || {};
        stand.quiz[modId].last = pct;
        if (pct > (stand.quiz[modId].best || 0)) stand.quiz[modId].best = pct;
        speichereStand(stand);
      }
      zeichneKopf();
      zeichneSeitenleiste(istPruefung ? 'pruefung' : modId);
    }
  }

  // ---------- Karteikarten ----------
  function zeichneKarten(m, wrap) {
    var karten = KARTEN[m.id] || [];
    wrap.innerHTML = '';
    if (!karten.length) { wrap.appendChild(el('p', 'leer', 'Für dieses Modul gibt es noch keine Karteikarten.')); return; }

    stand.karten[m.id] = stand.karten[m.id] || { gewusst: [] };
    var gewusst = stand.karten[m.id].gewusst;

    var offen = [];
    karten.forEach(function (k, i) { if (gewusst.indexOf(i) === -1) offen.push(i); });
    var stapel = mische(offen);
    var pos = 0;

    var status = el('p', 'karten-status');
    wrap.appendChild(status);

    var buehne = el('div', 'karten-buehne');
    wrap.appendChild(buehne);

    var aktionen = el('div', 'karten-aktionen');
    wrap.appendChild(aktionen);

    var resetWrap = el('div', 'karten-reset');
    var reset = el('button', 'knopf leise', 'Alle Karten zurücksetzen (' + gewusst.length + ' gewusst)');
    reset.type = 'button';
    reset.addEventListener('click', function () {
      stand.karten[m.id].gewusst = [];
      speichereStand(stand);
      zeigeModul(m.id, 'karten');
    });
    resetWrap.appendChild(reset);
    wrap.appendChild(resetWrap);

    function zeigeKarte() {
      status.innerHTML = 'Gewusst: <strong>' + gewusst.length + ' / ' + karten.length + '</strong>' +
        (stapel.length ? ' · Im Stapel: ' + (stapel.length - pos) : '');
      aktionen.innerHTML = '';
      buehne.innerHTML = '';

      if (pos >= stapel.length) {
        var fertigAlle = gewusst.length >= karten.length;
        buehne.appendChild(el('div', 'karte-fertig',
          '<h3>' + (fertigAlle ? 'Alle Karten gewusst – stark!' : 'Stapel durch!') + '</h3>' +
          '<p>' + (fertigAlle ? 'Du kannst den Stapel zurücksetzen und erneut üben.' : 'Die nicht gewussten Karten kommen beim nächsten Durchgang wieder.') + '</p>'));
        var weiter = el('button', 'knopf primaer', fertigAlle ? 'Von vorn üben' : 'Restliche Karten üben');
        weiter.type = 'button';
        weiter.addEventListener('click', function () {
          if (fertigAlle) { stand.karten[m.id].gewusst = []; speichereStand(stand); }
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
          aktionen.appendChild(el('p', 'karten-hinweis', 'Erst überlegen, dann umdrehen.'));
          return;
        }
        var nein = el('button', 'knopf sekundaer', 'Nochmal üben');
        nein.type = 'button';
        nein.addEventListener('click', function () { pos++; zeigeKarte(); });
        var ja = el('button', 'knopf primaer', 'Gewusst ✓');
        ja.type = 'button';
        ja.addEventListener('click', function () {
          if (gewusst.indexOf(idx) === -1) gewusst.push(idx);
          speichereStand(stand);
          pos++; zeigeKarte();
        });
        aktionen.appendChild(nein);
        aktionen.appendChild(ja);
      }
    }
    zeigeKarte();
  }

  // ---------- Abschlussprüfung ----------
  function zeigePruefung() {
    var main = document.getElementById('inhalt');
    main.innerHTML = '';
    main.scrollTop = 0;

    var kopf = el('div', 'modul-kopf');
    kopf.setAttribute('data-screen-label', 'Abschlussprüfung');
    kopf.innerHTML = '<p class="modul-tag">Prüfungssimulation</p><h1>Abschlussprüfung</h1>' +
      '<p class="hero-sub">20 zufällige Fragen aus allen 14 Modulen – jedes Mal neu gemischt.</p>';
    main.appendChild(kopf);

    var alle = [];
    Object.keys(QUIZ).forEach(function (mid) {
      QUIZ[mid].forEach(function (q) { alle.push(q); });
    });
    var auswahl = mische(alle).slice(0, 20);

    var bereich = el('div', 'tab-inhalt');
    main.appendChild(bereich);
    zeichneQuiz(auswahl, bereich, null, true);
  }

  // ---------- Router ----------
  function route() {
    var h = location.hash || '#/';
    var teile = h.replace(/^#\//, '').split('/');
    if (teile[0] === 'modul' && teile[1]) {
      zeichneSeitenleiste(teile[1]);
      zeigeModul(teile[1]);
    } else if (teile[0] === 'pruefung') {
      zeichneSeitenleiste('pruefung');
      zeigePruefung();
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
