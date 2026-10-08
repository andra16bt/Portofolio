/* main.js — scroll reveal, smooth scroll offset */

(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal (IntersectionObserver)
  function initReveal(root = document) {
    const els = root.querySelectorAll(".reveal:not(.is-visible)");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }
  window.initReveal = initReveal;
  initReveal();

  // Smooth scroll untuk anchor (kompensasi navbar sticky)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", id);
  });
})();
