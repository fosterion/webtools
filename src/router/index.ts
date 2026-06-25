import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { tools } from '../tools/registry'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  ...tools.map((tool) => ({
    path: `/${tool.id}`,
    name: tool.id,
    component: tool.component,
    meta: { title: tool.title },
  })),
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
