<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const loading = useLoadingStore()
</script>

<template>
    <div v-if="loading.isLoading" class="fixed inset-0 bg-[#FCF1E0] z-[9999] flex items-center justify-center">
        <span class="text-blue-800 text-xl animate-pulse ">Loading...</span>
    </div>
</template>

<style scoped>

</style>