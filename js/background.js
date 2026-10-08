/* background.js — latar animasi universal.
   Cukup dipasang di halaman mana pun (bersama background.css). Tidak perlu mengubah HTML.

   Otomatis aktif di:  .hero, .section, .page-head, [data-bg]
   Opsi di elemen:
     data-bg="off"            -> matikan di elemen ini
     data-bg="hero"           -> pakai layout hero (bentuk lebih banyak + parallax kursor)
     data-bg-color="pink"     -> paksa warna latar acuan (pink|yellow|purple|mint|orange|white|cream)
   Konten yang dirender belakangan oleh JS juga ikut terdeteksi otomatis. */

(function () {
  if (window.__bgInit) return;
  window.__bgInit = true;

  const SELECTOR = ".hero, .section, .page-head, [data-bg]";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const K = "#111111";

  const COLORS = {
    pink: "#FF5FA8", yellow: "#FFD93D", purple: "#B9A2FF",
    mint: "#62E6B0", orange: "#FF8A3D", white: "#FFFFFF"
  };
  const BG_LOOKUP = Object.assign({ cream: "#FFF4DC" }, COLORS);

  function hexToRgb(h) {
    const n = parseInt(h.slice(1), 16);
    return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
  }
  const RGB_TO_NAME = {};
  Object.keys(BG_LOOKUP).forEach((k) => { RGB_TO_NAME[hexToRgb(BG_LOOKUP[k])] = k; });

  /* Bentuk SVG flat: border hitam, isi warna aksen */
  function svgFor(type, c) {
    switch (type) {
      case "star":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6C54 34 66 46 94 50C66 54 54 66 50 94C46 66 34 54 6 50C34 46 46 34 50 6Z" fill="${c}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/></svg>`;
      case "circle":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="${c}" stroke="${K}" stroke-width="6"/></svg>`;
      case "ring":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34" fill="none" stroke="${K}" stroke-width="22"/><circle cx="50" cy="50" r="34" fill="none" stroke="${c}" stroke-width="10"/></svg>`;
      case "triangle":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 92,86 8,86" fill="${c}" stroke="${K}" stroke-width="6" stroke-linejoin="round"/></svg>`;
      case "asterisk":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke-linecap="round"><path d="M50 14V86M19 32L81 68M19 68L81 32" stroke="${K}" stroke-width="18" fill="none"/><path d="M50 14V86M19 32L81 68M19 68L81 32" stroke="${c}" stroke-width="8" fill="none"/></g></svg>`;
      case "plus":
        return `<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke-linecap="round"><path d="M50 14V86M14 50H86" stroke="${K}" stroke-width="22" fill="none"/><path d="M50 14V86M14 50H86" stroke="${c}" stroke-width="10" fill="none"/></g></svg>`;
      case "squiggle":
        return `<svg viewBox="0 0 110 60" aria-hidden="true"><g stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M10 30Q25 4 40 30T70 30T100 30" stroke="${K}" stroke-width="16"/><path d="M10 30Q25 4 40 30T70 30T100 30" stroke="${c}" stroke-width="8"/></g></svg>`;
      default:
        return "";
    }
  }

  /* Tata letak. l/r = kiri/kanan, tp/bt = atas/bawah (persen). s = ukuran px.
     a = float | spin. m = tampil di mobile (1) atau tidak (0). d = kedalaman parallax. */
  const HERO = [
    { t: "star",     l: "2%",  tp: "9%",  s: 64, a: "spin",  m: 1, d: 0.8 },
    { t: "ring",     l: "46%", tp: "5%",  s: 48, a: "float", m: 0, d: 0.4 },
    { t: "asterisk", r: "3%",  tp: "12%", s: 58, a: "spin",  m: 1, d: 1.0 },
    { t: "triangle", l: "4%",  bt: "9%",  s: 52, a: "float", m: 1, d: 0.6 },
    { t: "squiggle", l: "47%", bt: "5%",  s: 96, a: "float", m: 0, d: 0.3 },
    { t: "circle",   r: "5%",  bt: "9%",  s: 40, a: "float", m: 0, d: 0.9 }
  ];

  const TEMPLATES = [
    [
      { t: "star",     l: "2%",  tp: "8%",  s: 48, a: "float", m: 1 },
      { t: "ring",     r: "3%",  bt: "8%",  s: 44, a: "float", m: 1 },
      { t: "plus",     r: "7%",  tp: "10%", s: 34, a: "float", m: 0 }
    ],
    [
      { t: "asterisk", r: "2%",  tp: "6%",  s: 50, a: "spin",  m: 1 },
      { t: "triangle", l: "3%",  bt: "10%", s: 46, a: "float", m: 1 },
      { t: "squiggle", r: "9%",  bt: "6%",  s: 84, a: "float", m: 0 },
      { t: "circle",   l: "7%",  tp: "12%", s: 30, a: "float", m: 0 }
    ],
    [
      { t: "squiggle", l: "3%",  tp: "6%",  s: 88, a: "float", m: 0 },
      { t: "star",     r: "3%",  bt: "10%", s: 54, a: "spin",  m: 1 },
      { t: "circle",   r: "6%",  tp: "14%", s: 34, a: "float", m: 0 },
      { t: "asterisk", l: "4%",  bt: "8%",  s: 40, a: "float", m: 1 }
    ]
  ];

  /* Tentukan warna latar elemen: atribut > class > warna asli (computed) > cream */
  function bgColorOf(el) {
    const forced = el.getAttribute("data-bg-color");
    if (forced && BG_LOOKUP[forced]) return forced;
    if (el.classList.contains("hero")) return "pink";
    const cls = [...el.classList].map((c) => c.match(/^section--(\w+)$/)).find(Boolean);
    if (cls && BG_LOOKUP[cls[1]]) return cls[1];
    const computed = getComputedStyle(el).backgroundColor;
    return RGB_TO_NAME[computed] || "cream";
  }

  function build(el, layout, offset) {
    const bg = bgColorOf(el);
    const palette = Object.keys(COLORS).filter((c) => c !== bg);
    const wrap = document.createElement("div");
    wrap.className = "bg-shapes";
    wrap.setAttribute("aria-hidden", "true");

    layout.forEach((sh, i) => {
      const color = COLORS[palette[(i + offset) % palette.length]];
      const node = document.createElement("div");
      node.className = `bg-shape bg-shape--${sh.a}`;
      node.dataset.m = String(sh.m);
      if (sh.d) node.dataset.depth = String(sh.d);
      const st = node.style;
      st.setProperty("--s", sh.s);
      st.setProperty("--rot", (i % 2 ? -1 : 1) * (3 + (i % 3)) + "deg");   // maks ±5°
      st.setProperty("--dur", (sh.a === "spin" ? 22 + i * 3 : 6 + i * 0.8) + "s");
      st.setProperty("--delay", (-i * 1.3) + "s");
      if (sh.l) st.left = sh.l;
      if (sh.r) st.right = sh.r;
      if (sh.tp) st.top = sh.tp;
      if (sh.bt) st.bottom = sh.bt;
      node.innerHTML = svgFor(sh.t, color);
      wrap.appendChild(node);
    });

    el.insertBefore(wrap, el.firstChild);
    return wrap;
  }

  /* Parallax kursor (hanya layout hero, perangkat dengan mouse, tanpa reduced motion) */
  function initParallax(host, wrap) {
    if (reduce || !fine) return;
    const items = [...wrap.querySelectorAll(".bg-shape")].map((node) => ({
      node, depth: parseFloat(node.dataset.depth || "0.5"), x: 0, y: 0
    }));
    let tx = 0, ty = 0, running = false;

    function tick() {
      let moving = false;
      items.forEach((it) => {
        const gx = tx * it.depth * 28;
        const gy = ty * it.depth * 28;
        it.x += (gx - it.x) * 0.08;
        it.y += (gy - it.y) * 0.08;
        if (Math.abs(gx - it.x) > 0.1 || Math.abs(gy - it.y) > 0.1) moving = true;
        it.node.style.transform = `translate3d(${it.x.toFixed(2)}px, ${it.y.toFixed(2)}px, 0)`;
      });
      if (moving) requestAnimationFrame(tick);
      else running = false;
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(tick); } }

    host.addEventListener("mousemove", (e) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    });
    host.addEventListener("mouseleave", () => { tx = 0; ty = 0; kick(); });
  }

  let count = 0;
  function apply() {
    document.querySelectorAll(SELECTOR).forEach((el) => {
      if (el.hasAttribute("data-bg-done") || el.getAttribute("data-bg") === "off") return;
      el.setAttribute("data-bg-done", "");
      const isHero = el.classList.contains("hero") || el.getAttribute("data-bg") === "hero";
      if (count % 2 === 1) el.classList.add("bg-alt");
      const wrap = build(el, isHero ? HERO : TEMPLATES[count % TEMPLATES.length], count);
      if (isHero) initParallax(el, wrap);
      count++;
    });
  }

  function start() {
    apply();
    // Konten yang dirender belakangan (mis. halaman detail via JS) ikut terdeteksi
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; apply(); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();