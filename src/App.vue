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
  <div class="font-main">
    <Header v-if="isHideHeader" class="pb-5"/>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
