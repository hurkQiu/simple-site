<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopMenu from '@/components/TopMenu.vue'
</script>

<template>
  <header>
    <TopMenu></TopMenu>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  position: sticky;
  top: 0;
  z-index: 100;
  max-width: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
  }
}
</style>
