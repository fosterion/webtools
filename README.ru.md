# WebTools

[English](README.md) · **Русский**

Набор веб-утилит, работающих **полностью в браузере** — без серверной части.
Данные не покидают устройство пользователя.

Живая версия: https://fosterion.github.io/webtools/

## Стек

- [Vue 3](https://vuejs.org/) + TypeScript (`<script setup>`)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Лёгкий i18n без зависимостей (EN / RU) и светлая/тёмная темы

## Инструменты

- **Base64 → File** — декодирует base64 / data-URI и сохраняет как файл.

## Разработка

```bash
npm install
npm run dev      # локальный сервер разработки
npm run build    # сборка в dist/
npm run preview  # предпросмотр собранной версии
```

## Добавить новый инструмент

1. Создайте компонент в `src/tools/MyTool.vue`.
2. Добавьте запись в `src/tools/registry.ts` — роут и карточка на главной
   создаются автоматически.
3. Добавьте его строки в `src/i18n/messages.ts` под ключом `tools.<id>` для
   каждого языка.

## Деплой

Пуш в `main` автоматически собирает и публикует сайт на GitHub Pages через
GitHub Actions (`.github/workflows/deploy.yml`). В настройках репозитория
включите **Settings → Pages → Source: GitHub Actions**.
