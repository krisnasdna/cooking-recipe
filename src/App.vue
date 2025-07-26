<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue';
import OverlayLoading from './components/OverlayLoading.vue';
import { computed } from 'vue';

const route = useRoute()

const isHideHeader = computed(() =>{
  return !route.meta.hideHeader
})
</script>

<template>
  <OverlayLoading/>
  <div class="font-main h-full w-full">
    <Header v-if="isHideHeader" class="pb-5"/>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
