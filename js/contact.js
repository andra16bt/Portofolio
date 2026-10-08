/* contact.js — validasi sisi klien + submit via Formspree (opsional) */

// [Placeholder] Isi dengan endpoint Formspree-mu, mis. "https://formspree.io/f/xxxxxxx".
// Jika dikosongkan, form akan membuka aplikasi email lewat mailto: sebagai fallback.
const FORM_ENDPOINT = "";
const MAILTO_TO = "hello@example.com"; // [Placeholder]

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  const rules = {
    name: (v) => (v.trim() ? "" : "Please enter your name."),
    email: (v) => {
      if (!v.trim()) return "Please enter your email.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address.";
    },
    message: (v) => (v.trim() ? "" : "Please write a message.")
  };

  function setStatus(type, text) {
    status.className = "form__status" + (type ? " is-" + type : "");
    status.textContent = text || "";
  }

  function validateField(input) {
    const field = input.closest(".field");
    const err = rules[input.name](input.value);
    field.classList.toggle("has-error", Boolean(err));
    field.querySelector(".field__error").textContent = err;
    input.setAttribute("aria-invalid", err ? "true" : "false");
    return !err;
  }

  form.querySelectorAll("input, textarea").forEach((el) =>
    el.addEventListener("blur", () => validateField(el))
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll("input, textarea")];
    const ok = inputs.map(validateField).every(Boolean);
    if (!ok) {
      setStatus("error", "Please fix the highlighted fields and try again.");
      return;
    }

    const data = Object.fromEntries(new FormData(form));

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${MAILTO_TO}?subject=${subject}&body=${body}`;
      setStatus("success", "Opening your email app… If nothing happens, email me directly.");
      return;
    }

    setStatus("loading", "Sending…");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success", "Thanks! Your message has been sent.");
    } catch (err) {
      setStatus("error", "Something went wrong. Please try again or use the email link.");
    }
  });
})();
