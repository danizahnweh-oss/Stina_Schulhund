// Visuelle "Auf einen Blick"-Grafiken pro Modul (reine CSS/HTML-Infografiken)
window.GRAFIK = {

grundlagen:
  '<div class="g-titel">Heimtiere in Deutschland 2024</div>' +
  '<div class="balken-chart">' +
    '<div class="balken-zeile"><span class="bl-name">Katzen</span><div class="bl-spur"><div class="bl-fuell" style="width:100%;--c:var(--g-sand)"><b>15,9 Mio.</b></div></div><span class="bl-pct">25%</span></div>' +
    '<div class="balken-zeile hervor"><span class="bl-name">Hunde</span><div class="bl-spur"><div class="bl-fuell" style="width:66%;--c:var(--mod)"><b>10,5 Mio.</b></div></div><span class="bl-pct">21%</span></div>' +
    '<div class="balken-zeile"><span class="bl-name">Kleintiere</span><div class="bl-spur"><div class="bl-fuell" style="width:27%;--c:var(--g-sand)"><b>4,3 Mio.</b></div></div><span class="bl-pct">5%</span></div>' +
    '<div class="balken-zeile"><span class="bl-name">Ziervögel</span><div class="bl-spur"><div class="bl-fuell" style="width:20%;--c:var(--g-sand)"><b>3,2 Mio.</b></div></div><span class="bl-pct">3%</span></div>' +
  '</div>' +
  '<div class="stat-kacheln">' +
    '<div class="stat-kachel"><b>10,5 Mio.</b><span>Hunde in Deutschland</span></div>' +
    '<div class="stat-kachel"><b>21 %</b><span>der Haushalte mit Hund</span></div>' +
    '<div class="stat-kachel"><b>68 %</b><span>der Familien mit Kindern mit Heimtier</span></div>' +
    '<div class="stat-kachel"><b>#1</b><span>Hund = erstes domestiziertes Tier</span></div>' +
  '</div>',

begriffe:
  '<div class="g-titel">Hunde im sozialen Einsatz – wer begleitet wen?</div>' +
  '<div class="vergleich">' +
    '<div class="vk hervor"><div class="vk-icon">'+ICON('schule')+'</div><h4>Schul(begleit)hund</h4><p>Lebt mit einer <b>Lehrkraft</b>, festes Mensch-Hund-Team, begleitet sie in den Unterricht.</p></div>' +
    '<div class="vk"><div class="vk-icon">'+ICON('besuch')+'</div><h4>Schulbesuchshund</h4><p>Meist <b>einmalig</b>, begleitet <b>Nichtlehrkräfte</b>, vermittelt Wissen zum Umgang mit Hunden.</p></div>' +
    '<div class="vk"><div class="vk-icon">'+ICON('herz')+'</div><h4>Besuchs-/Therapiehund</h4><p>Regelmäßig in Einrichtungen bzw. begleitet einen <b>Therapeuten</b> bei der Arbeit.</p></div>' +
    '<div class="vk"><div class="vk-icon">'+ICON('stern')+'</div><h4>Assistenzhund</h4><p>Für <b>eine bestimmte Person</b> (Blindenführ-, Diabeteswarn-, Epilepsiehund …).</p></div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:22px">Vom Arbeitskreis zum Verein</div>' +
  '<div class="mini-zeit">' +
    '<div class="mz"><span>2009</span><p>Arbeitskreis Schulhunde Bayern</p></div>' +
    '<div class="mz"><span>2017</span><p>Reaktivierung durch Nadine Kleber</p></div>' +
    '<div class="mz hervor"><span>2018</span><p>Verein „Schulhunde Bayern e.V.“</p></div>' +
  '</div>',

bindung:
  '<div class="g-titel">Der Mensch als „sicherer Hafen“ (secure base effect)</div>' +
  '<div class="hafen">' +
    '<div class="hafen-kern">'+ICON('herz')+'<b>Bezugsperson</b><span>sichere Basis</span></div>' +
    '<div class="hafen-ring"><span class="hr hr1">erkundet</span><span class="hr hr2">kommt zurück</span><span class="hr hr3">rückversichert sich</span><span class="hr hr4">entspannt</span></div>' +
  '</div>' +
  '<div class="stat-kacheln">' +
    '<div class="stat-kachel warn"><b>71 %</b><span>der Halter lesen ihren Hund nur unzureichend</span></div>' +
    '<div class="stat-kachel gut"><b>3 : 1</b><span>Verhältnis Positiv zu Negativ (Paare 5:1)</span></div>' +
    '<div class="stat-kachel"><b>≈ 15.000</b><span>Jahre Domestikation vom Wolf zum Hund</span></div>' +
  '</div>',

wirkmechanismen:
  '<div class="g-titel">Die drei Wirkungsbereiche</div>' +
  '<div class="spalten-3">' +
    '<div class="sp" style="--c:var(--g-blau)"><div class="sp-kopf">'+ICON('reden')+'<h4>Sozial</h4></div><ul><li>Kommunikation ↑</li><li>Aufmerksamkeit ↑</li><li>Aggression ↓</li><li>Vertrauen &amp; Zusammenhalt</li></ul></div>' +
    '<div class="sp" style="--c:var(--g-mauve)"><div class="sp-kopf">'+ICON('kopf')+'<h4>Psychologisch</h4></div><ul><li>Motivation &amp; Selbstwert ↑</li><li>Angst ↓, Trost</li><li>Türöffner / Eisbrecher</li><li>besseres Klassenklima</li></ul></div>' +
    '<div class="sp" style="--c:var(--g-gruen)"><div class="sp-kopf">'+ICON('herz')+'<h4>Physiologisch</h4></div><ul><li>Puls &amp; Blutdruck ↓</li><li>Muskelspannung ↓</li><li>Oxytocin ↑</li></ul></div>' +
  '</div>' +
  '<div class="bild-merksatz"><b>Oxytocin</b> – das „calm &amp; connecting system“ – wird durch <b>Berührung</b> ausgeschüttet: senkt Kortisol, Blutdruck &amp; Herzfrequenz, hebt die Schmerzgrenze und fördert Bindung.</div>',

lernverhalten:
  '<div class="g-titel">Die 4 Quadranten der operanten Konditionierung</div>' +
  '<div class="quadrant-grid">' +
    '<div class="qg-eck"></div><div class="qg-spalt">Belohnung / Verstärkung</div><div class="qg-spalt">Strafe</div>' +
    '<div class="qg-zeile">positiv<small>etwas kommt hinzu</small></div>' +
      '<div class="qg-feld gut"><b>Positive Belohnung</b><p>Angenehmes kommt hinzu</p><span class="emo">😊 Freude</span></div>' +
      '<div class="qg-feld schlecht"><b>Positive Strafe</b><p>Unangenehmes kommt hinzu</p><span class="emo">😨 Angst</span></div>' +
    '<div class="qg-zeile">negativ<small>etwas hört auf</small></div>' +
      '<div class="qg-feld gut"><b>Negative Belohnung</b><p>Unangenehmes hört auf</p><span class="emo">😮‍💨 Erleichterung</span></div>' +
      '<div class="qg-feld schlecht"><b>Negative Strafe</b><p>Angenehmes hört auf</p><span class="emo">😤 Frustration</span></div>' +
  '</div>' +
  '<div class="bild-merksatz gut">Ziel: möglichst im Bereich der <b>positiven Verstärkung</b> bleiben – hohe Belohnungsrate, kleinschrittig, mit Pausen und Spaß.</div>',

markertraining:
  '<div class="g-titel">Das Markerprinzip – alles eine Frage des Timings</div>' +
  '<div class="fluss">' +
    '<div class="fl-schritt"><div class="fl-ic">'+ICON('pfote')+'</div><b>Verhalten</b><span>Hund zeigt etwas Erwünschtes</span></div>' +
    '<div class="fl-schritt mark"><div class="fl-ic">'+ICON('klick')+'</div><b>Marker</b><span>„Klick!“ im selben Augenblick</span></div>' +
    '<div class="fl-schritt"><div class="fl-ic">'+ICON('keks')+'</div><b>Belohnung</b><span>folgt direkt danach</span></div>' +
  '</div>' +
  '<div class="bild-merksatz">Der Marker ist ein <b>Versprechen</b>: Er kündigt <b>immer</b> eine Belohnung an. Nach jedem Klick folgt eine Belohnung – auch bei „falschem“ Klick.</div>',

belohnungen:
  '<div class="g-titel">Die 8 Belohnungs-Kategorien</div>' +
  '<div class="kat-grid">' +
    '<div class="kat">'+ICON('keks')+'<b>Futter</b><span>geworfen, gestreut, Tube …</span></div>' +
    '<div class="kat">'+ICON('ball')+'<b>Objektspiel</b><span>Ball, Zergel, Frisbee</span></div>' +
    '<div class="kat">'+ICON('reden')+'<b>Spiel mit Mensch</b><span>Such-, Renn-, Zerrspiel</span></div>' +
    '<div class="kat">'+ICON('herz')+'<b>Sozialkontakt</b><span>Loben, Kraulen</span></div>' +
    '<div class="kat">'+ICON('baum')+'<b>Umwelt</b><span>Schnüffeln, Buddeln, Distanz</span></div>' +
    '<div class="kat">'+ICON('stern')+'<b>Gern gezeigte Signale</b><span>Tricks, Handtouch</span></div>' +
    '<div class="kat">'+ICON('lupe')+'<b>Suchaufgaben</b><span>Dummy, Fährte</span></div>' +
    '<div class="kat">'+ICON('pfote')+'<b>Jagdlicher Kontext</b><span>Vorstehen, Stöbern</span></div>' +
  '</div>' +
  '<div class="bild-merksatz">2 Regeln: Belohnungen <b>variabel</b> halten und der <b>momentanen Bedürfnislage</b> anpassen (z.&nbsp;B. ängstlicher Hund → Distanz; Hetzmotivation → Ball werfen).</div>',

signale:
  '<div class="g-titel">6 Zusatzsignale für den Schulhundalltag</div>' +
  '<div class="chip-reihe gross">' +
    '<span class="chip">Sitzdose</span><span class="chip">Rückruf</span><span class="chip">Decke / Box</span>' +
    '<span class="chip">Bleib</span><span class="chip">„Aus“</span><span class="chip">Seitenwechsel</span>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">Ablenkung steigern – aber richtig</div>' +
  '<div class="regler">' +
    '<div class="regler-spur"><div class="regler-fuell"></div><div class="regler-knopf"></div></div>' +
    '<div class="regler-text">Immer nur <b>EIN</b> Kriterium auf einmal erhöhen: entweder <b>Distanz</b> <u>oder</u> <b>Ablenkung</b> – nie beides gleichzeitig.</div>' +
  '</div>',

stress:
  '<div class="g-titel">Eustress &amp; Disstress</div>' +
  '<div class="split-2">' +
    '<div class="split gut"><b>Eustress</b><span>positiver Stress (Freude). Aber: lang anhaltend → Erschöpfung / Burnout</span></div>' +
    '<div class="split schlecht"><b>Disstress</b><span>belastend, schwer bewältigbar → Dauerbelastung, Krankheit, Aggression</span></div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">Die 3 Phasen der Stressreaktion</div>' +
  '<div class="fluss">' +
    '<div class="fl-schritt"><b>1 · Alarm</b><span>Adrenalin, Noradrenalin, Cortisol → Kampf/Flucht</span></div>' +
    '<div class="fl-schritt"><b>2 · Widerstand</b><span>Körper sucht das Gleichgewicht</span></div>' +
    '<div class="fl-schritt schlecht"><b>3 · Erschöpfung</b><span>Dauerbelastung → gesundheitliche Folgen</span></div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">Stressgesicht – worauf achten?</div>' +
  '<div class="koerper-check">' +
    '<div class="kc"><span class="kc-t">Pupillen</span>erweitert, Weiß im Auge</div>' +
    '<div class="kc"><span class="kc-t">Ohren</span>nach hinten / oben</div>' +
    '<div class="kc"><span class="kc-t">Maul</span>Hecheln, Züngeln, Speicheln</div>' +
    '<div class="kc"><span class="kc-t">Lefzen</span>stark zurückgezogen</div>' +
    '<div class="kc"><span class="kc-t">Rute</span>kraftlos hängend</div>' +
    '<div class="kc"><span class="kc-t">Körper</span>angespannt, staksiger Gang</div>' +
  '</div>',

koerpersprache:
  '<div class="g-titel">7 Basisemotionen (Jack Panksepp)</div>' +
  '<div class="emo-chips">' +
    '<span class="ec" style="--c:#C9A227">Seeking · Vorfreude</span>' +
    '<span class="ec" style="--c:#5E7CA6">Fear · Angst</span>' +
    '<span class="ec" style="--c:#B5503C">Rage · Wut</span>' +
    '<span class="ec" style="--c:#B07AA1">Lust</span>' +
    '<span class="ec" style="--c:#6F8F5E">Care · Fürsorge</span>' +
    '<span class="ec" style="--c:#7A8590">Panic · Trauer</span>' +
    '<span class="ec" style="--c:#D98E3A">Play · Freude</span>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">Körpersprache-Steckbriefe</div>' +
  STECK('Angst', 'angst', [['Augen','weit, Pupillen geweitet'],['Ohren','nach hinten/unten'],['Körper','abgeduckt, runder Rücken'],['Rute','eingeklemmt']]) +
  STECK('Meiden – „Nein“', 'meiden', [['Kopf','weggedreht, Lippenlecken'],['Blick','abgewendet / Blinzeln'],['Schwerpunkt','geht vom Auslöser weg'],['Rute','unter der Rückenlinie']]) +
  STECK('Spiel', 'spiel', [['Bewegung','weich, fließend'],['Gesicht','Spielgesicht'],['Play Bow','Vorderkörper tief, kurvig'],['Ablauf','Pausen &amp; Rollenwechsel']]) +
  STECK('Offensiv drohend', 'droh', [['Augen','hart, fokussiert'],['Kopf','über der Rückenlinie'],['Zähne','sichtbar, Maulwinkel rund'],['Rute','hoch &amp; steif']]) +
  '<div class="g-titel" style="margin-top:20px">Die 4 F – Reaktion auf Bedrohung</div>' +
  '<div class="vier-f">' +
    '<div class="ff">Freeze<span>Einfrieren</span></div>' +
    '<div class="ff">Fiddle<span>Flirt / Kaspern</span></div>' +
    '<div class="ff">Fight<span>Angriff</span></div>' +
    '<div class="ff">Flight<span>Flucht</span></div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">Jagdverhaltenskette (7 Glieder)</div>' +
  '<div class="kette">' +
    ['Orientierung','Fokussieren','Beschleichen','Hetzen','Packen','Töten','Zerlegen'].map(function(g){return '<span class="kg">'+g+'</span>';}).join('<i class="kp">›</i>') +
  '</div>',

'verhalten-schule':
  '<div class="bild-merksatz schlecht"><b>„Nein“ ist keine Lösung.</b> Es unterdrückt Verhalten nur – wie ein zugeschweißter Topf mit kochendem Wasser: Der Druck entweicht an anderer Stelle.</div>' +
  '<div class="g-titel">4 Wege gegen unerwünschtes Verhalten</div>' +
  '<div class="wege-grid">' +
    '<div class="weg"><span class="weg-nr">1</span><b>Belohnen</b><p>erwünschtes Verhalten verstärken</p></div>' +
    '<div class="weg"><span class="weg-nr">2</span><b>Rechtzeitig</b><p>belohnen, solange es noch gut läuft</p></div>' +
    '<div class="weg"><span class="weg-nr">3</span><b>Management</b><p>Rahmenbedingungen ändern</p></div>' +
    '<div class="weg"><span class="weg-nr">4</span><b>Alternative</b><p>neues Verhalten auftrainieren</p></div>' +
  '</div>' +
  '<div class="bild-merksatz">Erst prüfen: <b>Gesundheitscheck</b> (Schmerzen?) und <b>Stresscheck</b> (Schlaf, Veränderungen, bestimmte Orte/Zeiten/Menschen?).</div>',

'regeln-interaktionen':
  '<div class="g-titel">5 unverzichtbare Grundregeln</div>' +
  '<div class="regel-grid">' +
    '<div class="rg"><span>1</span>1 Hund – 1 Kind</div>' +
    '<div class="rg"><span>2</span>Ruheplatz nie stören</div>' +
    '<div class="rg"><span>3</span>Nie umzingeln (Fluchtweg!)</div>' +
    '<div class="rg"><span>4</span>Nie über den Hund beugen</div>' +
    '<div class="rg"><span>5</span>Streichellandkarte – kein Kopf</div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">3 Interaktionsformen (Beetz)</div>' +
  '<div class="spalten-3">' +
    '<div class="sp hervor" style="--c:var(--mod)"><div class="sp-kopf"><h4>Frei</h4></div><p>Hund bewegt sich frei – <b>größter Zeitanteil!</b></p></div>' +
    '<div class="sp" style="--c:var(--g-sand)"><div class="sp-kopf"><h4>Aktiv im Unterricht</h4></div><p>würfelt Aufgaben, bringt Material</p></div>' +
    '<div class="sp" style="--c:var(--g-sand)"><div class="sp-kopf"><h4>Ohne Bezug</h4></div><p>Futtersuchspiele, Tricks</p></div>' +
  '</div>' +
  '<div class="fluss" style="margin-top:18px">' +
    '<div class="fl-schritt"><b>Planen</b></div><div class="fl-schritt"><b>Durchführen</b></div><div class="fl-schritt"><b>Auswerten</b></div>' +
  '</div>',

'recht-konzept':
  '<div class="g-titel">Die wichtigsten Kennzahlen</div>' +
  '<div class="stat-kacheln vier">' +
    '<div class="stat-kachel"><b>4×</b><span>Tierarzt-Vorsorge pro Jahr (TVT)</span></div>' +
    '<div class="stat-kachel"><b>2–3×</b><span>Einsatz pro Woche, max.</span></div>' +
    '<div class="stat-kachel"><b>3–4 h</b><span>max. pro Einsatztag</span></div>' +
    '<div class="stat-kachel"><b>&gt;18 Mon.</b><span>empfohlenes Mindestalter</span></div>' +
    '<div class="stat-kachel"><b>60 °C</b><span>Reinigung Napf &amp; Stoffzubehör</span></div>' +
    '<div class="stat-kachel"><b>3 Mon.</b><span>Tierarzt-Check fürs Logbuch</span></div>' +
  '</div>' +
  '<div class="g-titel" style="margin-top:20px">LMU-Studie 2022 – Einsätze bewertet</div>' +
  '<div class="balken-chart">' +
    '<div class="balken-zeile"><span class="bl-name">problematisch</span><div class="bl-spur"><div class="bl-fuell" style="width:100%;--c:var(--g-rost)"><b>50 %</b></div></div></div>' +
    '<div class="balken-zeile"><span class="bl-name">kritisch</span><div class="bl-spur"><div class="bl-fuell" style="width:52%;--c:var(--g-gold)"><b>25,9 %</b></div></div></div>' +
    '<div class="balken-zeile"><span class="bl-name">harmlos</span><div class="bl-spur"><div class="bl-fuell" style="width:48%;--c:var(--g-gruen)"><b>24,1 %</b></div></div></div>' +
  '</div>' +
  '<div class="bild-merksatz schlecht">Nur <b>40,7 %</b> der Teams hatten eine Ausbildung · in <b>64,8 %</b> der Klassen wurde der Hund umzingelt.</div>',

gewoehnung:
  '<div class="g-titel">Schulgewöhnung in 6 Schritten</div>' +
  '<div class="leiter">' +
    '<div class="lt"><span>1</span>Leeres Schulgebäude</div>' +
    '<div class="lt"><span>2</span>Belebteres Gebäude</div>' +
    '<div class="lt"><span>3</span>Reguläre Unterrichtszeit</div>' +
    '<div class="lt"><span>4</span>„Trubeligere“ Zeiten</div>' +
    '<div class="lt"><span>5</span>Stunde bei anderer Lehrkraft</div>' +
    '<div class="lt hervor"><span>6</span>Eigener Unterricht</div>' +
  '</div>' +
  '<div class="bild-merksatz">Immer aufhören, <b>bevor</b> der Hund Stresszeichen zeigt – sonst droht <b>Sensibilisierung</b> statt Gewöhnung.</div>' +
  '<div class="g-titel" style="margin-top:20px">Ausstattung des Schulhundklassenzimmers</div>' +
  '<div class="kat-grid klein">' +
    '<div class="kat">'+ICON('herz')+'<b>Ruhezone</b></div>' +
    '<div class="kat">'+ICON('box')+'<b>Notfall-Box</b></div>' +
    '<div class="kat">'+ICON('napf')+'<b>Wassernapf</b></div>' +
    '<div class="kat">'+ICON('box')+'<b>Hygienebox</b></div>' +
    '<div class="kat">'+ICON('kreuz')+'<b>Erste-Hilfe-Set</b></div>' +
    '<div class="kat">'+ICON('napf')+'<b>Waschbecken</b></div>' +
    '<div class="kat">'+ICON('schild')+'<b>Türschilder</b></div>' +
    '<div class="kat">'+ICON('teppich')+'<b>Arbeitsteppich</b></div>' +
  '</div>'
};

// ---- kleine Icon- und Steckbrief-Helfer ----
function ICON(n){
  var s='<svg viewBox="0 0 24 24" class="gic" aria-hidden="true">';
  var m={
    pfote:'<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6.5" r="2"/><circle cx="17" cy="8" r="2"/><ellipse cx="12" cy="15" rx="4.5" ry="4"/>',
    herz:'<path d="M12 20C5 15 3 11 3 8a4.5 4.5 0 019-1 4.5 4.5 0 019 1c0 3-2 7-9 12z"/>',
    schule:'<circle cx="8" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><rect x="5" y="15" width="14" height="4" rx="2"/>',
    besuch:'<rect x="4" y="5" width="16" height="12" rx="2"/><circle cx="12" cy="11" r="3" fill="#fff"/>',
    stern:'<path d="M12 3l2.6 5.6L20 9.3l-4 4 1 6-5-2.9L7 19.3l1-6-4-4 5.4-.7z"/>',
    reden:'<rect x="3" y="5" width="14" height="10" rx="3"/><path d="M7 15l-1 4 5-3z"/>',
    kopf:'<circle cx="12" cy="11" r="7"/><circle cx="12" cy="11" r="3" fill="#fff"/>',
    klick:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/>',
    keks:'<circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r="1.2" fill="#fff"/><circle cx="14" cy="13" r="1.2" fill="#fff"/><circle cx="12" cy="9" r="1.1" fill="#fff"/>',
    ball:'<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 10c5 2 9 2 14 0M5 14c5-2 9-2 14 0" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    baum:'<rect x="11" y="12" width="2" height="7"/><circle cx="12" cy="8" r="5"/>',
    lupe:'<circle cx="10" cy="10" r="5" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="14" y="14" width="6" height="2.4" rx="1.2" transform="rotate(45 14 14)"/>',
    box:'<rect x="4" y="7" width="16" height="12" rx="2"/><rect x="4" y="7" width="16" height="4" rx="1" fill="#fff" opacity=".5"/>',
    napf:'<path d="M4 12h16l-2 6H6z"/><ellipse cx="12" cy="12" rx="8" ry="2.4"/>',
    kreuz:'<rect x="4" y="6" width="16" height="13" rx="2"/><path d="M12 9v7M9 12.5h6" stroke="#fff" stroke-width="2"/>',
    schild:'<rect x="6" y="4" width="12" height="14" rx="2"/><path d="M9 9h6M9 12h6" stroke="#fff" stroke-width="1.6"/>',
    teppich:'<rect x="4" y="8" width="16" height="9" rx="1.5"/><rect x="6.5" y="10.5" width="11" height="4" rx="1" fill="#fff" opacity=".5"/>',
    mond:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    puls:'<path d="M3 12h4l2-6 3 12 2-6h7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>',
    hand:'<rect x="7" y="9" width="10" height="9" rx="3.5"/><rect x="8.4" y="4" width="2.2" height="7" rx="1.1"/><rect x="11.4" y="3.2" width="2.2" height="7.8" rx="1.1"/><rect x="14.2" y="5" width="2.2" height="6" rx="1.1"/>',
    tropfen:'<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>'
  };
  return s+(m[n]||'')+'</svg>';
}
function STECK(titel, mood, zeilen){
  var rows=zeilen.map(function(z){return '<div class="sb-zeile"><span class="sb-t">'+z[0]+'</span><span class="sb-w">'+z[1]+'</span></div>';}).join('');
  return '<div class="steckbrief sb-'+mood+'"><div class="sb-kopf"><span class="sb-dot"></span><h4>'+titel+'</h4></div>'+rows+'</div>';
}
