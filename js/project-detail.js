/* project-detail.js — render detail via ?id=, field menyesuaikan bidang project */

(function () {
  const root = document.getElementById("detail-root");
  if (!root) return;

  // Panel info per bidang: [label, nama field]
  const META = {
    "Graphic Design": [["Role", "role"], ["Tools used", "tools"], ["Committee / Event", "client"], ["Year", "year"]],
    "Development":    [["Role", "role"], ["Tech stack", "tools"], ["Project type", "client"], ["Year", "year"]],
    "Data Analytics": [["Role", "role"], ["Tools used", "tools"], ["Dataset", "dataset"], ["Year", "year"]]
  };
  // Judul galeri per bidang
  const GALLERY_TITLE = {
    "Graphic Design": "Gallery",
    "Development": "Screenshots",
    "Data Analytics": "Charts & Dashboard"
  };
  // Blok daftar tambahan per bidang: [judul, nama field]
  const LIST_BLOCK = {
    "Development": ["Key Features", "features"],
    "Data Analytics": ["Key Insights", "insights"]
  };

  const id = new URLSearchParams(location.search).get("id");
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    document.title = "Project not found — Portfolio";
    root.innerHTML = `
      <section class="section section--cream">
        <div class="container">
          <div class="card fallback">
            <h2>Project not found</h2>
            <p>Sorry, the project you're looking for doesn't exist or has been moved.</p>
            <a class="btn btn--primary" href="projects.html">← Back to Projects</a>
          </div>
        </div>
      </section>`;
    return;
  }

  const p = projects[index];
  const cat = categoryOf(p);
  document.title = `${p.title} — Portfolio`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", p.summary);

  // Previous / Next: dalam bidang yang sama jika ada minimal 2 project, jika tidak ke semua project
  const sameCat = projects.filter((x) => x.category === p.category);
  const pool = sameCat.length >= 2 ? sameCat : projects;
  const pos = pool.indexOf(p);
  const prev = pool[(pos - 1 + pool.length) % pool.length];
  const next = pool[(pos + 1) % pool.length];
  const hasPager = pool.length >= 2;

  const paragraphs = p.description.split("\n\n").map((t) => `<p>${t}</p>`).join("");

  const metaItems = (META[p.category] || META["Graphic Design"])
    .filter(([, key]) => p[key] !== undefined && p[key] !== "" && !(Array.isArray(p[key]) && !p[key].length))
    .map(([label, key]) => {
      const v = Array.isArray(p[key]) ? p[key].join(" · ") : p[key];
      return `<div><dt>${label}</dt><dd>${v}</dd></div>`;
    })
    .join("");

  // Tombol link: mendukung array `links` (dan field lama `link` bertipe string)
  const links = (p.links && p.links.length) ? p.links : (p.link ? [{ label: "View project", url: p.link }] : []);
  const linkBtns = links
    .map((l, i) => `<a class="btn ${i === 0 ? "btn--accent" : "btn--ghost"}" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`)
    .join("");

  const lb = LIST_BLOCK[p.category];
  const listBlock = lb && p[lb[1]] && p[lb[1]].length
    ? `<div class="detail__block"><h3>${lb[0]}</h3><ul class="detail__list">${p[lb[1]].map((t) => `<li>${t}</li>`).join("")}</ul></div>`
    : "";

  const galleryItems = (p.gallery || [])
    .map((src, i) => `
      <button class="gallery__item reveal" type="button" data-index="${i}" aria-label="Open image ${i + 1} of ${p.title}">
        ${imageHTML(src, `${p.title} — image ${i + 1}`, `${p.title} · ${i + 1}`, index + i + 1)}
      </button>`)
    .join("");
  const gallery = galleryItems
    ? `<h2 class="detail__subhead">${GALLERY_TITLE[p.category] || "Gallery"}</h2>
       <div class="gallery gallery--${cat.slug}">${galleryItems}</div>`
    : "";

  const pager = hasPager
    ? `<nav class="pager" aria-label="Project navigation">
         <a class="card pager__card pager__card--prev" href="project.html?id=${encodeURIComponent(prev.id)}"><span>← Previous</span><strong>${prev.title}</strong></a>
         <a class="card pager__card pager__card--next" href="project.html?id=${encodeURIComponent(next.id)}"><span>Next →</span><strong>${next.title}</strong></a>
       </nav>`
    : "";

  root.innerHTML = `
    <header class="page-head section--${cat.color}">
      <div class="container detail__top">
        <a class="btn btn--small" href="projects.html">← Back</a>
        <h1>${p.title}</h1>
        <div class="detail__tags"><span class="tag tag--${cat.slug}">${p.category}</span><span class="tag">${p.year}</span></div>
      </div>
    </header>
    <section class="section section--cream">
      <div class="container">
        <div class="detail__cover reveal">${imageHTML(p.cover, `${p.title} — cover`, p.title, index, false)}</div>
        <div class="detail__layout">
          <div class="detail__desc reveal">
            <h2 style="margin-bottom:1.5rem">The <span class="highlight">Story</span></h2>
            ${paragraphs}
            ${listBlock}
            ${linkBtns ? `<div class="detail__links">${linkBtns}</div>` : ""}
          </div>
          <aside class="card meta-panel meta-panel--${cat.slug} reveal" aria-label="Project info">
            <dl style="display:contents">${metaItems}</dl>
          </aside>
        </div>
        ${gallery}
        ${pager}
      </div>
    </section>
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="btn btn--accent lightbox__close" type="button" id="lightbox-close">Close ✕</button>
      <div class="lightbox__content" id="lightbox-content"></div>
    </div>`;

  if (window.initReveal) window.initReveal(root);

    // Galeri: baca rasio asli tiap foto agar tata letak rapi tanpa crop/stretch
  root.querySelectorAll(".gallery__item").forEach((item, i) => {
    const probe = new Image();
    probe.onload = () => {
      if (probe.naturalWidth && probe.naturalHeight) {
        item.style.setProperty("--ar", (probe.naturalWidth / probe.naturalHeight).toFixed(4));
      }
    };
    probe.src = p.gallery[i];
  });

  // Lightbox sederhana
  const lbox = document.getElementById("lightbox");
  const lbContent = document.getElementById("lightbox-content");
  const closeBtn = document.getElementById("lightbox-close");
  let lastFocus = null;

  function open(i) {
    lastFocus = document.activeElement;
    lbContent.innerHTML = imageHTML(p.gallery[i], `${p.title} — image ${i + 1}`, `${p.title} · ${i + 1}`, index + i + 1, false);
    lbox.classList.add("is-open");
    closeBtn.focus();
  }
  function close() {
    lbox.classList.remove("is-open");
    lbContent.innerHTML = "";
    if (lastFocus) lastFocus.focus();
  }
  root.querySelectorAll(".gallery__item").forEach((b) =>
    b.addEventListener("click", () => open(Number(b.dataset.index)))
  );
  closeBtn.addEventListener("click", close);
  lbox.addEventListener("click", (e) => { if (e.target === lbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lbox.classList.contains("is-open")) close(); });
})();

