<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <div class="mx-40">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
