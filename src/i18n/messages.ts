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
      subtitle: 'Small everyday utilities — fast, no install.',
      open: 'Open',
    },
    tools: {
      'base64-to-file': {
        title: 'Base64 → File',
        description: 'Decode base64 or a data-URI and download it as a file.',
        subtitle: 'Paste a base64 string or data-URI below.',
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
      'uuid-generator': {
        title: 'UUID / GUID Generator',
        description: 'Generate UUIDs of different versions (v4, v7, v1).',
        subtitle: 'Pick a version and generate one or many.',
        version: 'Version',
        count: 'Count',
        uppercase: 'Uppercase',
        braces: 'Braces { }',
        generate: 'Generate',
        copy: 'Copy',
        copyAll: 'Copy all',
        copied: 'Copied!',
        versions: {
          v4: 'v4 — random',
          v7: 'v7 — time-ordered',
          v1: 'v1 — time-based',
          nil: 'Nil — all zeros',
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
      subtitle: 'Небольшие утилиты на каждый день — быстро, без установки.',
      open: 'Открыть',
    },
    tools: {
      'base64-to-file': {
        title: 'Base64 → File',
        description: 'Декодировать base64 или data-URI и скачать как файл.',
        subtitle: 'Вставьте base64-строку или data-URI ниже.',
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
      'uuid-generator': {
        title: 'Генератор UUID / GUID',
        description: 'Генерация UUID разных версий (v4, v7, v1).',
        subtitle: 'Выберите версию и сгенерируйте один или несколько.',
        version: 'Версия',
        count: 'Количество',
        uppercase: 'Верхний регистр',
        braces: 'Фигурные скобки { }',
        generate: 'Сгенерировать',
        copy: 'Копировать',
        copyAll: 'Копировать всё',
        copied: 'Скопировано!',
        versions: {
          v4: 'v4 — случайный',
          v7: 'v7 — упорядоченный по времени',
          v1: 'v1 — на основе времени',
          nil: 'Nil — все нули',
        },
      },
    },
  },
} as const
