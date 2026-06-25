<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const tk = (key: string) => t(`tools.uuid-generator.${key}`)

const versionKeys = ['v4', 'v7', 'v1', 'nil'] as const
type Version = (typeof versionKeys)[number]

const version = ref<Version>('v4')
const count = ref(5)
const uppercase = ref(false)
const braces = ref(false)
const results = ref<string[]>([])
const copied = ref<number | 'all' | null>(null)

function bytesToUuid(b: Uint8Array): string {
  const h: string[] = []
  for (let i = 0; i < 16; i++) h.push(b[i].toString(16).padStart(2, '0'))
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`
}

function uuidV4(): string {
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  return bytesToUuid(b)
}

function uuidV7(): string {
  const b = crypto.getRandomValues(new Uint8Array(16))
  // 48-bit Unix-millisecond timestamp in the first 6 bytes (avoid bitwise
  // ops on >32-bit numbers).
  let t = Date.now()
  for (let i = 5; i >= 0; i--) {
    b[i] = t % 256
    t = Math.floor(t / 256)
  }
  b[6] = (b[6] & 0x0f) | 0x70
  b[8] = (b[8] & 0x3f) | 0x80
  return bytesToUuid(b)
}

function uuidV1(): string {
  // 100-ns intervals since 1582-10-15; offset to the Unix epoch. BigInt is
  // needed because the value exceeds Number's safe integer range.
  const time = BigInt(Date.now()) * 10000n + 122192928000000000n
  const b = new Uint8Array(16)
  const timeLow = time & 0xffffffffn
  const timeMid = (time >> 32n) & 0xffffn
  const timeHi = (time >> 48n) & 0x0fffn
  b[0] = Number((timeLow >> 24n) & 0xffn)
  b[1] = Number((timeLow >> 16n) & 0xffn)
  b[2] = Number((timeLow >> 8n) & 0xffn)
  b[3] = Number(timeLow & 0xffn)
  b[4] = Number((timeMid >> 8n) & 0xffn)
  b[5] = Number(timeMid & 0xffn)
  b[6] = Number((timeHi >> 8n) & 0x0fn) | 0x10
  b[7] = Number(timeHi & 0xffn)
  const rand = crypto.getRandomValues(new Uint8Array(8))
  b[8] = (rand[0] & 0x3f) | 0x80 // clock-seq high + variant
  b[9] = rand[1] // clock-seq low
  // Random node id with the multicast bit set, per RFC 4122 §4.5.
  b[10] = rand[2] | 0x01
  for (let i = 3; i < 8; i++) b[8 + i] = rand[i]
  return bytesToUuid(b)
}

const generators: Record<Version, () => string> = {
  v4: uuidV4,
  v7: uuidV7,
  v1: uuidV1,
  nil: () => '00000000-0000-0000-0000-000000000000',
}

function format(uuid: string): string {
  let out = uppercase.value ? uuid.toUpperCase() : uuid
  if (braces.value) out = `{${out}}`
  return out
}

function generate() {
  const n = Math.min(100, Math.max(1, Math.floor(count.value) || 1))
  count.value = n
  const gen = generators[version.value]
  results.value = Array.from({ length: n }, () => format(gen()))
  copied.value = null
}

async function copy(text: string, key: number | 'all') {
  await navigator.clipboard.writeText(text)
  copied.value = key
  setTimeout(() => {
    if (copied.value === key) copied.value = null
  }, 1200)
}

onMounted(generate)
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
        🆔
      </span>
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ tk('title') }}</h1>
        <p class="text-sm text-slate-600 dark:text-slate-400">{{ tk('subtitle') }}</p>
      </div>
    </div>

    <div
      class="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium">{{ tk('version') }}</label>
          <select
            v-model="version"
            class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option v-for="v in versionKeys" :key="v" :value="v">
              {{ tk(`versions.${v}`) }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium">{{ tk('count') }}</label>
          <input
            v-model.number="count"
            type="number"
            min="1"
            max="100"
            class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <label class="inline-flex items-center gap-2">
          <input v-model="uppercase" type="checkbox" class="accent-brand-600" />
          {{ tk('uppercase') }}
        </label>
        <label class="inline-flex items-center gap-2">
          <input v-model="braces" type="checkbox" class="accent-brand-600" />
          {{ tk('braces') }}
        </label>
      </div>

      <div class="mt-5 flex flex-wrap gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-fuchsia-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:from-brand-500 hover:to-fuchsia-500 hover:shadow-md"
          @click="generate"
        >
          <span>↻</span> {{ tk('generate') }}
        </button>
        <button
          v-if="results.length > 1"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          @click="copy(results.join('\n'), 'all')"
        >
          {{ copied === 'all' ? tk('copied') : tk('copyAll') }}
        </button>
      </div>

      <ul class="mt-5 space-y-2">
        <li
          v-for="(id, i) in results"
          :key="i"
          class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        >
          <code class="truncate font-mono text-sm text-slate-900 dark:text-slate-100">{{ id }}</code>
          <button
            class="flex-none rounded-lg px-2 py-1 text-xs font-medium text-brand-600 transition hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
            @click="copy(id, i)"
          >
            {{ copied === i ? tk('copied') : tk('copy') }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
