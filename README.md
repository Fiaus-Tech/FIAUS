<p align="center">
  <img src="client/public/assets/logo.jpeg" alt="FIAUS Tech Logo" width="120" style="border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);" />
</p>

<h1 align="center">FIAUS Tech — Digital & AI Agency</h1>

<p align="center">
  <strong>“Innovate. Automate. Grow.”</strong>
</p>

<p align="center">
  A production-ready, full-stack digital platform engineered for <strong>FIAUS Tech</strong> — a premier international Digital & AI Agency delivering bespoke web engineering, autonomous AI workflows, and cloud architectures for clients in <strong>Saudi Arabia</strong>, <strong>Bangladesh</strong>, and <strong>worldwide</strong>.
</p>

<p align="center">
  <a href="https://fiaus.tech"><img src="https://img.shields.io/badge/Website-fiaus.tech-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" /></a>
  <a href="https://wa.me/966511269264"><img src="https://img.shields.io/badge/WhatsApp-+966_51_126_9264-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-3D_Visuals-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
</p>

---

## 🌟 Architectural & Feature Highlights

### 1. 🎨 Visual Identity & Luxury Theme System
- **Design Tokens**: Dominant Pure White in Light Mode, Deep Slate Navy (`#0B1120`, `#0F172A`) in Dark Mode, and Royal Blue (`#2563EB`) accenting.
- **Persistent Theme Engine**: Smooth transitions with real-time `localStorage` state retention.
- **Bilingual & Native RTL**: Seamless switching between English (LTR with *Plus Jakarta Sans*) and Arabic (RTL with *Cairo* & *Tajawal* typography and mirrored layouts).

### 2. 🌌 Interactive 3D Hero Visualizer
- **Three.js Particle Constellation**: Real-time neural network canvas featuring dynamic mouse tracking, touch gyroscopes, and automatic mobile performance throttling.

### 3. 📂 Sequential Real Case Studies (`PROJECT 01` — `PROJECT 05`)
Dynamic alternating project showcases with automated two-digit numbering (`01`, `02`...), tech badges, GitHub repositories, and fullscreen screenshot gallery modals:
1. **[ACC EST](https://acc-est.vercel.app/)** — Enterprise Corporate Web Platform ([GitHub](https://github.com/fahad1420/ACC-EST))
2. **[Rabiora E-Commerce](https://rabiora-ecommerce.vercel.app/)** — Full-Stack E-Commerce & Subscription Architecture ([GitHub](https://github.com/fahad1420/rabiora-ecommerce))
3. **[TECH-GURD](https://tech-gurd.vercel.app/)** — Security & Browser Ad-Blocking Platform ([GitHub](https://github.com/fahad1420/TECH-GURD))
4. **[Current Ache BD](https://current-ache-iota.vercel.app/)** — National Power & Energy Telemetry Platform ([GitHub](https://github.com/fahad1420/Current-Ache-))
5. **AMA Specialty Coffee** — Artisanal Brand Web Experience ([GitHub](https://github.com/fahad1420/ama-specialty-coffee) | Private / In Active Dev)

### 4. 🧠 Dedicated Service & Capability Portals
- **[AI & Automation (`/ai-solutions`)](http://localhost:5173/ai-solutions)**: Comprehensive breakdown of Autonomous AI Agents, Enterprise RAG Knowledge Bases, WhatsApp Cloud API Chatbots, Business Process Automation (BPA), and ROI frameworks.
- **[9-Phase Engineering Process (`/process`)](http://localhost:5173/process)**: Transparent roadmap from Discovery, Strategy, Planning, UI/UX, Development, QA, Cloud Launch to Ongoing Optimization.
- **[Knowledge Base / FAQ (`/faq`)](http://localhost:5173/faq)**: Filterable, searchable FAQ catalog with bilingual accordions.
- **[Engineering Blog & Insights (`/blog`)](http://localhost:5173/blog)**: Full-featured publication platform with category filtering and single article readers (`/blog/:slug`).

### 5. 💼 Inbound Lead Acquisition & CRM
- **"Start a Project" Modal & Page**: Multi-step qualification wizard capturing Name, Email, WhatsApp, Country, Budget, Service Needed, and Project Brief.
- **Multi-Channel Contact Integration**: Direct WhatsApp click-to-chat (`+966 51 126 9264`), Email (`fiaustech@hotmail.com`), Telegram, and 9 verified social channels.

### 6. 🛡️ Protected Admin Dashboard & CMS
- **Secure JWT Authentication**: Role-based access with bcrypt password encryption.
- **Leads CRM Pipeline**: Track inquiries from `New` $\to$ `Contacted` $\to$ `In Discussion` $\to$ `Proposal Sent` $\to$ `Won`/`Lost` with internal team note logging.
- **Full CMS Modules**: Live CRUD for FAQs, Team Directory, Client Testimonials, Projects, Capabilities, and Blog Articles.
- **Settings & SEO Configurator**: Dynamic management of contact details, meta tags, and analytics IDs (Google Analytics 4, Meta Pixel, Microsoft Clarity).

### 7. ⚡ Dual-Layer Persistence Architecture
- Seamless automatic database switching: Queries **MongoDB** when connected, with zero-downtime fallback to an optimized local **JSON file store** (`server/data/`) when running offline or in standalone development mode.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router 6, Framer Motion, Lucide Icons |
| **3D & Graphics** | Three.js (WebGL Particle Constellation Canvas) |
| **Styling** | Tailwind CSS 3.4, PostCSS, Custom Design System Tokens |
| **Backend** | Node.js (v20+), Express.js, Helmet, CORS, Express Rate Limit |
| **Database & Store** | MongoDB, Mongoose, Resilient JSON Store Fallback |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Localization** | Custom Context Engine supporting English (LTR) & Arabic (RTL) |
| **Deployment** | Vercel Serverless Ready (`vercel.json`), Docker Compatible |

---

## 📁 Project Structure

```text
fiaus-tech/
├── client/                     # Frontend Application (Vite + React)
│   ├── public/                 # Static Assets, Favicon, Robots.txt, Sitemap.xml
│   │   └── assets/             # Brand Logo & 26 Project Screenshots
│   │       ├── logo.jpeg
│   │       └── projects/       # Organized Project Asset Folders (p1-p5)
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/             # Three.js 3D Hero Scene
│   │   │   ├── common/         # Modals (Project Gallery, Start Project)
│   │   │   ├── home/           # Homepage Sections (Hero, Projects, Services, etc.)
│   │   │   └── layout/         # Navbar, Footer, AdminLayout
│   │   ├── context/            # ThemeContext, LanguageContext, AuthContext
│   │   ├── i18n/               # English & Arabic Translation Dictionaries
│   │   ├── pages/              # Public & Admin Page Views
│   │   │   ├── admin/          # Admin Dashboard, Leads CRM, CMS, Settings
│   │   │   ├── AISolutionsPage.jsx
│   │   │   ├── BlogPostPage.jsx
│   │   │   ├── FAQPage.jsx
│   │   │   ├── ProcessPage.jsx
│   │   │   └── ...
│   │   ├── services/           # Axios API Client & Endpoints
│   │   ├── App.jsx             # React Router Configuration
│   │   ├── main.jsx            # Application Entry Point
│   │   └── index.css           # Global Tailwind Tokens & Custom Utilities
│   ├── index.html              # SEO Meta, Cairo & Jakarta Google Fonts
│   └── vite.config.js          # Vite Server & Proxy Configuration
│
├── server/                     # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Database Connection (MongoDB)
│   │   ├── controllers/        # Auth, Projects, Leads, Services, CMS, Settings
│   │   ├── middleware/         # JWT Auth, Error Handler, Multer File Upload
│   │   ├── models/             # Mongoose Schemas (Admin, Lead, Project, FAQ, etc.)
│   │   ├── routes/             # Express API Endpoints
│   │   ├── utils/              # Resilient JSON Store & Seed Utilities
│   │   └── server.js           # Server Initialization & Middlewares
│   └── .env.example            # Environment Configuration Template
│
├── .gitignore                  # Git Ignore Rules
├── vercel.json                 # Vercel Full-Stack Deployment Config
└── README.md                   # Documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MongoDB** *(Optional — system automatically activates JSON persistence if MongoDB is not running)*

### 1. Clone the Repository
```bash
git clone https://github.com/Fiaus-Tech/FIAUS.git
cd FIAUS
```

### 2. Install Dependencies
Install all root, server, and client dependencies:
```bash
npm install
npm run install:all
```

### 3. Configure Environment Variables
Create `.env` inside the `server/` directory:
```bash
cp server/.env.example server/.env
```
*(Default settings work out of the box for local development)*

### 4. Launch Development Servers
Run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 🔑 Admin Credentials

| Parameter | Value |
|---|---|
| **Login URL** | [http://localhost:5173/admin/login](http://localhost:5173/admin/login) |
| **Default Email** | `admin@fiaus.tech` |
| **Default Password** | `FiausTech2026!Admin` |

---

## 📱 Mobile Testing
To view and test on a smartphone connected to the same local Wi-Fi:
```text
http://<YOUR_LOCAL_IP>:5173
```
*(e.g., `http://192.168.3.120:5173`)*

---

## 🌐 Official Agency Links

- **Website**: [https://fiaus.tech](https://fiaus.tech)
- **Email**: [fiaustech@hotmail.com](mailto:fiaustech@hotmail.com)
- **WhatsApp**: [+966 51 126 9264](https://wa.me/966511269264)
- **Telegram**: [@fiaustech](https://t.me/fiaustech)
- **LinkedIn**: [FIAUS Tech](https://www.linkedin.com/in/fiaus-tech)
- **GitHub**: [Fiaus-Tech](https://github.com/Fiaus-Tech)
- **X (Twitter)**: [@fiaus_tech](https://x.com/fiaus_tech)
- **Instagram**: [@fiaustech](https://instagram.com/fiaustech)
- **Facebook**: [fiaustech](https://facebook.com/fiaustech)
- **YouTube**: [@FiausTech](https://youtube.com/@FiausTech)

---

<p align="center">
  <sub>© 2026 FIAUS Tech. All Rights Reserved. Designed & Engineered with Precision.</sub>
</p>
