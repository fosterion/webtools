import type { Component } from 'vue'

export interface Tool {
  /** URL slug, used as the route path: /<id> */
  id: string
  title: string
  description: string
  /** Emoji shown on the catalog card. */
  icon: string
  /** Lazily loaded tool component. */
  component: () => Promise<{ default: Component }>
}

// Add a new tool by appending an entry here — routes and the home catalog
// are generated from this list automatically.
export const tools: Tool[] = [
  {
    id: 'base64-to-file',
    title: 'Base64 → File',
    description: 'Декодировать base64 (или data-URI) и скачать как файл. Всё в браузере.',
    icon: '📦',
    component: () => import('./Base64ToFile.vue'),
  },
]
