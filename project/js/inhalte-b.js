// Lernmodule Teil B (Module 5-8)
window.LERN_MODULE = window.LERN_MODULE || [];

window.LERN_MODULE.push({
  id: 'lernverhalten',
  nr: 5,
  titel: 'Lernverhalten von Hunden',
  tag: 'Onlineseminar',
  kurz: 'Klassische & operante Konditionierung, 4 Quadranten, Habituation, Premack, Matching Law',
  zusammenfassung: `
    <ul class="merkliste">
      <li><strong>Klassische Konditionierung:</strong> Ein neutraler Reiz bekommt durch Verknüpfung eine Bedeutung – automatisch, unbewusst, ohne Motivation.</li>
      <li><strong>Operante Konditionierung</strong> (Thorndike) = Lernen durch <strong>Versuch und Irrtum</strong>: Die Konsequenzen eines Verhaltens bestimmen sein zukünftiges Auftreten.</li>
      <li><strong>4 Quadranten:</strong> positive/negative Belohnung, positive/negative Strafe – Ziel: möglichst im Bereich der <strong>positiven Verstärkung</strong> bleiben.</li>
      <li><strong>Habituation (Gewöhnung)</strong> = Verlernen einer Reaktion; starke Reize führen stattdessen zur <strong>Sensibilisierung</strong>; „Flooding“ = Resignation, keine Gewöhnung!</li>
      <li><strong>Premack-Prinzip:</strong> Wahrscheinliches Verhalten belohnt unwahrscheinliches Verhalten.</li>
      <li><strong>Matching Law:</strong> Verhalten wird in den Relationen gezeigt, in denen es belohnt wurde.</li>
      <li>Trainingskriterien: <strong>Timing – Kriterium – Belohnungsrate</strong>.</li>
    </ul>`,
  details: [
    { t: 'Klassische Konditionierung', h: `
      <p>Lernen dient der besseren Anpassung eines Individuums an seine Umwelt. Lernen findet <strong>immer</strong> statt und folgt bestimmten Gesetzmäßigkeiten.</p>
      <p>Die klassische Konditionierung ist ein Lernvorgang, durch den ein <strong>neutraler Reiz eine Bedeutung bekommt</strong> (Verknüpfung oder Assoziation). Sie funktioniert, weil zwei Reize (= Sinneswahrnehmungen), die wiederholt kurz nacheinander oder überschneidend wahrgenommen werden, im Gehirn <strong>automatisch</strong> miteinander in Verbindung gebracht werden.</p>
      <p><strong>Beispiel Markerwort/Clicker:</strong> Futter = unkonditionierter Reiz, Click = neutraler Reiz → nach dem Training: Click = <strong>konditionierter Reiz</strong>.</p>
      <p>Die klassische Konditionierung ist eine der wenigen Lernformen, die <strong>ohne Motivation</strong> auskommt. Sie erfolgt automatisch und unbewusst und ist willentlich nicht zu beeinflussen. Da man nicht immer steuern kann, was der Hund womit verknüpft, kann es schnell zu <strong>unerwünschten Verknüpfungen</strong> kommen.</p>
      <div class="merke"><p><strong>Anwendung im Schulhundalltag:</strong> Schüler rennen lärmend vorbei → der Reiz kann (bevor der Hund evtl. unerwünschtes Verhalten zeigt) gleich mit etwas Angenehmem verknüpft werden (Leckerli, Distanz vergrößern ...). Die Belohnung sollte erfolgen, <strong>bevor</strong> der Hund unerwünschtes Verhalten zeigt – sonst wird versehentlich das unerwünschte Verhalten belohnt und verstärkt!</p></div>` },
    { t: 'Operante Konditionierung (Thorndike)', h: `
      <p>Die operante Konditionierung – auch <strong>instrumentelle Konditionierung</strong> – ist der wissenschaftliche Name für <strong>Lernen durch Versuch und Irrtum</strong>. Lernen durch Ausprobieren ist die wichtigste Lernform aller höheren Tiere und erklärt, wie ein Hund z.&nbsp;B. lernt, eine Tür aufzumachen, bei Tisch zu betteln oder bei Fuß zu gehen.</p>
      <div class="merke"><p><strong>Grundprinzip:</strong> Die Konsequenzen, die ein Verhalten hat, beeinflussen sein Auftauchen in der Zukunft. Funktioniert ein Verhalten, wird es häufiger gezeigt. Unmittelbare Misserfolge führen dazu, dass es seltener oder gar nicht mehr ausgeführt wird.</p></div>
      <p>Der eigentliche „Motor“ sind die <strong>Emotionen</strong>, die durch die Konsequenzen ausgelöst werden. Eine angenehme Konsequenz = „Belohnung“ oder „Verstärker“; eine unangenehme Folge = „Strafe“. Was ein Hund als Belohnung oder Strafe empfindet, ist <strong>individuell verschieden</strong> (z.&nbsp;B. Streicheln!).</p>` },
    { t: 'Die 4 Quadranten der operanten Konditionierung', h: `
      <table class="dtab quad"><thead><tr><th></th><th>Belohnung (Verstärkung)</th><th>Strafe</th></tr></thead><tbody>
        <tr><th>positiv<br>(etwas kommt hinzu)</th><td><strong>Positive Belohnung:</strong> Etwas Angenehmes kommt hinzu.<br>Emotion: <strong>Freude</strong></td><td><strong>Positive Strafe:</strong> Etwas Unangenehmes kommt hinzu.<br>Emotion: <strong>Angst</strong></td></tr>
        <tr><th>negativ<br>(etwas hört auf)</th><td><strong>Negative Belohnung:</strong> Etwas Unangenehmes hört auf.<br>Emotion: <strong>Erleichterung</strong></td><td><strong>Negative Strafe:</strong> Etwas Angenehmes hört auf.<br>Emotion: <strong>Frustration / Erfolgslosigkeit</strong></td></tr>
      </tbody></table>
      <div class="merke"><p>Selbstverständlich wollen wir so gut es geht im Bereich der <strong>positiven Verstärkung</strong> bleiben!</p></div>
      <p>Achte im Training auf eine <strong>hohe Belohnungsrate</strong> (viele Kekse für tolles Verhalten), baue das Training <strong>so kleinschrittig wie nötig</strong> auf, mache <strong>ausreichend Pausen</strong> (Überforderung vermeiden!) und habe <strong>Spaß im Training</strong> – vermeide Stress und Frust auf beiden Seiten.</p>` },
    { t: 'Lernen durch Nachahmung & Stimmungsübertragung', h: `
      <p><strong>Nachahmung:</strong> Ein Hund hat nur dann wirklich durch Nachahmung gelernt, wenn er <strong>allein aufgrund der Beobachtung</strong> eines anderen Tieres – ohne vorherige eigene Erfahrung – etwas tut, das er bisher nicht konnte und das nicht angeboren ist. Das Konzept kann Hunden beigebracht werden (z.&nbsp;B. <strong>„Do as I do“</strong>) – bedeutet jedoch erheblichen Trainingsaufwand.</p>
      <p><strong>Stimmungsübertragung</strong> („Lernen über soziale Anregung“): ähnelt der Nachahmung. Typisch für Hunde – gerade junge –, dass sie sich an anderen Hunden orientieren und ihnen nachlaufen.</p>` },
    { t: 'Habituation, Sensibilisierung & Flooding', h: `
      <p><strong>Lernen durch Habituation (= Gewöhnung)</strong> ist eine Sonderform: Es wird nicht etwas Neues gelernt, sondern etwas <strong>verlernt</strong> – die Reaktion auf einen ganz bestimmten Reiz.</p>
      <p>Gewöhnung tritt naturgemäß eher gegenüber <strong>schwachen und neutralen Reizen</strong> ein. Sehr starke, Angst auslösende oder schmerzhafte Reize führen eher zum Gegenteil: der <strong>Sensibilisierung</strong> – der Hund wird empfindlicher und reagiert immer verstörter.</p>
      <div class="merke"><p><strong>Gewöhnung erfolgt nur, wenn der Hund einem Reiz so ausgesetzt wird, dass er neutral oder minimalst darauf reagiert.</strong> Sobald der Hund mehr reagiert, findet keine Gewöhnung statt.</p></div>
      <p><strong>„Flooding“:</strong> Der Hund reagiert auf Reizüberflutung mit <strong>Resignation</strong> und einem völligen Ausgeliefertsein (kein Entkommen möglich). Auch das ist <strong>keine</strong> Gewöhnung! Im Alltag werden Hunde oft Situationen ausgesetzt, „damit sie sich daran gewöhnen“ (Menschenmengen, Märkte ...) – das passiert leider auch im Schulkontext, wenn Hunde ohne Ausbildung und Vorbereitung mit in die Schule genommen werden.</p>` },
    { t: 'Premack-Prinzip & Matching Law', h: `
      <p><strong>Premack-Prinzip:</strong> Premack wies nach, dass in einer gegebenen Situation ein mit größerer Wahrscheinlichkeit gezeigtes Verhalten als <strong>Belohnung</strong> für ein mit geringerer Wahrscheinlichkeit gezeigtes wirkt.<br><em>Beispiel:</em> Auf der Hundewiese spielt ein junger Hund wahrscheinlicher mit Artgenossen (Verhalten A), als bei Fuß zu laufen (Verhalten B). Arrangiert man es so, dass der Hund zuerst B zeigen muss, ehe er Zugang zu A bekommt, steigt mit der Zeit die Wahrscheinlichkeit, dass er B ausführt.</p>
      <p><strong>Matching Law</strong> (Gesetz der Anpassung/Übereinstimmung): Das Verhalten wird in den <strong>Relationen</strong> gezeigt, in denen es belohnt wurde.<br><em>Beispiel:</em> Springt ein Hund 5 von 10 Besuchern an und wird dabei mit Streicheln belohnt, wird er künftig <strong>jeden zweiten</strong> Menschen anspringen.</p>` },
    { t: 'Verstärker verstehen & Signalkontrolle', h: `
      <p><strong>Primäre Verstärker</strong> sind „angeborenermaßen“ toll – sie müssen nicht erlernt werden. Wichtig ist die richtige Belohnung; die Handhabung muss erlernt werden. <strong>Wir müssen unser Verhalten ändern, wenn wir das Verhalten unserer Tiere ändern wollen.</strong> Generell: Man kann den Hund mit allem belohnen, was er lieber mag als das, was er gerade tut.</p>
      <div class="merke"><p><strong>Trainingskriterien: Timing – Kriterium – Belohnungsrate</strong></p></div>
      <p><strong>Signalkontrolle:</strong> Wichtig ist das richtige Timing zwischen Signal und Verhalten. Es braucht viele Wiederholungen, bis das Signal mit einem Verhalten verknüpft ist. Achtung: Signale dürfen sich nicht <strong>überschatten</strong>; Hörzeichen verwenden, die sich <strong>nicht stark ähneln</strong>. Nach erfolgreicher Signalverknüpfung sollte eine <strong>Generalisierung</strong> erfolgen (Haltung, Gestik, Mimik, Bewegung, Ort, Gegenstände ...).</p>` }
  ]
});

window.LERN_MODULE.push({
  id: 'markertraining',
  nr: 6,
  titel: 'Markertraining',
  tag: 'Seminartag 1',
  kurz: 'Markersignal & Clicker, Konditionierung, Capturing, Signaleinführung, Blickkontakt-Übung',
  zusammenfassung: `
    <ul class="merkliste">
      <li><strong>Markern = Ankündigung einer Belohnung</strong> – nicht mehr und nicht weniger. Das Markerwort (kurz &amp; knackig: „Top“, „Klick“, „Zack“ ...) oder der Clicker kündigt <strong>IMMER</strong> eine Belohnung an – ein Versprechen an den Hund!</li>
      <li>Verhalten wird <strong>punktgenau</strong> markiert – die optimale Verknüpfung entsteht im <strong>gleichen Augenblick</strong>.</li>
      <li>Aufbau über <strong>klassische Konditionierung</strong>: Click → sofort Leckerchen, ca. 10×; Test: Hund schaut weg → Click → er dreht sich freudig um = verstanden.</li>
      <li>Nach jedem Click MUSS eine Belohnung folgen – auch bei „falschem“ Click!</li>
      <li><strong>Capturing</strong> („einfangen“): spontan angebotenes Verhalten markern, später Signal hinzufügen.</li>
      <li>Ein Signal wird <strong>erst eingeführt, wenn das Verhalten zuverlässig</strong> gezeigt wird; danach in vielen Situationen <strong>generalisieren</strong>.</li>
    </ul>`,
  details: [
    { t: 'Was ist Markertraining?', h: `
      <p><strong>Markern</strong> bedeutet im Grunde nichts anderes als die <strong>Ankündigung einer Belohnung</strong> – nicht mehr und nicht weniger.</p>
      <p>Das Markerwort (z.&nbsp;B. „Top“, „Klick“, „Zack“, „Jep“ – ein kurzes, knackiges Wort) oder der Clicker ist eine eindeutige Kommunikation, eine <strong>gemeinsame Sprache</strong> für Hund und Hundehalter und ein <strong>Versprechen an den Hund</strong>: Das Markerwort kündigt <strong>immer</strong> eine Belohnung an.</p>
      <p>Die Belohnung muss nicht immer ein Leckerli sein – auch ein Spielzeug, ein Zergel oder ein Rennspiel ist möglich: alles, was dem Hund wirklich Spaß macht.</p>
      <p>Das Markerwort sorgt für <strong>Glückshormone</strong> beim Hund, das Training macht Spaß und hilft bei Angst, Aggression und Unsicherheit. Verhalten wird <strong>punktgenau markiert</strong> und erleichtert somit das Training: Ertönt das Geräusch, weiß der Hund, dass sein Verhalten in diesem Moment lohnenswert ist und eine „handfeste Belohnung“ folgt – er wird bemüht sein, es zu wiederholen.</p>` },
    { t: 'Warum Timing alles ist', h: `
      <p>Hunde lernen am besten über <strong>Verknüpfungen</strong>: Sie zeigen ein Verhalten, und im selben Moment geschieht etwas Positives oder Negatives. Die „Antwort“ auf ihr Verhalten bewegt sie dazu, es zu wiederholen oder zu lassen.</p>
      <p><em>Beispiel:</em> Der Hund springt bei der Begrüßung Menschen an und wird daraufhin ausgiebig geschmust. Da das Lob genau im Moment des Verhaltens kommt, verknüpft er es positiv – er wird in Zukunft <strong>häufiger</strong> anspringen.</p>
      <div class="merke"><p><strong>Eine optimale Verknüpfung stellt der Hund her, wenn die Konsequenz im gleichen Augenblick geschieht!</strong> Mit dem Clicker/Markersignal können wir unmittelbar agieren und das Verhalten punktgenau bestätigen. Das entscheidende Merkmal: Es <strong>kündigt eine Belohnung an</strong> – die Belohnung selbst kommt danach.</p></div>
      <p>Wenn das Markerwort aufgebaut ist, kann man damit jedes gute, erwünschte Verhalten „einfangen“, das der Hund zufällig anbietet (Blickkontakt, lockere Leine, ruhiges Verhalten), und alles markern, was der Hund auf Signal richtig macht (Sitz, Platz ...).</p>` },
    { t: 'Konditionierung des Markerworts', h: `
      <p><strong>Aufbau</strong> (an einem ruhigen, ablenkungsarmen Ort):</p>
      <ol>
        <li>Click bzw. Markerwort → dem Hund <strong>sofort danach</strong> ein Leckerchen geben.</li>
        <li>Wenn der Hund aufgefressen hat: kurze Pause, dann nächster Click + Leckerchen.</li>
        <li>Ca. <strong>10-mal</strong> wiederholen.</li>
        <li>Dann warten, bis der Hund woanders hinschaut, und clicken: Dreht er sich in freudiger Erwartung um, hat er die Verknüpfung verstanden – der Marker ist einsatzbereit!</li>
      </ol>
      <p><strong>Zu beachten:</strong></p>
      <ul>
        <li>Positionen beim Aufbau immer mal verändern (nicht immer Hund sitzt / Mensch steht) – Hunde verknüpfen die Situation schnell mit.</li>
        <li>Das Leckerchen wird <strong>erst nach dem Click</strong> zum Hund geführt – nicht sichtbar in der Hand halten!</li>
        <li><strong>Nach jedem Click muss eine Belohnung folgen.</strong> Bleibt sie aus, ist der Click keine zuverlässige Voraussage mehr – die Zusammenarbeit lohnt sich für den Hund nicht mehr.</li>
        <li>Auch wenn man „falsch“ geclickt hat, bekommt der Hund seine Belohnung.</li>
      </ul>` },
    { t: 'Capturing & Übung Blickkontakt', h: `
      <p><strong>Capturing</strong> (englisch „einfangen“): Stelle z.&nbsp;B. einen Karton auf den Boden und motiviere deinen Hund stimmlich, eine Aktion zu zeigen – <strong>ohne ein Signal zu geben</strong>. Zeigt er ein Verhalten, das dir gefällt (Pfote drauflegen, Karton mit der Nase berühren), nutzt du den Marker. Der Hund zeigt das Verhalten von nun an öfter; nach einigen Wiederholungen kannst du der Handlung ein <strong>Signal</strong> geben.</p>
      <p><strong>Übung: Blickkontakt verstärken:</strong> Gib ein „Sitz“-Signal, halte Leckerchen in der Hand und strecke den Arm weit aus, vom Hund weg. Der Hund schaut auf die Futterhand – sie bleibt verschlossen. In dem Moment, in dem er <strong>dich</strong> ansieht: Click/Markerwort + Leckerchen. Der Blickkontakt wird verstärkt; klappt es gut, kann das Signal eingeführt werden.</p>` },
    { t: 'Spätere Signaleinführung & Generalisierung', h: `
      <div class="merke"><p>Ein Signal (Hörzeichen) wird <strong>erst eingeführt, wenn der Hund das gewünschte Verhalten schon zuverlässig zeigen kann</strong> – nur dann kann man davon ausgehen, dass er es später auch auf Signal zuverlässig zeigt.</p></div>
      <ol><li>Du sagst das neue Signal.</li><li>Der Hund führt das gewünschte Verhalten aus.</li><li>Es wird gemarkert und belohnt.</li></ol>
      <p>Ein Hund braucht <strong>ganz viele Wiederholungen</strong>. Wenn dein Hund im Wohnzimmer gut „Sitz“ kann, heißt das nicht, dass er es automatisch auch draußen kann. Das Verhalten muss in vielen Situationen und mit unterschiedlichen Ablenkungen <strong>generalisiert</strong> werden.</p>` }
  ]
});

window.LERN_MODULE.push({
  id: 'belohnungen',
  nr: 7,
  titel: 'Belohnungen',
  tag: 'Seminartag 2',
  kurz: 'Richtiges Belohnen, Belohnungsarten, Top-20-Liste',
  zusammenfassung: `
    <ul class="merkliste">
      <li>Richtiges Belohnen ist ein <strong>bedeutender Faktor für den Trainingserfolg</strong>.</li>
      <li>Regel 1: Belohnungen sollten <strong>variabel</strong> sein.</li>
      <li>Regel 2: Belohnungen sollten der <strong>momentanen Bedürfnislage</strong> des Hundes so gut es geht entsprechen (z.&nbsp;B. ängstlicher Hund → Belohnung: <strong>Distanz</strong> zum „Gruseligen“; Hetzmotivation → Ball/Felldummy).</li>
      <li>Belohnungskategorien: <strong>Futter, Objektspiel, Spiel mit dem Menschen, Sozialkontakt, Umweltbelohnungen, gern gezeigte Signale, Suchaufgaben, jagdlicher Kontext</strong>.</li>
      <li>Praxistipp: eigene <strong>Top-20-Belohnungsliste</strong> für den eigenen Hund erstellen.</li>
    </ul>`,
  details: [
    { t: 'Verhalten ändern durch richtiges Belohnen', h: `
      <p>Wenn wir Verhalten verändern wollen, ist richtiges Belohnen bzw. die passende Belohnung ein <strong>bedeutender Faktor für den Trainingserfolg</strong>.</p>
      <p><strong>Die wichtigsten Regeln:</strong></p>
      <ul><li>Belohnungen sollten <strong>variabel</strong> sein.</li><li>Belohnungen sollten der <strong>momentanen Bedürfnislage des Hundes</strong> so gut es geht entsprechen.</li></ul>
      <p><strong>Beispiele:</strong></p>
      <ul>
        <li>Ein Hund, der Angst vor einem Objekt hat und sich trotzdem ein paar Schritte hintraut → Belohnung: <strong>Distanz zum „Gruseligen“ geben</strong>.</li>
        <li>Ein Hund, der sich vom Hasen abrufen lässt → Belohnung: <strong>Hasenfelldummy</strong> geworfen bekommen oder einen Ball hetzen (der Hund war ja in Hetzmotivation!).</li>
        <li>Hund von fressbarem Unrat abrufen → Belohnung: z.&nbsp;B. <strong>Futtertube</strong>.</li>
      </ul>` },
    { t: 'Mögliche Belohnungen (Übersicht)', h: `
      <table class="dtab"><tbody>
        <tr><th>Futter</th><td>Nassfutter, Wienerle, Frikadellen, Leberwurst, Leberkäse, Leckerchen, Trockenfutter, Karottenstücke, getrocknete Lunge ... <br><em>Variationen:</em> geworfen, gestreut, gerollt, suchen, Futtertube, aus der Hand, viele kleine Stücke nacheinander, Futterdummy</td></tr>
        <tr><th>Objektspiel</th><td>Ball, Zergel, Plüschspielzeug, Quietschspielzeug, Frisbee ... <br><em>Variationen:</em> Zerrspiele, Wurfspiele, Versteckspiele, Suchspiele, Spielzeug an der Schnur, Lauerspiel, etwas rupfen/zerreißen</td></tr>
        <tr><th>Spiel mit dem Menschen</th><td>Suchspiele, Rennspiele, Zerrspiele</td></tr>
        <tr><th>Sozialkontakt</th><td>Loben, Kraulen, Streicheln</td></tr>
        <tr><th>Umweltbelohnungen</th><td>zu Hundefreunden hinrennen, Baden/Trinken, Buddeln, Wälzen, hinschicken wo der Hund hinmöchte, Dinge beobachten, Spuren ausarbeiten, Ableinen, Schnüffeln, Distanz geben</td></tr>
        <tr><th>Gern gezeigte Signale</th><td>Tricks, Handtouch, Wälzen, Strecken (entspannt)</td></tr>
        <tr><th>Suchaufgaben</th><td>Dummysuche, Frei-/Verlorensuche, Suche auf der Rückspur, Gegenwindsuche, Fährten/Schleppen</td></tr>
        <tr><th>Jagdlicher Kontext</th><td>Vorstehen, Nachziehen oder Beschleichen, Belauern, Spuren mit dem Menschen ausarbeiten, kontrolliertes Stöbern</td></tr>
      </tbody></table>
      <div class="merke"><p><strong>Praxis-Aufgabe aus dem Skript:</strong> Erstelle eine <strong>Top-20-Belohnungsliste</strong> für deinen eigenen Hund!</p></div>` }
  ]
});

window.LERN_MODULE.push({
  id: 'signale',
  nr: 8,
  titel: 'Signale für den Schulhundalltag',
  tag: 'Seminartag 2',
  kurz: 'Sitzdose, Rückruf, Decke/Box, Bleib, Aus, Seitenwechsel – Aufbau & Generalisierung',
  zusammenfassung: `
    <ul class="merkliste">
      <li>Ergänzend zum Grundgehorsam werden <strong>zusätzliche Signale</strong> aufgebaut: <strong>Sitzdose, Rückruf, Box-/Deckentraining, Bleib unter Ablenkung, „Aus“, Seitenwechsel</strong>.</li>
      <li>Alle Signale zuerst <strong>reizarm</strong> in ruhiger Atmosphäre aufbauen, Ablenkungen <strong>langsam steigern</strong> (Annäherung an schultypische Reize).</li>
      <li>Beim Steigern gilt: <strong>immer nur EIN Kriterium</strong> erhöhen (entweder Distanz ODER Ablenkung).</li>
      <li>Die <strong>Sitzdose</strong> kündigt ausschließlich Gutes an – niemals schimpfen oder zwingen, sonst funktioniert sie nicht.</li>
      <li><strong>„Aus“:</strong> Loslassen lohnt sich (Tauschprinzip) – Achtung, kostet viel Impulskontrolle; Verhalten, das nie mehr belohnt wird, wird <strong>gelöscht</strong>.</li>
      <li><strong>Seitenwechsel:</strong> im Schulgebäude sehr sinnvoll (Begegnungen im Gang).</li>
    </ul>`,
  details: [
    { t: 'Warum zusätzliche Signale?', h: `
      <p>Hunde müssen auf den Einsatz in der Schule gut vorbereitet werden: fressbare Dinge auf dem Boden, rennende Kinder, geworfene Spielsachen, Schulgong, viele Reize. Ergänzend zum „normalen“ Grundgehorsam werden deshalb zusätzliche Signale aufgebaut:</p>
      <ul><li><strong>Sitzdose</strong> (z.&nbsp;B. in Begrüßungssituationen)</li><li><strong>Rückruf</strong> (von Fressbarem, Bewegungsreizen, Spielsachen ...)</li><li><strong>Box- und Deckentraining</strong> („Geh auf deine Decke / in die Box“)</li><li><strong>Bleib unter Ablenkung</strong></li><li><strong>„Aus“</strong> (Gegenstände freiwillig hergeben)</li><li><strong>Seitenwechsel</strong></li></ul>
      <div class="merke"><p>Alle Signale werden zunächst <strong>reizarm in ruhiger Atmosphäre</strong> aufgebaut; die Ablenkungen werden <strong>langsam gesteigert</strong> (Annäherung an schultypische Reize). Den Hund immer passend für ihn und die Situation belohnen. Hilfsmittel: <strong>Ablenkungs-/Generalisierungsliste</strong> mit aufsteigend schwierigen Ablenkungen (Stufe 1–20, am Ende „Doktorarbeit“ und „Professur“).</p></div>` },
    { t: 'Signal: Sitzdose', h: `
      <p>Training startet in ruhigen, entspannten Situationen. Der Hund steht aufmerksam vor dir, die geschlossene Dose ist hinter deinem Rücken.</p>
      <ol><li>Dose gut sichtbar vor den Vorderkörper nehmen</li><li>Signal „Sitz“ geben</li><li>Hund setzt sich</li><li>Sitzen <strong>sofort markern</strong></li><li>Dose öffnen + Keks daraus geben</li><li>Dose wieder nach hinten</li></ol>
      <p>Nach einigen Wiederholungen setzt sich der Hund beim Anblick der Dose von allein – <strong>die Dose ist zum Sitzsignal geworden</strong>. Dann der gleiche Ablauf ohne Wortsignal. Erst danach nach und nach Ablenkungen einbauen: 1. Familienmitglieder laufen herum, 2. kommen ohne Klingeln herein, 3. mit Klingeln, 4. Fremde klingeln ohne Öffnen, 5. Fremde klingeln + Tür wird geöffnet, 6. andere Menschen halten die Dose ...</p>
      <div class="merke"><p><strong>WICHTIG:</strong> Immer so trainieren, dass der Hund gut mitmachen kann. <strong>Niemals</strong> schimpfen, unfreundlich werden oder den Hund zwingen – die Sitzdose kündigt <strong>ausschließlich Gutes</strong> an, sonst funktioniert sie nicht!</p></div>` },
    { t: 'Signal: Rückruf', h: `
      <ol>
        <li>Hundename + neues Rückrufsignal → mit der Hand (inkl. Keks) die Hundenase finden → Hund frisst den Keks. Mehrmals wiederholen.</li>
        <li>Name + Signal → an der Hundenase „andocken“ → mit der Hundeschnauze an deiner Hand <strong>5 Schritte rückwärts</strong> gehen → Keks aus der Hand. Mehrmals wiederholen.</li>
        <li>Name – Signal – Hundenase finden – 5 Schritte <strong>schneller</strong> weg (Hand bleibt an der Nase) – Keks.</li>
        <li>Name – Signal – Nase finden, <strong>während der Hund abgelenkt ist</strong> (wird gekrault, bekommt Kekse) – Keks vor der Nase lassen, bis der Hund mitkommt – Keks.</li>
        <li>Dreht sich der Hund trotz Ablenkung nach dem Signal von allein um: Keks nicht mehr vor die Nase – ein paar Schritte rückwärts, Keks <strong>hinter dich werfen</strong> (in Laufrichtung des Hundes).</li>
        <li>Wie zuvor, aber die <strong>Belohnungen wechseln</strong>.</li>
        <li>Mehr Distanz aufbauen und Ablenkungen steigern – <strong>immer nur EIN Kriterium</strong> steigern (entweder Distanz oder Ablenkung)!</li>
      </ol>` },
    { t: 'Signal: „Geh auf deine Decke / in deine Box“ (3-Wochen-Plan)', h: `
      <p><strong>Woche 1 – Einführung und erste Schritte:</strong></p>
      <ul>
        <li><em>Tag 1–2 (Decke kennenlernen):</em> Decke an ruhigem Ort auslegen → mit Leckerli in der Hand langsam über die Decke locken → sobald der Hund auf der Decke steht, sofort belohnen + verbal loben (gern in der Platzposition) → 5–10× wiederholen. Ziel: positive Verknüpfung, möglichst ohne Locken.</li>
        <li><em>Tag 3–4 (Verweilen):</em> wieder auf die Decke locken → einige Sekunden warten, Zeit schrittweise vergrößern, dann belohnen → 5–10× üben. Achtung: Zeit nur im <strong>Sekundenabschnitt</strong> steigern, nicht zu viel erwarten!</li>
        <li><em>Tag 5–7 (Signal einführen):</em> Signal wählen (z.&nbsp;B. „Decke“), Signal <strong>vor</strong> der Handgeste aussprechen → jedes Mal wiederholen + belohnen → Verweildauer allmählich erhöhen.</li>
      </ul>
      <p><strong>Woche 2 – Verfeinerung und Ablenkungen (Tag 8–14):</strong> Signal in verschiedenen Situationen üben (TV, Musik, Familienmitglieder im Raum); Entfernung zur Decke langsam vergrößern; jedes Hinlaufen und Abliegen belohnen.</p>
      <p><strong>Woche 3 – Festigung und Integration in den Alltag:</strong></p>
      <ul>
        <li><em>Tag 15–18:</em> erhöhte Ablenkungen (Park, Besuch); Verweilen 5–10 Minuten; verschiedene Tageszeiten und Umgebungen (Signal gilt überall und jederzeit).</li>
        <li><em>Tag 19–21 (Stabilität):</em> Signal befolgen, auch wenn du das Zimmer verlässt; Belohnungshäufigkeit reduzieren, aber gutes Verhalten v.&nbsp;a. in schwierigen Situationen weiter belohnen.</li>
      </ul>
      <p><strong>Zusätzliche Tipps:</strong> Konsequenz (hilft schneller zu lernen), Geduld (Zeit zum Verinnerlichen), <strong>Bestrafungen vermeiden</strong> – positive Verstärkung ist effektiver!</p>` },
    { t: 'Signal: Bleib', h: `
      <p>Das Signal „Bleib“ sagt dem Hund: genau da warten, wo er ist, bis du zurückkommst.</p>
      <ol>
        <li>Der Hund ist vor dir (Sitz oder Platz).</li>
        <li>Du sagst dein Signal für „Bleib“.</li>
        <li>Kurz darauf kommt das <strong>Sichtsignal</strong> (erhobene Hand). Die Hand <strong>nicht</strong> direkt vor den Kopf des Hundes halten, sondern einfach nach oben nehmen – und dich nicht über den Hund beugen!</li>
        <li>Hand wieder nach unten, mit einem Schritt nach hinten wegdrehen.</li>
        <li>Zurück zum Hund drehen, beim Zurückgehen <strong>markern</strong> und belohnen. Achtung: Vor dem Markern nicht schon mit der Hand am Leckerlibeutel sein – das verleitet den Hund, in freudiger Erwartung aufzustehen.</li>
      </ol>
      <div class="merke"><p>Wirklich <strong>kleinschrittig</strong> aufbauen: immer nur ein bis zwei Schritte Abstand vergrößern – der Hund lernt: Die Belohnung kommt zu ihm, er muss nicht aufstehen, sein Mensch kommt gleich zurück. Wenn möglich den Hund <strong>nicht aus dem Sitz abrufen</strong> – sonst ist er in steter Erwartung, wann er endlich loslaufen kann. Ruhiges Warten lernt er erst, wenn der Mensch gleich wieder zurückkommt.</p></div>` },
    { t: 'Signal: „Aus“', h: `
      <p>Bei dieser Übung lernt der Hund, dass es sich für ihn <strong>lohnt</strong>, das Objekt seiner Begierde loszulassen bzw. zu tauschen.</p>
      <p><strong>Aufbau im Alltag (zufällig):</strong> Der Hund findet ein tolles Spielzeug → ein höherwertiges Spielzeug anbieten und zum Fang führen → sobald der Fang aufgeht: markern, die Belohnung ist das neue Objekt. Nimmt der Hund die Alternative nicht an → Konsequenz, z.&nbsp;B. einfach weitergehen, bis er es fallen lässt. Nimmt er die Alternative mehrmals gern an → „Aus“-Signal sagen und Alternative hinhalten.</p>
      <p><strong>Gezieltes Üben:</strong> Kaustange hinhalten (zu Beginn festhalten) → höherwertiges Futter direkt neben den Fang halten → im Moment des Loslassens markern → der Hund frisst das gute Futter, die Kaustange bleibt vor seinem Fang und <strong>er darf sie danach wieder nehmen</strong>. So lernt er: Loslassen lohnt sich, das Objekt wird ihm nicht weggenommen. Steigerungen: Kaustange nicht mehr festhalten → mit allen Dingen üben, die er später ausgeben soll → Hund knabbert länger an der Stange, „AUS“-Signal + gutes Futter → später „AUS“, wenn er gerade einen Gegenstand aufgenommen hat → schließlich reicht das Signal allein, Belohnung nur noch sporadisch (kein Marker mehr).</p>
      <div class="merke"><p><strong>Denkt daran: Verhalten, das nie mehr belohnt wird, wird gelöscht!</strong><br>Achtung: Das Training kostet viel <strong>Impulskontrolle</strong> – daher nicht übertreiben!</p></div>` },
    { t: 'Signal: Seitenwechsel', h: `
      <p>Der Hund wechselt auf Signal die Seite – <strong>hinter seiner Bezugsperson</strong>. Nutzen: Im Freien vermeidest du z.&nbsp;B. frontale Hundebegegnungen (meist nicht unbedingt freundlich), kannst mit mehr Abstand an Auslösern vorbeigehen, und der Hund muss nicht direkt an der Straße oder an Menschen laufen. <strong>Im Schulgebäude sehr sinnvoll</strong>, z.&nbsp;B. wenn euch im Gang Personen begegnen.</p>
      <p><strong>Aufbau:</strong></p>
      <ol>
        <li>Der Hund ist angeleint neben dir.</li>
        <li>Du lockst ihn mit einem Leckerchen <strong>hinter deinem Rücken</strong> auf die andere Seite – der Bewegungsablauf sollte für euch beide klar sein.</li>
        <li>Dort angekommen: markern und belohnen.</li>
        <li>Klappt es mehrmals gut: Leckerchen weglassen, mit leerer Hand locken, markern + belohnen – zeitgleich das <strong>Wortsignal</strong> einführen.</li>
        <li>Die Handbewegung wird immer kürzer, bis das reine Wortsignal reicht.</li>
        <li>Dann im Loslaufen üben, anschließend während des Gehens.</li>
      </ol>
      <p>Wichtig: <strong>Jede Stufe muss einwandfrei klappen</strong>, bevor der Schwierigkeitsgrad erhöht wird. Möglich: ein Signal für beide Seiten („Wechsel“, „rüber“ ...) oder zwei Signale, eines pro Seite.</p>` }
  ]
});
