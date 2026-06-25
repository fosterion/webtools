# WebTools

**English** · [Русский](README.ru.md)

A collection of web utilities that run **entirely in the browser** — no backend.
Your data never leaves your device.

Live: https://fosterion.github.io/webtools/

## Stack

- [Vue 3](https://vuejs.org/) + TypeScript (`<script setup>`)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Lightweight, dependency-free i18n (EN / RU) and light/dark themes

## Tools

- **Base64 → File** — decodes base64 / data-URI and saves it as a file.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # build to dist/
npm run preview  # preview the production build
```

## Adding a new tool

1. Create a component in `src/tools/MyTool.vue`.
2. Add an entry to `src/tools/registry.ts` — the route and the home-page card
   are generated automatically.
3. Add its strings under `tools.<id>` in `src/i18n/messages.ts` for each locale.

## Deployment

Pushing to `main` builds and publishes the site to GitHub Pages via GitHub
Actions (`.github/workflows/deploy.yml`). In the repository settings enable
**Settings → Pages → Source: GitHub Actions**.
