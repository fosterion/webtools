<template>
  <div class="flex min-h-screen bg-white">
    <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden p-4">
      ☰
    </button>
    <Sidebar v-if="isSidebarOpen || isDesktop" />
    <main class="flex-1 p-8 bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  setup() {
    const isSidebarOpen = ref(false);
    const isDesktop = ref(window.innerWidth >= 768);

    onMounted(() => {
      window.addEventListener('resize', () => {
        isDesktop.value = window.innerWidth >= 768;
      });
    });

    return {
      isSidebarOpen,
      isDesktop,
    };
  },
};
</script>
