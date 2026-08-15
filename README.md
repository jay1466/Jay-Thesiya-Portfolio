<div align="center">

# Jay Thesiya — Java Backend Developer Portfolio

**A modern, professional single-page portfolio built with React, TypeScript, Vite & Framer Motion.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-jaythesiya.me-blue?style=for-the-badge)](https://jaythesiya.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jay--thesiya-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/jay-thesiya)
[![GitHub](https://img.shields.io/badge/GitHub-jay1466-181717?style=for-the-badge&logo=github)](https://github.com/jay1466)

</div>

---

## ✨ Features

- ⚡ **Lightning-fast** — Built with Vite + React + TypeScript
- 🎨 **Premium Dark UI** — Custom design with glassmorphism & Tailwind-free CSS
- 🌀 **Smooth Animations** — Framer Motion scroll-linked 3D section reveals
- 📧 **Functional Contact Form** — EmailJS with spam protection (honeypot + rate limiting)
- 📄 **Resume Download** — One-click PDF download
- 🏆 **Certifications Viewer** — Native image/PDF viewer for certificates
- 🖼️ **Project Gallery** — Project screenshots with modal details
- 📱 **Fully Responsive** — Mobile, tablet & desktop
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- 🔒 **No backend required** — Pure static site

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Animations | Framer Motion (`motion/react`) |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Email | EmailJS |
| Styling | Vanilla CSS + Tailwind (utility-only) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/jay1466/jay-thesiya---java-backend-developer-portfolio.git
cd jay-thesiya---java-backend-developer-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env .env.local
```
Edit `.env.local` and update the EmailJS credentials if needed (see [Configuration](#-configuration)).

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production
```bash
npm run build
```

---

## ⚙️ Configuration

All personal info is stored in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) — just update that file to make it yours.

EmailJS credentials are stored in `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get your free EmailJS credentials at [emailjs.com](https://www.emailjs.com/).

---

## 📁 Project Structure

```
├── public/
│   └── assets/
│       ├── resume/         # Resume PDF
│       ├── certificates/   # Certificate images/PDFs
│       └── projects/       # Project screenshots
├── src/
│   ├── components/         # All UI components
│   ├── data/
│   │   └── portfolioData.ts  # ← Edit this to customize your portfolio
│   ├── types/
│   │   └── portfolio.ts    # TypeScript interfaces
│   └── utils/
│       └── contactHelpers.ts # Email metadata utilities
├── .env                    # Environment variables (never commit!)
└── index.html
```

---

## 📬 Contact

**Jay Thesiya**
- 📧 [thesiyajay54@gmail.com](mailto:thesiyajay54@gmail.com)
- 💼 [linkedin.com/in/jay-thesiya](https://linkedin.com/in/jay-thesiya)
- 🐙 [github.com/jay1466](https://github.com/jay1466)
- 📍 Surat, Gujarat, India

---

<div align="center">
  Built with ❤️ by Jay Thesiya
</div>
