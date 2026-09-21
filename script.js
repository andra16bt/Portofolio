const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  const isAtBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
  if (isAtBottom) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightActiveNav);
highlightActiveNav();

const revealElements = document.querySelectorAll(
  ".card, .contact-item, #tentang p",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => {
  el.classList.add("reveal-hidden");
  revealObserver.observe(el);
});

const emailLink = document.querySelector('a[href^="mailto:"]');

if (emailLink) {
  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailLink.href.replace("mailto:", "");
    navigator.clipboard.writeText(email).then(() => {
      const original = emailLink.querySelector(
        ".contact-text span:last-child",
      ).textContent;
      emailLink.querySelector(".contact-text span:last-child").textContent =
        "Tersalin ✓";
      setTimeout(() => {
        emailLink.querySelector(".contact-text span:last-child").textContent =
          original;
      }, 1500);
    });
  });
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

let width, height;
let symbols = [];
let mouse = { x: null, y: null };

const mathSymbols = [
  "x",
  "y",
  "z",
  "+",
  "−",
  "×",
  "÷",
  "=",
  "√",
  "π",
  "%",
  "∫",
  "≠",
];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class MathSymbol {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.text = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];

    this.size = Math.floor(Math.random() * 37) + 36;

    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.vRot = (Math.random() - 0.5) * 0.015;

    const colors = ["#FF5522", "#FFC200", "#FF65A3", "#8B5CF6", "#10B981"];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.opacity = Math.random() * 0.25 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vRot;

    if (this.x < -50 || this.x > width + 50) this.vx *= -1;
    if (this.y < -50 || this.y > height + 50) this.vy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let maxDistance = 180;

      if (distance < maxDistance) {
        let force = (maxDistance - distance) / maxDistance;
        this.x -= (dx / distance) * force * 5;
        this.y -= (dy / distance) * force * 5;
      }
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.font = `bold ${this.size}px 'Outfit', sans-serif`;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}

for (let i = 0; i < 25; i++) {
  symbols.push(new MathSymbol());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  symbols.forEach((s) => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Tambahkan di script.js
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Tutup menu otomatis saat salah satu link diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});
