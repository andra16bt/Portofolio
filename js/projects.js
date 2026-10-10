/* projects.js — data project terpusat (3 bidang).
   Menambah project = menambah satu objek di array `projects`.
   Semua isi di bawah adalah [Placeholder]; ganti dengan karya aslimu.

   Field umum (semua bidang):
     id, title, category, year, featured, cover, summary, description,
     role, tools[], gallery[], links[]  -> links: [{ label: "Live Demo", url: "https://..." }]

   Field tambahan per bidang:
     Graphic Design : client     (nama kepanitiaan / event)
     Development    : client     (jenis project, mis. "Personal Project"), features[]
     Data Analytics : dataset    (sumber / deskripsi data), insights[]
*/

const CATEGORIES = {
  "Graphic Design": { slug: "design", color: "pink" },
  Development: { slug: "development", color: "mint" },
  "Data Analytics": { slug: "data", color: "purple" },
};

/* Helper bersama (dipakai di halaman daftar dan halaman detail) */
function categoryOf(p) {
  return CATEGORIES[p.category] || { slug: "design", color: "pink" };
}

const projects = [
  /* ---------- Graphic Design: satu kepanitiaan ---------- */
  // {
  //   id: "pdd-nama-kepanitiaan",
  //   title: "[Nama Kepanitiaan] Design Team",
  //   category: "Graphic Design",
  //   year: 2023,
  //   featured: true,
  //   cover: "assets/images/projects/pdd-kepanitiaan/cover.jpg",
  //   summary: "Instagram feed and visual publications for a school committee.",
  //   description: "I was part of the design team (PDD) of [Nama Kepanitiaan] in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
  //   role: "Design Team (PDD)",
  //   client: "[Nama Kepanitiaan], SMA",
  //   tools: ["Canva", "Photoshop"],
  //   gallery: [
  //     "assets/images/projects/pdd-kepanitiaan/01.jpg",
  //     "assets/images/projects/pdd-kepanitiaan/02.jpg",
  //     "assets/images/projects/pdd-kepanitiaan/03.jpg",
  //     "assets/images/projects/pdd-kepanitiaan/04.jpg"
  //   ],
  //   links: [{ label: "View on Instagram", url: "https://www.instagram.com/" }]
  // },
  {
    id: "pdd-smasa-alteration-festival-2022",
    title: "Smasa Alteration Festival 2022 Design Team",
    category: "Graphic Design",
    year: 2022,
    featured: true,
    cover:
      "assets/images/project-images/design-graphic/safe-2022/safe2022-pp.webp",
    summary: "Instagram feed and visual publications for a school committee.",
    description:
      "I was part of the design team (PDD) of Smasa Alteration Festival 2022 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Smasa Alteration Festival 2022, SMA",
    tools: ["Illustrator", "Photoshop"],
    gallery: [
      "assets/images/project-images/design-graphic/safe-2022/safe2022-01.webp",
      "assets/images/project-images/design-graphic/safe-2022/safe2022-02.webp",
      "assets/images/project-images/design-graphic/safe-2022/safe2022-03.webp",
      "assets/images/project-images/design-graphic/safe-2022/safe2022-04.webp",
    ],
    links: [
      {
        label: "View on Instagram",
        url: "https://www.instagram.com/official_omasbltr/",
      },
    ],
  },

  {
    id: "pdd-pos-2023",
    title: "Pekan Olimpiade Smasa 2023 Design Team",
    category: "Graphic Design",
    year: 2023,
    featured: true,
    cover:
      "assets/images/project-images/design-graphic/pos-2023/pos-2023-pp.webp",
    summary: "Instagram feed and visual publications for a school committee.",
    description:
      "I was part of the design team (PDD) of Pekan Olimpiade Smasa 2023 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Pekan Olimpiade Smasa 2023, SMA",
    tools: ["Illustrator", "Photoshop"],
    gallery: [
      "assets/images/project-images/design-graphic/pos-2023/pos-2023-01.webp",
      "assets/images/project-images/design-graphic/pos-2023/pos-2023-02.webp",
      "assets/images/project-images/design-graphic/pos-2023/pos-2023-03.webp",
    ],
    links: [
      {
        label: "View on Instagram",
        url: "https://www.instagram.com/official_omasbltr/",
      },
    ],
  },

  {
    id: "pdd-schamp-6",
    title: "Smasa Championship 6 Design Team",
    category: "Graphic Design",
    year: 2023,
    featured: true,
    cover:
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-pp.webp",
    summary: "Instagram feed and visual publications for a school committee.",
    description:
      "I was part of the design team (PDD) of Smasa Championship 6 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Smasa Championship 6, SMA",
    tools: ["Illustrator", "Photoshop"],
    gallery: [
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-01.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-02.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-03.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-04.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-05.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-06.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-07.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-08.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-09.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-10.webp",
      "assets/images/project-images/design-graphic/schamp-6/schamp-6-11.webp",
    ],
    links: [
      {
        label: "View on Instagram",
        url: "https://www.instagram.com/schamp_official/",
      },
    ],
  },

  {
    id: "pdd-diesnatalis-68",
    title: "Dies Natalis 68 Design Team",
    category: "Graphic Design",
    year: 2023,
    featured: true,
    cover:
      "assets/images/project-images/design-graphic/dies-natalis-68/dies-natalis-68-pp.webp",
    summary: "Instagram feed and visual publications for a school committee.",
    description:
      "I was part of the design team (PDD) of Dies Natalis 68 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Dies Natalis 68, SMA",
    tools: ["Illustrator", "Photoshop"],
    gallery: [
      "assets/images/project-images/design-graphic/dies-natalis-68/dies-natalis-68-01.webp",
      "assets/images/project-images/design-graphic/dies-natalis-68/dies-natalis-68-02.webp",
      "assets/images/project-images/design-graphic/dies-natalis-68/dies-natalis-68-03.webp",
    ],
    links: [
      {
        label: "View on Instagram",
        url: "https://www.instagram.com/dn71smasa/",
      },
    ],
  },

  {
    id: "tim-sosmed-fotografi-smasa",
    title: "Fotografi Smasa Sosial Media",
    category: "Graphic Design",
    year: 2024,
    featured: true,
    cover:
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-pp.webp",
    summary:
      "Instagram feed and visual publications for a Fotografi Smasa Extracuricular.",
    description:
      "I was part of the Sosial Media Team of Fotografi Smasa in high school. We created the Instagram feed, announcements, and other visual publications for the Sosial Media.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Media Sosial Team",
    client: "Sosial Media Team, SMA",
    tools: ["Photoshop", "Lightroom"],
    gallery: [
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-01.webp",
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-02.webp",
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-03.webp",
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-04.webp",
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-05.webp",
      "assets/images/project-images/design-graphic/fotografi-smasa/fotografi-smasa-06.webp",
    ],
    links: [
      {
        label: "View on Instagram",
        url: "https://www.instagram.com/fotografismasa/",
      },
    ],
  },
  {
    id: "smasa-alteration-festival-2023",
    title: "Smasa Alteration Festival 2023 Design Team",
    category: "Graphic Design",
    year: 2023,
    featured: true,
    cover: "assets/images/project-images/design-graphic/safe-2023/safe-2023-pp.webp",
    summary: "Instagram feed and visual publications for a classmeet event.",
    description: "I was part of the design team (PDD) of Smasa Alteration Festival 2023 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Smasa Alteration Festival 2023, SMA",
    tools: ["Canva", "Photoshop", "Illustrator", "Lightroom"],
    gallery: [
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-01.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-03.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-02.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-08.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-05.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-07.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-04.webp",
      "assets/images/project-images/design-graphic/safe-2023/safe-2023-06.webp",
    ],
    links: [{ label: "View on Instagram", url: "https://www.instagram.com/official_omasbltr/" }]
  },
  {
    id: "schamp-7",
    title: "Smasa Championship 7 Design Team",
    category: "Graphic Design",
    year: 2024,
    featured: true,
    cover: "assets/images/project-images/design-graphic/schamp-7/schamp-7-pp.webp",
    summary: "Instagram feed and visual publications for a sport event.",
    description: "I was part of the design team (PDD) of Smasa Championship 7 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Smasa Championship 7, SMA",
    tools: ["Canva", "Photoshop", "Illustrator", "Lightroom"],
    gallery: [
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-03.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-05.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-08.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-09.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-07.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-10.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-11.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-04.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-06.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-12.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-02.webp",
      "assets/images/project-images/design-graphic/schamp-7/schamp-7-13.webp",
    ],
    links: [{ label: "View on Instagram", url: "https://www.instagram.com/" }]
  },

  {
    id: "dies-natalis-69",
    title: "Dies Natalis 69 Design Team",
    category: "Graphic Design",
    year: 2024,
    featured: true,
    cover: "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-pp.webp",
    summary: "Instagram feed and visual publications for a school dies natalis event.",
    description: "I was part of the design team (PDD) of Dies Natalis 69 in high school. We created the Instagram feed, announcements, and other visual publications for the event.\n\nThis page keeps the pieces I still have from that time. The original brand files are no longer available, but the feed posts show the visual direction we used.",
    role: "Design Team (PDD)",
    client: "Dies Natalis 69, SMA",
    tools: ["Canva", "Photoshop", "Illustrator", "Lightroom"],
    gallery: [
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-01.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-09.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-07.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-04.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-08.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-02.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-05.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-03.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-10.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-06.webp",
      "assets/images/project-images/design-graphic/dies-natalis-69/dies-natalies-69-11.webp",
    ],
    links: [{ label: "View on Instagram", url: "https://www.instagram.com/dn71smasa/" }]
  },

  /* ---------- Development ---------- */
  // {
  //   id: "task-manager-web",
  //   title: "Task Manager Web App",
  //   category: "Development",
  //   year: 2026,
  //   featured: true,
  //   cover: "assets/images/projects/task-manager/cover.jpg",
  //   summary:
  //     "A simple to-do web app with local storage, built with vanilla JavaScript.",
  //   description:
  //     "A small web app to add, finish, and filter daily tasks. I built it without any framework to practice DOM manipulation, state handling, and responsive layout.\n\nThe data is saved in the browser, so tasks are still there after a refresh.",
  //   role: "Solo Developer",
  //   client: "Personal Project",
  //   tools: ["HTML", "CSS", "JavaScript"],
  //   features: [
  //     "Add, edit, complete, and delete tasks",
  //     "Filter by all, active, and done",
  //     "Data saved in localStorage",
  //     "Responsive layout for mobile and desktop",
  //   ],
  //   gallery: [
  //     "assets/images/projects/task-manager/01.jpg",
  //     "assets/images/projects/task-manager/02.jpg",
  //   ],
  //   links: [
  //     { label: "Live Demo", url: "https://example.com/" },
  //     { label: "GitHub", url: "https://github.com/" },
  //   ],
  // },
  {
    id: "aksi-kita-uiux-final-project",
    title: "Aksi Kita UI/UX Design",
    category: "Development",
    year: 2026,
    featured: true,
    cover: "assets/images/project-images/development/aksi-kita/aksi-kita-pp.webp",
    summary:
      "Website prototype designed from user research to high-fidelity screens.",
    description:
      "Final project of my UI/UX course. We designed Aksi Kita, from understanding the users to testing a clickable prototype.\n\nThis website is a donation platform where everyone can help one another. It supports a wide range of payment methods, making it easy for users to make donations. ",
    role: "UI/UX Designer",
    client: "Course Project",
    tools: ["Figma"],
    features: [
      "User research and persona",
      "User flow and wireframes",
      "High-fidelity screens and clickable prototype",
      "Usability testing with [n] users",
    ],
    gallery: [
      "assets/images/project-images/development/aksi-kita/aksi-kita-01.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-02.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-03.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-04.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-05.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-06.webp",
      "assets/images/project-images/development/aksi-kita/aksi-kita-07.webp",
    ],
    links: [{ label: "View Prototype", url: "https://www.figma.com/design/S1sA8KLVKVs3CgRU9E3DQm/wireframe?node-id=1-2&t=EjLsXhswo4deC3JU-1" }],
  },
      {
    id: "money-manager-web",
    title: "Money Manager Web App",
    category: "Development",
    year: 2026,
    featured: true,
    cover: "assets/images/project-images/development/dompet-kampus/dompet-kampus-pp.webp",
    summary:
      "A retro 8-bit expense tracker for students, where your monthly allowance becomes an HP bar that drains as you spend.",
    description:
      "Dompet Kampus helps students track their allowance in a playful way. You set a monthly budget, log every expense under one of five categories, and watch your HP bar change from safe to warning to danger as your money runs low. It also shows a category breakdown and daily spending tips.\n\nI built it with vanilla JavaScript and no frameworks to practice DOM manipulation, state handling, and responsive layout. To make it feel like a game, I added two pixel-art cats that walk, jump, climb, and can be dragged and thrown around the page, a Coin Run intro animation, custom pixel cursors, and 8-bit sound effects generated with the Web Audio API. All data is saved in the browser, so nothing is lost after a refresh.",
    role: "Solo Developer",
    client: "Personal Project",
    tools: ["HTML", "CSS", "JavaScript", "Web Audio API", "Canvas", "Vercel"],
    features: [
      "Set a monthly budget and log expenses in five categories",
      "HP bar that shows how safe your remaining budget is",
      "Category breakdown and daily spending tips",
      "Data saved in localStorage, no account needed",
      "Two pixel cats that walk, jump, climb, and can be dragged and thrown (desktop)",
      "Coin Run intro animation and 8-bit sound effects with a mute button",
      "Responsive layout for mobile and desktop",
    ],
    gallery: [
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-06.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-01.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-02.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-07.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-03.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-04.webp",
      "assets/images/project-images/development/dompet-kampus/dompet-kampus-05.webp",
    ],
    links: [
      { label: "Live Demo", url: "https://dompet-kampus.vercel.app/" },
      { label: "GitHub", url: "https://github.com/andra16bt/dompet-kampus-money-management" },
    ],
  },


  /* ---------- Data Analytics (masih belajar) ---------- */
  {
    id: "student-spending-analysis",
    title: "Student Spending Analysis",
    category: "Data Analytics",
    year: 2026,
    featured: true,
    cover: "assets/images/projects/student-spending/cover.jpg",
    summary:
      "A beginner analysis of monthly spending habits from a student survey.",
    description:
      "A learning project where I cleaned a small survey dataset and looked for patterns in how students spend their monthly allowance. I'm still a beginner in data, so this project focuses on the basics: cleaning, summarizing, and visualizing.",
    role: "Analyst (Learning Project)",
    client: "Personal Project",
    dataset: "Student survey, [n] respondents (Google Forms)",
    tools: ["Excel", "Python (pandas)"],
    insights: [
      "Food is the largest spending category for most respondents",
      "Spending peaks at the end of the month for [group]",
      "[Add your own finding here]",
    ],
    gallery: [
      "assets/images/projects/student-spending/01.jpg",
      "assets/images/projects/student-spending/02.jpg",
    ],
    links: [{ label: "View Notebook", url: "https://github.com/" }],
  },
  {
    id: "sales-dashboard-practice",
    title: "Sales Dashboard (Practice)",
    category: "Data Analytics",
    year: 2026,
    featured: true,
    cover: "assets/images/projects/sales-dashboard/cover.jpg",
    summary: "A practice dashboard built from a public sample sales dataset.",
    description:
      "A practice dashboard to learn how to turn a raw table into charts that answer simple business questions, such as which product sells the most and how sales change over time.",
    role: "Analyst (Learning Project)",
    client: "Self Study",
    dataset: "Public sample sales dataset ([source])",
    tools: ["SQL", "Excel"],
    insights: [
      "Top 3 products make up most of the revenue",
      "[Add your own finding here]",
    ],
    gallery: [
      "assets/images/projects/sales-dashboard/01.jpg",
      "assets/images/projects/sales-dashboard/02.jpg",
    ],
    links: [],
  },
];
