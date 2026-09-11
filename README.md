<p align="center">
  <img src="public/brand-logo.png" alt="GitLens Logo" width="80" height="80" />
</p>

<h1 align="center">GitLens</h1>

<p align="center">
  <strong>A modern GitHub profile analyzer and developer comparison tool.</strong><br />
  Explore language breakdowns, follow public activity, benchmark developers side-by-side, and export custom dev cards.
</p>

<p align="center">
  <a href="https://imranpollob.github.io/github-profile-analyzer/"><strong>Explore Live Demo →</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-TypeScript-0d9488?style=flat-square&logo=react&logoColor=white" alt="React 18 & TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-0f766e?style=flat-square&logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/TanStack_Query-v5-14b8a6?style=flat-square" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="MIT License" />
</p>

---

## Overview

GitLens makes it effortless to analyze any GitHub profile and get a complete picture of an engineer's open-source footprint. Built entirely on the client side, it connects directly to GitHub's REST API to calculate stats, chart language distributions, track live public contributions, and compare developers head-to-head.

---

## ✨ Features

- **📊 Comprehensive Profile Insights**: Aggregates total stars, forks, repositories, and account milestones alongside interactive language breakdowns.
- **⚔️ Head-to-Head Comparison (`/compare`)**: Benchmark any two GitHub developers across key stats with clear metric leaders.
- **⚡ Live Activity Timeline**: Follow recent public commits, pull requests, issues, releases, and stars in real time.
- **🔍 Fast Repository Explorer**: Instant client-side search across repositories with fork filters, topic tags, and sorting.
- **📇 Shareable Dev Cards**: Export downloadable SVG stats cards and copy-ready Markdown badges for GitHub profile READMEs.
- **🌓 Dark & Light Modes**: Seamless theme switching with system preference detection and smooth transitions.
- **📱 Fully Responsive & SEO Optimized**: Designed for mobile and desktop alike, with full OpenGraph, Twitter card, and meta tag coverage.

---

## 🛠️ Tech Stack

| Layer                   | Technology                                                             |
| :---------------------- | :--------------------------------------------------------------------- |
| **Frontend**            | React 18, TypeScript                                                   |
| **Build & Tooling**     | Vite 5, Rollup (manual chunk splitting)                                |
| **Data Fetching**       | TanStack Query v5 (caching & background revalidation)                  |
| **Routing**             | React Router v6 (with SPA routing fallback for GitHub Pages)           |
| **Data Visualization**  | Recharts                                                               |
| **Design & Typography** | CSS Variables, Lucide React, Google Fonts (Outfit & Plus Jakarta Sans) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed.

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/imranpollob/github-profile-analyzer.git
cd github-profile-analyzer

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` to explore GitLens.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

Distributed under the MIT License. Data powered by the public [GitHub REST API](https://docs.github.com/en/rest).
