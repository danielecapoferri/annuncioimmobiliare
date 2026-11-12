(function(){
  var LINK='https://www.immobiliare.it/mutui/simulazione/?price=250000&city=058091&src=immobiliare.it&from=banner_top_button_1';
  var VW=function(){return Math.min(document.documentElement.clientWidth||window.innerWidth,768);};
  var U=function(){return VW()/375;};
  var pageEl=document.getElementById('page');
  function setZoom(){ pageEl.style.setProperty('--z', VW()/375); }
  setZoom(); window.addEventListener('resize',setZoom);

  /* Link esterni: nuova scheda */
  document.querySelectorAll('[data-link]').forEach(function(a){a.href=LINK;a.target='_blank';a.rel='noopener';});

  /* Desktop: QR */
  var url=location.href.split('#')[0];
  var du=document.getElementById('deskUrl'); if(du) du.textContent=url;
  if(window.QRCode && window.matchMedia('(min-width:769px)').matches){ new QRCode(document.getElementById('qr'),{text:url,width:384,height:384,correctLevel:QRCode.CorrectLevel.M}); }

  /* ---------- Barra compatta ---------- */
  var bar=document.getElementById('stickyBar');
  var galEl=document.getElementById('GALLERY');
  function onScroll(){ bar.classList.toggle('on', galEl.getBoundingClientRect().top + 20*U() < 0); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---------- Galleria con loop ---------- */
  var track=document.getElementById('gTrack'), count=document.getElementById('gCount'), num=document.getElementById('gNum'), badges=document.getElementById('gBadges'), overlay=document.getElementById('gOverlay');
  var slides=track.children, N=slides.length; // 0 = clone promo, 1..5 foto, 6 promo, 7 clone foto 1
  var cur=1, lastPhoto=0;
  function w(){return track.clientWidth;}
  function jump(i){track.style.scrollSnapType='none';track.scrollLeft=i*w();track.offsetHeight;track.style.scrollSnapType='';cur=i;}
  function update(){
    var i=Math.round(track.scrollLeft/w());
    var real=+slides[i].dataset.i;
    if(real<5){lastPhoto=real;}
    var n=real<5?real+1:5; count.textContent=n+' di 5'; num.textContent=n+'/5'; badges.classList.toggle('off',real===5); overlay.classList.toggle('off',real===5);
    cur=i;
  }
  var t;
  track.addEventListener('scroll',function(){ update(); clearTimeout(t); t=setTimeout(settle,120); },{passive:true});
  function settle(){ var i=Math.round(track.scrollLeft/w()); if(i===N-1) jump(1); else if(i===0) jump(N-2); update(); }
  function go(d){ var i=Math.round(track.scrollLeft/w())+d; if(i<0){jump(N-2);i=N-3;} if(i>N-1){jump(1);i=2;} track.scrollTo({left:i*w(),behavior:'smooth'}); }
  document.getElementById('gPrev').addEventListener('click',function(e){e.stopPropagation();go(-1);});
  document.getElementById('gNext').addEventListener('click',function(e){e.stopPropagation();go(1);});
  window.addEventListener('load',function(){jump(1);update();});
  window.addEventListener('resize',function(){jump(cur);});
  jump(1);

  /* ---------- Galleria a schermo intero ---------- */
  var gp=document.getElementById('galleryPage'), gps=document.getElementById('gpScroll'), saved=0;
  function openGallery(){ saved=window.scrollY; gps.scrollTop=0; gp.classList.add('on'); gp.setAttribute('aria-hidden','false'); document.body.classList.add('lock'); }
  function closeGallery(){ gp.classList.remove('on'); gp.setAttribute('aria-hidden','true'); document.body.classList.remove('lock'); window.scrollTo(0,saved); }
  track.addEventListener('click',function(e){ if(e.target.closest('.promo')) return; openGallery(); });
  document.querySelectorAll('[data-open-gallery]').forEach(function(b){b.addEventListener('click',openGallery);});
  document.getElementById('gpBack').addEventListener('click',closeGallery);

  /* ---------- Scroll al calcolatore ---------- */
  document.querySelectorAll('[data-scroll-calc]').forEach(function(b){b.addEventListener('click',function(){
    var y=document.getElementById('n750_3511').getBoundingClientRect().top+window.scrollY-56*U();
    window.scrollTo({top:y,behavior:'smooth'});
  });});

  /* ---------- Assistente AI ---------- */
  var chat=document.getElementById('chat'), loader=document.getElementById('loader'), answer=document.getElementById('answer'), card=document.getElementById('mutuiCard'), body=document.getElementById('chatBody');
  var TEXT=[
    {t:'Ogni mutuo è diverso: rata, importo ottenibile e reddito necessario dipendono dalla tua situazione e dall’offerta della banca.\nCon '},
    {t:'Immobiliare.it Mutui',b:true},
    {t:' puoi simulare il mutuo per questa casa in 3 minuti, sapere quanto mutuo puoi ottenere e quali banche partner possono offrirti la soluzione più giusta per te.'}
  ];
  var timers=[];
  function clearT(){timers.forEach(clearTimeout);timers=[];}
  function stream(){
    answer.innerHTML='';
    var tokens=[]; TEXT.forEach(function(p){ p.t.split(/(\s+)/).forEach(function(s){ if(s) tokens.push({s:s,b:p.b}); }); });
    var i=0, el=null, lastB=null;
    (function step(){
      var n=Math.min(tokens.length, i+3); // 3 token per tick, come lo streaming reale
      for(;i<n;i++){ var tk=tokens[i];
        if(tk.b!==lastB){ el=tk.b?document.createElement('strong'):document.createElement('span'); answer.appendChild(el); lastB=tk.b; }
        el.textContent+=tk.s; }
      if(i<tokens.length) timers.push(setTimeout(step,45));
      else timers.push(setTimeout(function(){card.classList.add('on');},180));
    })();
  }
  function openChat(){
    clearT(); answer.innerHTML=''; card.classList.remove('on'); loader.style.display='flex'; body.scrollTop=0;
    chat.classList.add('on'); chat.setAttribute('aria-hidden','false'); document.body.classList.add('lock');
    timers.push(setTimeout(function(){ loader.style.display='none'; stream(); },2200));
  }
  function closeChat(){ clearT(); chat.classList.remove('on'); chat.setAttribute('aria-hidden','true'); document.body.classList.remove('lock'); }
  document.querySelectorAll('[data-open-chat]').forEach(function(b){b.addEventListener('click',openChat);});
  document.querySelectorAll('[data-close-chat]').forEach(function(b){b.addEventListener('click',closeChat);});
})();
