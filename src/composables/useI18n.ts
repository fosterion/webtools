import { ref, watchEffect } from 'vue'
import { type Locale, locales, messages } from '../i18n/messages'

const STORAGE_KEY = 'webtools-locale'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && (locales as string[]).includes(stored)) return stored as Locale
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

// Module-level singleton so every component shares the same reactive locale.
const locale = ref<Locale>(getInitialLocale())

watchEffect(() => {
  document.documentElement.lang = locale.value
  localStorage.setItem(STORAGE_KEY, locale.value)
})

/** Resolve a dotted key path against the active locale's messages. */
function translate(key: string): string {
  const value = key
    .split('.')
    .reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], messages[locale.value])
  return typeof value === 'string' ? value : key
}

export function useI18n() {
  // Reads locale.value so callers (computed/render) re-run on locale change.
  function t(key: string): string {
    void locale.value
    return translate(key)
  }
  function setLocale(next: Locale) {
    locale.value = next
  }
  return { locale, setLocale, t }
}
