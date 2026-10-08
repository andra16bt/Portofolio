/* components.js — inject navbar & footer + helper gambar */

const SITE = {
  name: "Narendra Adinata Anggara",            // [Placeholder] ganti dengan namamu
  monogram: "ANDRA",                 // [Placeholder]
  cv: "assets/cv/CV-NamaKamu.pdf",
  email: "rendradinata1606@gmail.com",     // [Placeholder]
  socials: [                      // [Placeholder] ganti dengan link asli
    { label: "Instagram", url: "https://www.instagram.com/ndradnata_/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rendradinata/" },
    { label: "GitHub", url: "https://github.com/andra16bt" }
  ]
};

function getCurrentPage() {
  const file = location.pathname.split("/").pop() || "index.html";
  if (file === "projects.html" || file === "project.html") return "projects";
  return "home";
}

function renderNavbar() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const page = getCurrentPage();
  const onHome = page === "home";
  const contactHref = onHome ? "#contact" : "index.html#contact";
  const cls = (p) => (page === p ? "is-active" : "");
  mount.innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <div class="container navbar__inner">
        <a class="navbar__logo" href="index.html" aria-label="${SITE.name} — Home"><span>${SITE.monogram}</span></a>
        <div class="navbar__menu">
          <a class="navbar__link ${cls("home")}" href="index.html" ${onHome ? 'aria-current="page"' : ""}>Home</a>
          <a class="navbar__link ${cls("projects")}" href="projects.html" ${page === "projects" ? 'aria-current="page"' : ""}>Projects</a>
          <a class="navbar__link" href="${contactHref}">Contact</a>
        </div>
        <a class="btn btn--accent btn--small navbar__cta" href="${SITE.cv}" download>Download CV ↓</a>
        <button class="navbar__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <a class="${cls("home")}" href="index.html">Home</a>
        <a class="${cls("projects")}" href="projects.html">Projects</a>
        <a href="${contactHref}">Contact</a>
        <a class="btn--primary" href="${SITE.cv}" download>Download CV ↓</a>
      </div>
    </nav>`;

  const toggle = mount.querySelector(".navbar__toggle");
  const menu = mount.querySelector("#mobile-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const links = SITE.socials
    .map((s) => `<a class="btn btn--small" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join("");
  mount.innerHTML = `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__name">${SITE.name}</div>
        <div class="footer__links">${links}
          <a class="btn btn--accent btn--small" href="#top">Back to top ↑</a>
        </div>
        <p class="footer__copy">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
      </div>
    </footer>`;
}

/* Helper: gambar dengan fallback placeholder jika file belum ada */
const PH_COLORS = ["var(--pink)", "var(--purple)", "var(--orange)", "var(--mint)", "var(--yellow)"];

function placeholderHTML(label, index = 0) {
  return `<div class="ph" role="img" aria-label="${label}" style="background:${PH_COLORS[index % PH_COLORS.length]}">${label}</div>`;
}

function imageHTML(src, alt, label, index = 0, lazy = true) {
  const id = "img" + Math.random().toString(36).slice(2, 9);
  setTimeout(() => {
    const img = document.getElementById(id);
    if (!img) return;
    const swap = () => { img.outerHTML = placeholderHTML(label || alt, index); };
    img.addEventListener("error", swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  }, 0);
  return `<img id="${id}" src="${src}" alt="${alt}" ${lazy ? 'loading="lazy"' : ""}>`;
}

renderNavbar();
renderFooter();
