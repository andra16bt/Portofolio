/* intro.js — layar intro: tekan panah atas (desktop) atau swipe atas (mobile/tablet) untuk masuk.

   Pasang di <head> (sinkron, tanpa defer) setelah link intro.css supaya tidak ada kilatan konten:
     <link rel="stylesheet" href="css/intro.css">
     <script src="js/intro.js" data-name="Nama Kamu" data-tagline="Graphic Designer & IS Student"></script>

   Opsi (atribut pada tag script, semuanya opsional):
     data-name       nama di judul intro
     data-tagline    teks di bawah judul
     data-sticker-a  teks stiker kiri atas
     data-sticker-b  teks stiker kanan atas
     data-once       "false" = tampil setiap kali halaman dibuka (default: sekali per sesi tab)

   Paksa tampil untuk uji coba: tambahkan ?intro di URL, mis. index.html?intro */

(function () {
  "use strict";

  var root = document.documentElement;
  var script = document.currentScript;
  var cfg = (script && script.dataset) || {};

  var NAME = cfg.name || "Andra";
  var TAGLINE = cfg.tagline || "Design · Development · Data";
  var STICKER_A = cfg.stickerA || "PORTFOLIO 2026";
  var STICKER_B = cfg.stickerB || "★ OPEN TO COLLAB";
  var ONCE = cfg.once !== "false";
  var KEY = "portfolio-intro-seen";

  var force = /(?:^|[?&])intro(?:=|&|$)/.test(location.search);
  var seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === "1";
  } catch (e) {}

  // Lewati jika sudah pernah dilihat di sesi ini, atau datang lewat link ber-anchor (#contact, dll.)
  if (!force && ((ONCE && seen) || location.hash)) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  /* ---------- Bentuk SVG (flat, border hitam) ---------- */
  var K = "#111111";
  var SHAPES = {
    star: function (c) {
      return (
        '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6C54 34 66 46 94 50C66 54 54 66 50 94C46 66 34 54 6 50C34 46 46 34 50 6Z" fill="' +
        c +
        '" stroke="' +
        K +
        '" stroke-width="5" stroke-linejoin="round"/></svg>'
      );
    },
    asterisk: function (c) {
      return (
        '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke-linecap="round" fill="none"><path d="M50 14V86M19 32L81 68M19 68L81 32" stroke="' +
        K +
        '" stroke-width="18"/><path d="M50 14V86M19 32L81 68M19 68L81 32" stroke="' +
        c +
        '" stroke-width="8"/></g></svg>'
      );
    },
    ring: function (c) {
      return (
        '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34" fill="none" stroke="' +
        K +
        '" stroke-width="22"/><circle cx="50" cy="50" r="34" fill="none" stroke="' +
        c +
        '" stroke-width="10"/></svg>'
      );
    },
    triangle: function (c) {
      return (
        '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 92,86 8,86" fill="' +
        c +
        '" stroke="' +
        K +
        '" stroke-width="6" stroke-linejoin="round"/></svg>'
      );
    },
  };

  function shape(type, color, size, pos, spin, i) {
    return (
      '<div class="intro__shape' +
      (spin ? " intro__shape--spin" : "") +
      '" style="--s:' +
      size +
      ";--dur:" +
      (spin ? 24 : 6 + i) +
      "s;--delay:-" +
      i * 1.4 +
      "s;" +
      pos +
      '">' +
      SHAPES[type](color) +
      "</div>"
    );
  }

  /* ---------- Bangun overlay ---------- */
  var MARQUEE = [
    "Welcome",
    "Graphic Design",
    "Development",
    "Data Analytics",
    "Enter",
  ];
  var marqueeItems = "";
  for (var r = 0; r < 4; r++) {
    MARQUEE.forEach(function (t) {
      marqueeItems += "<span>" + t + " ✦</span>";
    });
  }

  // Panel di belakang stage (DOM terakhir = paling atas): kuning, ungu, mint, oranye, krem
  var panels = [
    ["5", "#FFF4DC"],
    ["4", "#FF8A3D"],
    ["3", "#62E6B0"],
    ["2", "#B9A2FF"],
    ["1", "#FFD93D"],
  ]
    .map(function (p) {
      return (
        '<div class="intro__panel" style="--d:' +
        p[0] +
        ";--c:" +
        p[1] +
        '"></div>'
      );
    })
    .join("");

  var overlay = document.createElement("div");
  overlay.className = "intro";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML =
    panels +
    '<div class="intro__stage">' +
    '<span class="intro__sticker intro__sticker--a intro__pop" style="--p:3"></span>' +
    '<span class="intro__sticker intro__sticker--b intro__pop" style="--p:4"></span>' +
    shape("star", "#FFD93D", 72, "left:8%;top:24%", true, 0) +
    shape("asterisk", "#B9A2FF", 64, "right:9%;top:28%", true, 1) +
    shape("ring", "#62E6B0", 56, "left:11%;bottom:30%", false, 2) +
    shape("triangle", "#FF8A3D", 60, "right:8%;bottom:27%", false, 3) +
    '<div class="intro__center">' +
    '<p class="intro__script intro__pop" style="--p:0">welcome to my portfolio</p>' +
    '<div class="intro__title">' +
    '<span class="intro__pop" style="--p:1">Hello,</span>' +
    '<span class="intro__pop" style="--p:2"><span class="intro__name"></span></span>' +
    "</div>" +
    '<p class="intro__tag intro__pop" style="--p:3"></p>' +
    "</div>" +
    '<div class="intro__bottom intro__pop" style="--p:5">' +
    '<button class="intro__cta" type="button">' +
    '<span class="intro__key" aria-hidden="true">↑</span>' +
    '<span class="intro__cta-text"></span>' +
    "</button>" +
    '<p class="intro__hint"></p>' +
    "</div>" +
    '<div class="intro__marquee" aria-hidden="true"><div class="intro__track">' +
    marqueeItems +
    "</div></div>" +
    "</div>";

  // Teks dinamis lewat textContent (aman dari karakter khusus)
  overlay.setAttribute("aria-label", "Welcome to " + NAME + "'s portfolio");
  overlay.querySelector(".intro__name").textContent = "I'm " + NAME;
  overlay.querySelector(".intro__tag").textContent = TAGLINE;
  overlay.querySelector(".intro__sticker--a").textContent = STICKER_A;
  overlay.querySelector(".intro__sticker--b").textContent = STICKER_B;
  overlay.querySelector(".intro__cta-text").textContent = touch
    ? "Swipe up to enter"
    : "Press arrow up to enter";
  overlay.querySelector(".intro__hint").textContent = touch
    ? "or tap the button"
    : "or click the button";

  var stage = overlay.querySelector(".intro__stage");
  var cta = overlay.querySelector(".intro__cta");

  // Dipasang langsung di <html> agar sudah tampil di paint pertama (sebelum <body> ada)
  root.classList.add("intro-active");
  root.appendChild(overlay);

  var prevRestoration = null;
  if ("scrollRestoration" in history) {
    prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
  }

  function onReady() {
    if (!overlay.isConnected) return;
    document.body.inert = true; // konten di belakang tidak bisa difokus selama intro
    window.scrollTo(0, 0);
    try {
      cta.focus({ preventScroll: true });
    } catch (e) {
      cta.focus();
    }
  }
  if (document.body) onReady();
  else document.addEventListener("DOMContentLoaded", onReady);

  /* ---------- Masuk ---------- */
  var busy = false;

  function finish() {
    window.removeEventListener("keydown", onKey, true);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    root.classList.remove("intro-active", "intro-reveal");
    if (document.body) document.body.inert = false;
    if (prevRestoration !== null) history.scrollRestoration = prevRestoration;
    window.scrollTo(0, 0);
  }

  function enter(fromDrag) {
    if (busy) return;
    busy = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}

    if (reduce) {
      finish();
      return;
    }

    if (fromDrag) {
      // Lanjutkan dari posisi terakhir geseran jari
      stage.style.transition = "";
      void stage.offsetWidth;
      stage.style.transform = "";
    }
    overlay.classList.add("is-leaving");
    setTimeout(function () {
      root.classList.add("intro-reveal");
    }, 350); // hero mulai muncul saat tirai terbuka
    setTimeout(finish, 1350); // 0.8s + 5 lembar x 90ms + cadangan
  }

  /* ---------- Input: panah atas ---------- */
  function onKey(e) {
    if (e.key === "ArrowUp" || e.key === "Up") {
      e.preventDefault();
      enter(false);
    }
  }
  window.addEventListener("keydown", onKey, true);

  /* ---------- Input: tombol (fallback + aksesibilitas) ---------- */
  cta.addEventListener("click", function () {
    enter(false);
  });

  /* ---------- Input: swipe atas (jari/pen/mouse drag), stage mengikuti jari ---------- */
  var tracking = false,
    dragging = false,
    pid = null,
    sx = 0,
    sy = 0,
    dy = 0,
    t0 = 0;

  overlay.addEventListener("pointerdown", function (e) {
    if (busy || (e.pointerType === "mouse" && e.button !== 0)) return;
    tracking = true;
    dragging = false;
    pid = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    dy = 0;
    t0 = performance.now();
  });

  overlay.addEventListener("pointermove", function (e) {
    if (!tracking || busy || e.pointerId !== pid) return;
    var dx = e.clientX - sx;
    dy = e.clientY - sy;
    if (!dragging) {
      if (dy < -8 && Math.abs(dy) > Math.abs(dx)) {
        dragging = true;
        try {
          overlay.setPointerCapture(pid);
        } catch (err) {} // baru ditangkap saat benar-benar menggeser agar klik tombol tetap jalan
        stage.style.transition = "none";
      } else {
        return;
      }
    }
    stage.style.transform = "translateY(" + Math.min(0, dy) + "px)";
  });

  function endDrag(e) {
    if (!tracking || e.pointerId !== pid) return;
    tracking = false;
    if (!dragging) return;
    dragging = false;
    var flick = -dy > 40 && performance.now() - t0 < 350;
    if (-dy > window.innerHeight * 0.18 || flick) {
      enter(true);
    } else {
      // Belum cukup jauh: kembali ke posisi semula
      stage.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
      stage.style.transform = "";
      setTimeout(function () {
        stage.style.transition = "";
      }, 420);
    }
  }
  overlay.addEventListener("pointerup", endDrag);
  overlay.addEventListener("pointercancel", endDrag);
})();
