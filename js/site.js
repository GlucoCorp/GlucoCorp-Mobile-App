(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // Sticky nav shadow and mobile menu
  var top = document.querySelector('.top');
  window.addEventListener('scroll', function () {
    top.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  var toggle = document.querySelector('.nav__toggle');
  if (toggle) {
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // Footnote links open the sources drawer
  var sources = document.getElementById('sources');
  if (sources) document.querySelectorAll('a[href="#sources"]').forEach(function (a) {
    a.addEventListener('click', function () { sources.open = true; });
  });

  // Hero band: cycles Normal -> Warning -> Critical (values from the Aya Mama screen design)
  var STATES = [
    { name: 'normal',   value: 88, word: 'Normal',   icon: 'circle-check',   bpm: 1.25 },
    { name: 'warning',  value: 62, word: 'Warning',  icon: 'bell-ring',      bpm: 1.6 },
    { name: 'critical', value: 22, word: 'Critical', icon: 'triangle-alert', bpm: 2.0 }
  ];
  var band = document.querySelector('[data-cycle]');
  var current = STATES[0];
  var countTimer;

  function show(s) {
    current = s;
    band.dataset.state = s.name;
    band.querySelector('.band__word').textContent = s.word;
    band.querySelector('.band__icon use').setAttribute('href', '#i-' + s.icon);
    var el = band.querySelector('.band__value');
    var from = parseInt(el.textContent, 10);
    clearInterval(countTimer);
    var step = from > s.value ? -1 : 1;
    countTimer = setInterval(function () {
      if (from === s.value) return clearInterval(countTimer);
      from += step;
      el.textContent = from;
    }, 22);
  }
  if (band && !reduceMotion) {
    var i = 0;
    var holds = [4200, 3200, 3600];
    (function next() {
      setTimeout(function () {
        i = (i + 1) % STATES.length;
        show(STATES[i]);
        next();
      }, holds[i]);
    })();
  }

  // Pulse trace on the band's screen
  var canvas = band && band.querySelector('.band__trace');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    var g = function (x, mu, sd) { return Math.exp(-Math.pow((x - mu) / sd, 2) / 2); };
    // One beat: systolic peak, then the dicrotic wave; the wave flattens as reserve falls
    function beat(t, reserve) {
      var notch = 0.15 + 0.3 * (reserve / 100);
      return g(t, 0.18, 0.06) + notch * g(t, 0.4, 0.07);
    }
    var phase = 0, last = performance.now();
    var colors = { normal: '#5FB98E', warning: '#E0A84A', critical: '#EF6B5B' };
    function draw(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      phase += dt * current.bpm;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = colors[current.name];
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      var amp = 0.35 + 0.6 * (current.value / 100);
      for (var x = 0; x <= w; x++) {
        var t = phase - (w - x) / w * 2.2;
        var v = beat(((t % 1) + 1) % 1, current.value);
        var y = h - 4 - v * (h - 8) * amp;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  // Count up the headline statistic
  var big = document.querySelector('[data-count]');
  function countUp(el) {
    var target = +el.dataset.count, start = performance.now(), dur = 1400;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  // Scroll-triggered reveals, chart drawing and count-up
  var revealEls = document.querySelectorAll('.sec .h2, .steps, .states, .product, .metrics, .road, .people, .cta__grid, .where__stats, .chart, .explore, .drape');
  if (hasIO && !reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.hasAttribute('data-draw')) e.target.classList.add('is-drawn');
        if (e.target === big) countUp(big);
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function (el) { io.observe(el); });
    if (big) io.observe(big);
  } else {
    document.querySelectorAll('[data-draw]').forEach(function (c) { c.classList.add('is-drawn'); });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
