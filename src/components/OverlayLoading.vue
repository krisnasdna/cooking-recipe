<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const loading = useLoadingStore()
</script>

<template>
    <div v-if="loading.isLoading" class="fixed inset-0 bg-[#FCF1E0] z-[9999] flex items-center justify-center">
        <span class="text-[#1F2D0F] text-[2.563rem] md:text-[3.438rem] animate-pulse uppercase font-main font-semibold">Loading...</span>
    </div>
</template>

<style scoped>

</style>