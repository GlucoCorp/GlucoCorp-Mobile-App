(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('use').setAttribute('href', '#i-menu');
      }
    });
  }

  // Band state switcher (values from the Aya Mama screen design)
  var STATES = {
    normal:   { value: 88, trend: 'Steady',          word: 'Normal',   icon: 'circle-check',   sound: 'Silent' },
    warning:  { value: 62, trend: 'Falling 8%/min',  word: 'Warning',  icon: 'bell-ring',      sound: 'Soft chime' },
    critical: { value: 22, trend: 'Falling 14%/min', word: 'Critical', icon: 'triangle-alert', sound: 'Loud alarm, speaks the live reserve value' }
  };
  var band = document.querySelector('.band');
  var buttons = document.querySelectorAll('.state');
  var countTimer;

  function setState(name) {
    var s = STATES[name];
    if (!band || !s) return;
    band.dataset.state = name;
    band.querySelector('.band__trend').textContent = s.trend;
    band.querySelector('.band__word').textContent = s.word;
    band.querySelector('.band__icon use').setAttribute('href', '#i-' + s.icon);
    document.querySelector('.band__sound span').textContent = s.sound;
    buttons.forEach(function (b) {
      var on = b.dataset.set === name;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });

    var el = band.querySelector('.band__value');
    var from = parseInt(el.textContent, 10);
    clearInterval(countTimer);
    if (reduceMotion || from === s.value) { el.textContent = s.value; return; }
    var step = from > s.value ? -1 : 1;
    countTimer = setInterval(function () {
      from += step;
      el.textContent = from;
      if (from === s.value) clearInterval(countTimer);
    }, 18);
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setState(b.dataset.set); });
  });

  // Draw the reserve chart when it scrolls into view
  var charts = document.querySelectorAll('[data-draw]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    charts.forEach(function (c) { io.observe(c); });
  } else {
    charts.forEach(function (c) { c.classList.add('is-drawn'); });
  }

  // Hero pulse trace: an illustrative photoplethysmography waveform
  var canvas = document.querySelector('.monitor__trace');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var w, h, dpr;
    var period = 0.78;          // seconds per beat (~77 bpm)
    var speed = 150;            // px per second
    var start = performance.now();

    // One beat, t in [0,1): systolic upstroke, peak, dicrotic notch, diastolic runoff
    function beat(t) {
      var g = function (x, mu, sd) { return Math.exp(-Math.pow((x - mu) / sd, 2) / 2); };
      return 1.0 * g(t, 0.16, 0.06) + 0.42 * g(t, 0.38, 0.075) - 0.08 * g(t, 0.3, 0.02);
    }
    function sample(x, now) {
      var tSec = (now - start) / 1000 - x / speed;
      var phase = ((tSec / period) % 1 + 1) % 1;
      return beat(phase);
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // faint grid, like monitor paper
      ctx.strokeStyle = 'rgba(245,239,231,0.05)';
      ctx.lineWidth = 1;
      for (var gx = 0; gx < w; gx += 32) { ctx.beginPath(); ctx.moveTo(gx + 0.5, 0); ctx.lineTo(gx + 0.5, h); ctx.stroke(); }
      for (var gy = 0; gy < h; gy += 32) { ctx.beginPath(); ctx.moveTo(0, gy + 0.5); ctx.lineTo(w, gy + 0.5); ctx.stroke(); }

      var base = h * 0.78, amp = h * 0.58;
      var grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(232,131,111,0)');
      grad.addColorStop(0.35, 'rgba(232,131,111,0.55)');
      grad.addColorStop(1, 'rgba(232,131,111,1)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (var x = 0; x <= w; x += 2) {
        var y = base - sample(w - x, now) * amp;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // leading dot
      var yEnd = base - sample(0, now) * amp;
      ctx.fillStyle = '#E8836F';
      ctx.beginPath(); ctx.arc(w - 3, yEnd, 3.5, 0, Math.PI * 2); ctx.fill();
    }
    function loop(now) {
      draw(now);
      if (!reduceMotion && visible) raf = requestAnimationFrame(loop);
    }
    var raf, visible = true;
    resize();
    window.addEventListener('resize', function () { resize(); draw(performance.now()); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      }).observe(canvas);
    }
    raf = requestAnimationFrame(loop);
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
