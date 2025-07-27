<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue';
import OverlayLoading from './components/OverlayLoading.vue';
import { computed } from 'vue';
import Modal from './components/Modal.vue';
import Footer from './components/Footer.vue';
const route = useRoute()

const isHideHeader = computed(() =>{
  return !route.meta.hideHeader
})
</script>

<template>
  <OverlayLoading/>
  <Modal/>
  <div class="font-main h-full w-full">
    <Header v-if="isHideHeader" class="pb-5 h-full" />
    <RouterView :key="$route.fullPath"/>
    <Footer v-if="isHideHeader"/>
  </div>
</template>

<style scoped>
</style>
