<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const mainMenu = ref([
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Recipe',
        path: '/recipe'
    },
])
</script>

<template>
    <div class="flex felx-row items-center gap-8">
        <div class="flex flex-row gap-10 items-center">
            <RouterLink v-for="(menu, index) in mainMenu" :key="index" :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div>
        <div class="flex flex-row items-center gap-8">
            <RouterLink :to="{name: 'login'}" class="border border-green-700 py-2 px-4 rounded-xl hover:bg-green-500 hover:text-white hover:border-none font-medium ">Login</RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>