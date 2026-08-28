(function(){
  var KEY  = 'ob-lang';
  var root = document.documentElement;

  /* ---------- dil ---------- */
  function apply(lang){
    root.setAttribute('lang', lang);
    try { localStorage.setItem(KEY, lang); } catch(e){}
    var t = root.getAttribute(lang === 'en' ? 'data-title-en' : 'data-title-tr');
    if (t) document.title = t;
  }
  // kayitli tercih -> yoksa tarayici dili -> yoksa TR
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch(e){}
  if (saved !== 'tr' && saved !== 'en') {
    var nav = (navigator.language || 'tr').toLowerCase();
    saved = nav.indexOf('tr') === 0 ? 'tr' : 'en';
  }
  apply(saved);
  var btn = document.getElementById('langbtn');
  if (btn) btn.addEventListener('click', function(){
    apply(root.getAttribute('lang') === 'tr' ? 'en' : 'tr');
  });

  /* ---------- mobil menu ---------- */
  var menu  = document.getElementById('menubtn');
  var links = document.querySelector('.navlinks');
  if (menu && links) {
    menu.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function(e){
      if (e.target.closest('a')) {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- hero terminali: test kosumu animasyonu ----------
     JS yoksa ya da kullanici hareket azaltmayi sectiyse terminal
     dogrudan tam halde gorunur (CSS varsayilani). */
  var term = document.getElementById('heroterm');
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
  if (term && !reduced) {
    term.classList.add('animate');
    var rows = term.querySelectorAll('.tl-line, .tl-sum');
    var delays = [150, 700, 1100, 1420, 1740, 2060, 2380, 2950];
    for (var i = 0; i < rows.length; i++) {
      (function(el, ms){
        setTimeout(function(){ el.classList.add('on'); }, ms);
      })(rows[i], delays[i] != null ? delays[i] : 3000 + i * 300);
    }
  }

  /* ---------- lightbox (ekran goruntuleri + klipler) ---------- */
  var lb = null;
  function ensureLb(){
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<button class="x" type="button" aria-label="Close">×</button><img alt="">';
    lb.addEventListener('click', function(e){
      if (e.target.tagName === 'VIDEO') return; // kontrollere tiklamak kapatmasin
      closeLb();
    });
    document.body.appendChild(lb);
  }
  function clearLbVideo(){
    var v = lb && lb.querySelector('video');
    if (v) { v.pause(); v.remove(); }
  }
  function openLb(src, alt){
    ensureLb();
    clearLbVideo();
    var img = lb.querySelector('img');
    img.style.display = '';
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
    document.body.classList.add('noscroll');
  }
  function openLbVideo(src, label){
    ensureLb();
    clearLbVideo();
    lb.querySelector('img').style.display = 'none';
    var v = document.createElement('video');
    v.src = src; v.muted = true; v.loop = true; v.controls = true;
    v.setAttribute('playsinline',''); v.setAttribute('aria-label', label || '');
    lb.appendChild(v);
    lb.classList.add('open');
    document.body.classList.add('noscroll');
    var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!rm) v.play();
  }
  function closeLb(){
    if (!lb) return;
    clearLbVideo();
    lb.classList.remove('open');
    document.body.classList.remove('noscroll');
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a.zoom');
    if (a) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // yeni sekme istegine karisma
      e.preventDefault();
      var im = a.querySelector('img');
      openLb(a.getAttribute('href'), im ? im.alt : '');
      return;
    }
    var vid = e.target.closest('.shot video');
    if (vid && !vid.closest('.lb')) {
      var srcEl = vid.querySelector('source');
      openLbVideo(vid.currentSrc || (srcEl && srcEl.src) || vid.src, vid.getAttribute('aria-label'));
    }
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
})();

/* azaltilmis hareket tercihinde otomatik oynayan klipleri durdur, kontrol ver */
(function(){
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  document.querySelectorAll('video[autoplay]').forEach(function(v){
    v.removeAttribute('autoplay'); v.removeAttribute('loop');
    v.pause(); v.setAttribute('controls','');
  });
})();
