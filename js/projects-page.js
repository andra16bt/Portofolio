/* projects-page.js — render grid + filter kategori (juga dipakai untuk Featured di landing) */

function projectCardHTML(p, index) {
  const c = categoryOf(p);
  return `
    <a class="card project-card cat-${c.slug} reveal" href="project.html?id=${encodeURIComponent(p.id)}" data-category="${p.category}">
      <div class="project-card__thumb">${imageHTML(p.cover, `${p.title} — cover`, p.title, index)}</div>
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__summary">${p.summary}</p>
      <div class="project-card__meta">
        <span class="tag tag--${c.slug}">${p.category}</span>
        <span class="tag">${p.year}</span>
      </div>
    </a>`;
}

function renderProjectGrid(container, list) {
  container.innerHTML = list.map(projectCardHTML).join("");
  if (window.initReveal) window.initReveal(container);
}

(function () {
  // Landing: featured projects (urutan mengikuti urutan di projects.js)
  const featured = document.getElementById("featured-grid");
  if (featured) {
    // 2 project terbaru per bidang = 2 entri paling bawah di projects.js.
    // Urutan di kolom: yang paling baru di atas.
    const list = Object.keys(CATEGORIES).flatMap((cat) =>
      projects
        .filter((p) => p.category === cat)
        .slice(-2)
        .reverse(),
    );
    renderProjectGrid(featured, list);
  }

  // Halaman daftar project
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  const filters = document.querySelectorAll(".filter-btn");
  const empty = document.getElementById("empty-state");

  function apply(cat) {
    const list =
      cat === "All" ? projects : projects.filter((p) => p.category === cat);
    renderProjectGrid(grid, list);
    empty.classList.toggle("is-visible", list.length === 0);
    filters.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  filters.forEach((b) =>
    b.addEventListener("click", () => apply(b.dataset.filter)),
  );

  // Mendukung tautan langsung ke filter, mis. projects.html?cat=Development
  const wanted = new URLSearchParams(location.search).get("cat");
  const valid = wanted && (wanted === "All" || CATEGORIES[wanted]);
  apply(valid ? wanted : "All");
})();
