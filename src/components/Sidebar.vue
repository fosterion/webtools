<template>
  <aside class="bg-blue-600 text-white w-64 p-4 space-y-4 hidden md:block">
    <nav>
      <ul>
        <li><router-link to="/" class="block py-2 px-4 rounded hover:bg-blue-700">Главная</router-link></li>
        <!-- <li><router-link to="/about" class="block py-2 px-4 rounded hover:bg-blue-700">О нас</router-link></li>
        <li><router-link to="/contact" class="block py-2 px-4 rounded hover:bg-blue-700">Контакты</router-link></li>
        <li><router-link to="/support" class="block py-2 px-4 rounded hover:bg-blue-700">Служба поддержки</router-link></li> -->
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>
