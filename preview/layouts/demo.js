/* Gemeinsame Beispieldaten und Bausteine fuer die Layout-Prototypen von Cadence.
   Einbinden mit <script src="demo.js"></script>. Stellt das globale Objekt DEMO bereit.
   Alle Werte entsprechen dem, was die echte App fuer diese Daten ausrechnet. */
(function(){
  const I={
    wand:'<path d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5z"/><path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    phoneoff:'<rect x="7" y="4" width="10" height="16" rx="2"/><path d="M4 4l16 16"/>',
    brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.5A3 3 0 0 0 6 18a3 3 0 0 0 3 2V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.5A3 3 0 0 1 18 18a3 3 0 0 1-3 2V4z"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19"/>',
    dumbbell:'<path d="M3 9v6M6 7.5v9M18 7.5v9M21 9v6M6 12h12"/>',
    tooth:'<path d="M12 4.5C10 3 7.2 3.2 6.2 5.6c-1 2.3-.2 4.7.3 7.5.4 2.3.6 5.9 2 5.9 1.2 0 1.2-2 1.7-3.8.4-1.5 1.2-1.5 1.6 0 .5 1.8.5 3.8 1.7 3.8 1.4 0 1.6-3.6 2-5.9.5-2.8 1.3-5.2.3-7.5C16.8 3.2 14 3 12 4.5z"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>', dash:'<path d="M6 12h12"/>', x:'<path d="M7 7l10 10M17 7L7 17"/>',
    plus:'<path d="M12 5v14M5 12h14"/>', chev:'<path d="M9 18l6-6-6-6"/>', back:'<path d="M15 18l-6-6 6-6"/>',
    bulb:'<path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.3 1 2.6h6c0-1.3.3-1.9 1-2.6A6 6 0 0 0 12 3z"/>',
    archive:'<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><path d="M10 13h4"/>',
    chart:'<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="12" y="7" width="3" height="11"/><rect x="17" y="13" width="3" height="5"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  // phase: 'build' (im Aufbau) | 'stable' (Stabil) | 'archive' (Archiv-reif)
  // fill/mark: Anteil 0..1 der Skala bis Archiv-reif; mark = Lage der Stabil-Marke
  // heute: 'g' erledigt | 'o' entschuldigt | 'r' nicht | '' offen
  // letzte14: die letzten 14 Tage, aeltester zuerst, letzter Eintrag = heute
  const habits=[
    {id:'h2',name:'Wäsche sofort wegräumen',icon:I.wand,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:null,notiz:'Ich erledige Dinge direkt.',
      alter:39,phase:'stable',fill:.65,mark:.35,satz:'Archiv-reif in 21 Tagen',quote:97,serie:36,serieEinheit:'Tage',heute:'g',
      letzte14:['g','g','g','g','g','g','g','g','g','g','g','g','g','g']},
    {id:'h3',name:'Morgens nur Podcast',icon:I.music,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:null,notiz:'Mein Handy bestimmt nicht meinen Tag.',
      alter:36,phase:'stable',fill:.6,mark:.35,satz:'Archiv-reif in 24 Tagen',quote:100,serie:28,serieEinheit:'Tage',heute:'g',
      letzte14:['g','o','g','g','g','g','g','g','g','g','g','g','g','g']},
    {id:'h4',name:'Habit tracken vorm Bett',icon:I.moon,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:null,notiz:'',
      alter:17,phase:'build',fill:.283,mark:.35,satz:'Stabil in 4 Tagen',quote:93,serie:14,serieEinheit:'Tage',heute:'',
      letzte14:['g','g','','g','g','g','g','o','g','g','g','g','g','']},
    {id:'h5',name:'Kein Handy auf dem Klo',icon:I.phoneoff,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:null,notiz:'',
      alter:13,phase:'build',fill:.217,mark:.35,satz:'Stabil in 10 Tagen ohne Lücke',quote:85,serie:11,serieEinheit:'Tage',heute:'g',
      letzte14:['','g','g','g','r','g','g','g','g','','g','g','g','g']},
    {id:'h6',name:'Anki öffnen',icon:I.brain,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:'Lernen',notiz:'',
      alter:10,phase:'build',fill:.167,mark:.35,satz:'Stabil in 11 Tagen',quote:90,serie:9,serieEinheit:'Tage',heute:'g',
      letzte14:['','','','','g','g','g','g','r','g','g','g','g','g']},
    {id:'h7',name:'Chinesisch-App öffnen',icon:I.book,rhythmus:'Jeden Tag',faelligHeute:true,gruppe:'Lernen',notiz:'',
      alter:10,phase:'build',fill:.167,mark:.35,satz:'Stabil in 11 Tagen',quote:88,serie:7,serieEinheit:'Tage',heute:'',
      letzte14:['','','','','g','g','','g','g','g','g','o','g','']},
    {id:'h8',name:'Sport',icon:I.dumbbell,rhythmus:'2× pro Woche',faelligHeute:false,wocheStand:'0/2',gruppe:null,notiz:'',
      alter:21,phase:'stable',fill:.35,mark:.35,satz:'Archiv-reif in 39 Tagen',quote:100,serie:2,serieEinheit:'Wochen',heute:'',
      letzte14:['','','','','g','','','','','g','','g','','']}
  ];
  const archiv=[{name:'Hygiene-Routine',icon:I.tooth,tageDabei:42,quote:97,
    ablauf:['Zahnseide','Zähne putzen','Gesicht waschen','Lippen eincremen'],notiz:'Ich kümmere mich um mich.'}];
  const ideen=[
    {text:'Direkt nach dem Essen abspülen',notiz:'Leicht – guter nächster Schritt.',prio:'hoch'},
    {text:'Handy nicht ins Bett',notiz:'Größter Hebel, aber schwer.',prio:'hoch'},
    {text:'5 Minuten aufräumen nach dem Heimkommen',notiz:'',prio:'mittel'},
    {text:'Abends lesen',notiz:'',prio:'mittel'},
    {text:'Mobility morgens',notiz:'',prio:'irgendwann'}];
  const tage=['Mo','Di','Mi','Do','Fr','Sa','So'];
  window.DEMO={
    icons:I, habits, archiv, ideen,
    heuteLang:'Montag, 12. Oktober', heuteWochentag:0,           // 0 = Montag
    // Wochentags-Kuerzel fuer die letzten n Tage (aeltester zuerst, letzter = heute)
    tageLabels(n){const out=[];for(let i=n-1;i>=0;i--)out.push(tage[((0-i)%7+7)%7]);return out;},
    svg(inner,size){return `<svg viewBox="0 0 24 24" width="${size||20}" height="${size||20}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;},
    faellig(){return habits.filter(h=>h.faelligHeute);},
    // Zaehler fuer "Dein Tag": {erledigt, gesamt}
    tag(){const f=habits.filter(h=>h.faelligHeute);return {erledigt:f.filter(h=>h.heute==='g'||h.heute==='o').length,gesamt:f.length};},
    // Eintrag fuer heute setzen ('g','o','r' oder '' zum Zuruecksetzen); haelt letzte14 mit
    setHeute(id,st){const h=habits.find(x=>x.id===id);if(!h)return;h.heute=st;h.letzte14[13]=st;},
    nachPhase(){return {build:habits.filter(h=>h.phase==='build'),stable:habits.filter(h=>h.phase==='stable'),archive:habits.filter(h=>h.phase==='archive')};},
    phaseName:{build:'Im Aufbau',stable:'Stabil',archive:'Archiv-reif'},
    zustandName:{g:'Erledigt',o:'Entschuldigt',r:'Nicht','':'Offen'},
    // Tempo-Regel des Nutzers: hoechstens ca. 3 Gewohnheiten gleichzeitig im Aufbau; eine neue erst bei hoechstens 2
    regel:{maxAufbau:3,neuAb:2}
  };
})();
