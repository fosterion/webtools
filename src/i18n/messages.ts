export type Locale = 'en' | 'ru'

export const locales: Locale[] = ['en', 'ru']

// Translation dictionaries. Keys are addressed by dotted path, e.g.
// t('home.title') or t('tools.base64-to-file.errors.empty').
export const messages = {
  en: {
    nav: {
      tools: 'Tools',
      toLight: 'Light theme',
      toDark: 'Dark theme',
    },
    home: {
      badge: '100% in your browser · data never leaves',
      title: 'Web tools',
      subtitle: 'Small everyday utilities. Fast, private, no install.',
      open: 'Open',
    },
    tools: {
      'base64-to-file': {
        title: 'Base64 → File',
        description: 'Decode base64 (or a data-URI) and download it as a file. All in the browser.',
        subtitle: 'Paste a base64 string or data-URI — decoding happens locally in your browser.',
        inputLabel: 'Base64 / data-URI',
        filenameLabel: 'File name',
        mime: 'MIME',
        size: 'Size',
        download: 'Download file',
        errors: {
          notBase64: 'This is a data-URI without base64 (URL-encoded). Only base64 is supported.',
          empty: 'Empty input.',
          invalidChars: 'Invalid characters for base64.',
          decodeFailed: 'Could not decode base64 (wrong length or characters).',
        },
      },
    },
  },
  ru: {
    nav: {
      tools: 'Инструменты',
      toLight: 'Светлая тема',
      toDark: 'Тёмная тема',
    },
    home: {
      badge: '100% в браузере · данные никуда не уходят',
      title: 'Инструменты для веба',
      subtitle: 'Небольшие утилиты на каждый день. Быстро, приватно, без установки.',
      open: 'Открыть',
    },
    tools: {
      'base64-to-file': {
        title: 'Base64 → File',
        description: 'Декодировать base64 (или data-URI) и скачать как файл. Всё в браузере.',
        subtitle: 'Вставьте base64-строку или data-URI — конвертация локально в браузере.',
        inputLabel: 'Base64 / data-URI',
        filenameLabel: 'Имя файла',
        mime: 'MIME',
        size: 'Размер',
        download: 'Скачать файл',
        errors: {
          notBase64: 'Это data-URI без base64 (URL-encoded). Поддерживается только base64.',
          empty: 'Пустой ввод.',
          invalidChars: 'Недопустимые символы для base64.',
          decodeFailed: 'Не удалось декодировать base64 (неверная длина или символы).',
        },
      },
    },
  },
} as const
