# Portfolio Website (Neo-Brutalism)

HTML + CSS + vanilla JS, tanpa framework. Buka `index.html` di browser (atau pakai Live Server).

## Yang perlu kamu ganti
- Nama, monogram, email, link sosmed: `js/components.js` (objek `SITE`) dan teks di `index.html`
- Data project: `js/projects.js` (tambah project = tambah satu objek)
- Foto: `assets/images/profile/profile.jpg` dan `about.jpg`
- Gambar project: `assets/images/projects/<slug>/cover.jpg`, `01.jpg`, `02.jpg` (jika belum ada, tampil placeholder berwarna)
- CV: taruh PDF di `assets/cv/CV-NamaKamu.pdf`
- Form kontak: isi `FORM_ENDPOINT` di `js/contact.js` (Formspree). Kosong = fallback `mailto:`
- OG image: `assets/images/og-image.jpg` (1200x630)
