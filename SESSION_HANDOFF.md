# Portfolio Project Handoff & Architecture Context

> **Date:** October 8, 2026  
> **Repository:** [AlvaroChuan/AlvaroChuan.github.io](https://github.com/AlvaroChuan/AlvaroChuan.github.io)  
> **Active Branch:** `main` (Legacy backup branch: `legacy-v1`)  
> **Author:** Álvaro Chuan Díaz-Maroto (*Hollowblink*)  
> **Live Site:** [https://alvarochuan.github.io](https://alvarochuan.github.io)  

---

## 1. Project Overview & Tech Stack

This repository is a modern, high-performance developer portfolio built with:
- **Framework:** [Astro 5](https://astro.build) (Static Site Generation / SSG mode)
- **UI & Islands:** [React 19](https://react.dev) (`@astrojs/react`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- **Content Engine:** Astro Content Collections (`astro:content`) using MDX (`@astrojs/mdx`)
- **Icons:** Custom SVG components + [Lucide React](https://lucide.dev)
- **Deployment:** Automated CI/CD via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages

---

## 2. Developer Profile & Branding Context

- **Name:** Álvaro Chuan Díaz-Maroto (*Hollowblink*)
- **Title:** Game & Tools Engineer | PhD Researcher | Co-Founder @ BackToBits Studio
- **Studio:** [BackToBits Studio](https://backtobitsstudio.com)
- **Affiliation:** PhD Student at **Universitat Jaume I (UJI)**, research member of **INIT** (Institute of New Image Technologies) and **GameRS** (Game Research Group).
- **Specializations:**
  - Procedural Content Generation (PCG) & constraint-satisfaction algorithms (3D Wave Function Collapse, Bézier spline mesh extrusion).
  - Custom game engine tooling, editor gizmos, and authoring palettes in Unity (C# / HLSL) and Unreal Engine (C++ / HLSL).
  - Tactile gameplay mechanics, raycast vehicle physics, deterministic grid logic, and responsive game feel / juice.

---

## 3. Directory Layout & Key Modules

```text
AlvaroChuan.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages CI/CD workflow (Node 22, npm ci, astro build)
├── public/
│   ├── .nojekyll                # Bypasses Jekyll processing on GitHub Pages
│   ├── favicon.ico              # Multi-resolution ICO (16-256px) generated from logo.png
│   ├── assets/
│   │   ├── logo.png             # Official Álvaro Chuan / Hollowblink brand logo (1920x1920)
│   │   ├── avatar.png           # Profile photo
│   │   ├── CV-EN-2026.pdf       # Curriculum Vitae (English)
│   │   ├── bachelor-thesis.pdf  # Full Bachelor's Thesis PDF (UJI Honors, 11.9 MB)
│   │   └── projects/            # Optimized project banners (.jpg, .png, .webp) and .mp4 clips
├── src/
│   ├── content/
│   │   └── projects/            # MDX case studies for every game and tool (see list below)
│   ├── components/
│   │   ├── Header.astro         # Top navigation bar with logo, links, and status
│   │   ├── Footer.astro         # Footer with social links & dedicated brand SVGs
│   │   ├── Icons.astro          # Shared Astro SVG icon system (Steam, itch.io, Unity, etc.)
│   │   ├── ProjectShowcase.tsx  # React island: filter tabs, project grid, hover video previews,
│   │   │                        # and "Inspect" line with dedicated brand icon buttons
│   │   └── WfcSolver.tsx        # React island: interactive 2D Wave Function Collapse canvas demo
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML document, SEO meta, open-graph, fonts, favicons
│   ├── pages/
│   │   ├── index.astro          # Main landing page (Hero, Arsenal, Showcase, Academic Research)
│   │   └── projects/
│   │       └── [...slug].astro  # Dynamic SSG route for each project case study
│   ├── styles/
│   │   └── global.css           # Global Tailwind v4 styles, custom typography & .project-prose
│   └── content.config.ts        # Strict Zod schema for project content collection
├── astro.config.mjs             # Astro config: site, integrations (react, mdx, tailwindcss)
├── package.json                 # Dependencies and npm build/dev scripts
└── .gitignore                   # Ignores dist/, .astro/, node_modules/, OS & editor artifacts
```

---

## 4. Current Projects Roster & Schema

All project data lives in `src/content/projects/*.mdx`. The Zod schema in `src/content.config.ts` enforces:

```typescript
schema: z.object({
  title: z.string(),
  subtitle: z.string(),
  category: z.enum(['tools', 'gameplay', 'research']),
  order: z.number().default(99),
  featured: z.boolean().default(false),
  tags: z.array(z.string()),
  engine: z.string(),
  language: z.string(),
  role: z.string(),
  timeline: z.string().optional(),
  links: z.object({
    steam: z.string().optional(),
    itch: z.string().optional(),
    github: z.string().optional(),
    paper: z.string().optional(),
    demo: z.string().optional(),
    studio: z.string().optional(),
    video: z.string().optional(),
    assetStore: z.string().optional(),
  }).optional(),
  image: z.string(),
  video: z.string().optional(),
  previewGif: z.string().optional(),
  gallery: z.array(z.string()).optional(),
})
```

### Active Projects List

| Order | Slug | Title | Category | Engine | Key Links |
|:---:|---|---|---|---|---|
| **1** | `k-boom.mdx` | **K-Boom!** | Gameplay | Unity (C#) | Steam, Demo, itch.io, Video, Studio |
| **2** | `goblinmancer.mdx` | **GoblinMancer** | Gameplay | Unity (C#) | Steam, itch.io, Video, Studio |
| **3** | `one-last-delivery.mdx` | **One Last Delivery** | Gameplay | Unity (C#) | Studio |
| **4** | `wfc-tool.mdx` | **Wave Function Collapse Tool** | Tools | Unreal Engine & C++ | GitHub, Thesis PDF, Video |
| **5** | `procedural-spline-tool.mdx` | **Procedural Spline Tool** | Tools | Unity (C# / HLSL) | Asset Store, CEIG Paper, Video |
| **6** | `k-boom-level-editor.mdx` | **K-Boom! In-Engine Level Editor** | Tools | Unity (C#) | Steam, Studio |
| **7** | `system-scape.mdx` | **System Scape** | Gameplay | Unity (C#) | GitHub, Thesis PDF |
| **8** | `gauntlet-remastered.mdx` | **Gauntlet Remastered** | Gameplay | Unity / UE5 / Godot | itch.io |
| **9** | `project-rush.mdx` | **Project: Rush!** | Gameplay | Unity (C#) | itch.io |
| **10** | `prop-trip.mdx` | **Prop Trip** | Gameplay | Unity (C#) | itch.io |
| **11** | `growing-fear.mdx` | **Growing Fear** | Gameplay | Unity (C#) | itch.io |
| **12** | `step-by-step.mdx` | **Step By Step** | Gameplay | Unity (C#) | itch.io |
| **13** | `factory-wars.mdx` | **Factory Wars** | Gameplay | Nintendo DS (C) | itch.io |
| **14** | `watermelon-quest.mdx` | **Watermelon Quest** | Gameplay | Unity (C#) | GitHub |

*(Note: `synthwave-maniac` was intentionally removed by the user in the latest iteration).*

---

## 5. Design Guidelines & Formatting Mandates

1. **Standardized 3-Section Case Study Structure:**
   Every `.mdx` file strictly follows this sequence:
   - `## Summary`
   - `## Responsibilities`
   - `## Current Status & Reception`
   *(Do NOT introduce placeholder code blocks or ASCII diagrams unless explicitly instructed with verified production snippets).*

2. **Dynamic Thesis vs. Paper Detection:**
   In both `ProjectShowcase.tsx` and `[...slug].astro`, links containing `"thesis"` dynamically display **"Bachelor's Thesis"** (with book icon). Links to peer-reviewed conference publications display **"Research Paper"**.

3. **Dedicated Brand Quick-Action Buttons:**
   On showcase cards, external quick links are positioned on the bottom "Inspect" line with authentic SVG icons:
   - **Steam:** `#66c0f4` hover accent
   - **itch.io:** `#fa5c5c` hover accent
   - **Unity Asset Store:** White hover accent
   - **GitHub:** White hover accent
   - **Research Paper / Thesis:** `#a78bfa` hover accent
   - **Play Demo:** `#00e5ff` hover accent
   - **Video:** `#ff0000` hover accent
   - **Studio:** `#f5005f` hover accent
   All buttons execute `e.stopPropagation()` and `e.preventDefault()` so clicking an external link opens a new tab without navigating to the internal case study.

4. **Image & Performance Optimization:**
   - Above-the-fold hero images use `loading="eager"` and `fetchpriority="high"`.
   - Off-screen images use `loading="lazy"` and `decoding="async"`.
   - Favicon is a custom multi-size `.ico` directly created from `public/assets/logo.png`. The default Astro rocket `.svg` has been removed.

---

## 6. Development & Deployment Workflow

### Local Development (Windows / PowerShell)

Per workspace rules, use background mode for the dev server:

```powershell
# Start dev server
astro dev --background

# Server controls
astro dev status
astro dev logs
astro dev stop
```

When running build commands locally via PowerShell:
```powershell
# Use npm.cmd or npx.cmd on Windows to bypass PowerShell script execution restrictions
npm.cmd run build
```

### GitHub Pages Deployment

- **Workflow:** `.github/workflows/deploy.yml` triggers automatically on push to `main`.
- **Pages Setting:** In GitHub repository **Settings** &rarr; **Pages**, ensure **Source** is set to **GitHub Actions**.
- **URL:** The site builds directly to `https://alvarochuan.github.io/`.

---

## 7. Useful Links & References

- GitHub Repo: [https://github.com/AlvaroChuan/AlvaroChuan.github.io](https://github.com/AlvaroChuan/AlvaroChuan.github.io)
- Legacy Backup Branch: [https://github.com/AlvaroChuan/AlvaroChuan.github.io/tree/legacy-v1](https://github.com/AlvaroChuan/AlvaroChuan.github.io/tree/legacy-v1)
- BackToBits Studio: [https://backtobitsstudio.com](https://backtobitsstudio.com)
- Astro Documentation: [https://docs.astro.build](https://docs.astro.build)
