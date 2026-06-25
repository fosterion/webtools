<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const tk = (key: string) => t(`tools.base64-to-file.${key}`)

const input = ref('')
const filename = ref('download')
const error = ref('')

// Common MIME → extension map for auto-naming when a data-URI is pasted.
const mimeExt: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
  'application/json': 'json',
  'application/zip': 'zip',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'text/html': 'html',
}

interface Parsed {
  bytes: Uint8Array
  mime: string
  ext: string
}

/** Parse a raw base64 string or a data-URI into bytes + detected MIME. */
function parse(raw: string): Parsed {
  let data = raw.trim()
  let mime = 'application/octet-stream'

  const match = data.match(/^data:([^;,]*)?(;base64)?,(.*)$/s)
  if (match) {
    if (match[1]) mime = match[1]
    if (!match[2]) {
      // data-URI without ;base64 is URL-encoded, not base64.
      throw new Error('errors.notBase64')
    }
    data = match[3]
  }

  // Drop any whitespace/newlines that often sneak into pasted base64.
  data = data.replace(/\s+/g, '')
  if (data === '') throw new Error('errors.empty')
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(data)) {
    throw new Error('errors.invalidChars')
  }

  let binary: string
  try {
    binary = atob(data)
  } catch {
    throw new Error('errors.decodeFailed')
  }

  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)

  return { bytes, mime, ext: mimeExt[mime] ?? '' }
}

const parsed = computed<Parsed | null>(() => {
  error.value = ''
  if (input.value.trim() === '') return null
  try {
    return parse(input.value)
  } catch (e) {
    error.value = e instanceof Error ? tk(e.message) : String(e)
    return null
  }
})

// Suggest a filename extension from the detected MIME type.
watch(parsed, (p) => {
  if (p?.ext && !/\.[^.]+$/.test(filename.value)) {
    filename.value = `${filename.value || 'download'}.${p.ext}`
  }
})

const sizeLabel = computed(() => {
  const n = parsed.value?.bytes.length ?? 0
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
})

// Build a preview URL for images so the user can verify the content.
const previewUrl = ref('')
watch(
  parsed,
  (p) => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = ''
    }
    if (p && p.mime.startsWith('image/')) {
      previewUrl.value = URL.createObjectURL(new Blob([p.bytes], { type: p.mime }))
    }
  },
  { flush: 'post' },
)

function download() {
  const p = parsed.value
  if (!p) return
  const url = URL.createObjectURL(new Blob([p.bytes], { type: p.mime }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename.value || 'download'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    >
      <span>←</span> {{ t('nav.tools') }}
    </RouterLink>

    <div class="mt-3 flex items-center gap-3">
      <span
        class="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-fuchsia-500/15 text-xl ring-1 ring-inset ring-brand-500/20"
      >
        📦
      </span>
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ tk('title') }}</h1>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          {{ tk('subtitle') }}
        </p>
      </div>
    </div>

    <div
      class="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60"
    >
      <label class="block text-sm font-medium">{{ tk('inputLabel') }}</label>
      <textarea
        v-model="input"
        rows="8"
        spellcheck="false"
        placeholder="iVBORw0KGgo...  ·  data:image/png;base64,iVBORw0KGgo..."
        class="mt-1.5 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      <p
        v-if="error"
        class="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
      >
        <span>⚠️</span> {{ error }}
      </p>

      <div v-if="parsed" class="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium">{{ tk('filenameLabel') }}</label>
          <input
            v-model="filename"
            class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <dl class="self-end text-sm text-slate-600 dark:text-slate-400">
          <div
            class="flex justify-between border-b border-slate-200 py-1.5 dark:border-slate-700"
          >
            <dt>{{ tk('mime') }}</dt>
            <dd class="font-mono text-slate-900 dark:text-slate-200">{{ parsed.mime }}</dd>
          </div>
          <div class="flex justify-between py-1.5">
            <dt>{{ tk('size') }}</dt>
            <dd class="font-mono text-slate-900 dark:text-slate-200">{{ sizeLabel }}</dd>
          </div>
        </dl>
      </div>

      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="preview"
        class="mt-4 max-h-64 rounded-xl border border-slate-200 dark:border-slate-700"
      />

      <button
        :disabled="!parsed"
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-fuchsia-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:from-brand-500 hover:to-fuchsia-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-sm"
        @click="download"
      >
        <span>⬇</span> {{ tk('download') }}
      </button>
    </div>
  </div>
</template>
