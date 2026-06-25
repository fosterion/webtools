import type { Component } from 'vue'

export interface Tool {
  /** URL slug, used as the route path and as the i18n key: tools.<id>.* */
  id: string
  /** Emoji shown on the catalog card. */
  icon: string
  /** Lazily loaded tool component. */
  component: () => Promise<{ default: Component }>
}

// Add a new tool by appending an entry here and its strings under
// `tools.<id>` in src/i18n/messages.ts — routes and the home catalog
// are generated from this list automatically.
export const tools: Tool[] = [
  {
    id: 'base64-to-file',
    icon: '📦',
    component: () => import('./Base64ToFile.vue'),
  },
]
