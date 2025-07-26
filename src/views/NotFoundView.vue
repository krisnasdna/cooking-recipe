<template>
    <div class="h-full w-full">
        <div class="flex flex-col justify-center items-center h-full w-full pt-60">
            <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
            <p class="mt-4 text-gray-500">The page you're looking for doesn't exist.</p>
            <div class="pt-10">
                <RouterLink :to="{name: 'home'}" class="bg-[#221F20] text-white px-4 py-2 rounded-3xl cursor-pointer">Back to Home</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<style scoped>

</style>