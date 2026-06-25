<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { tools } from '../tools/registry'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <section class="text-center">
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {{ t('home.badge') }}
      </span>
      <h1
        class="mt-4 bg-gradient-to-r from-slate-900 via-brand-700 to-fuchsia-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl dark:from-white dark:via-brand-300 dark:to-fuchsia-300"
      >
        {{ t('home.title') }}
      </h1>
      <p class="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
        {{ t('home.subtitle') }}
      </p>
    </section>

    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li v-for="tool in tools" :key="tool.id">
        <RouterLink
          :to="`/${tool.id}`"
          class="group relative block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-brand-500/60"
        >
          <div
            class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent opacity-0 transition group-hover:opacity-100"
          />
          <div class="flex items-start gap-3">
            <span
              class="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-fuchsia-500/15 text-xl ring-1 ring-inset ring-brand-500/20"
            >
              {{ tool.icon }}
            </span>
            <div>
              <h2 class="font-semibold">{{ t(`tools.${tool.id}.title`) }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {{ t(`tools.${tool.id}.description`) }}
              </p>
            </div>
          </div>
          <span
            class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
          >
            {{ t('home.open') }}
            <span class="transition group-hover:translate-x-0.5">→</span>
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
