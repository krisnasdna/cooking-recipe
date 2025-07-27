<template>
    <div class="px-15 py-6 bg-[#221F20] text-white text-center">
        <div>
            <h6 class="text-base">Copyright © {{ date }} <RouterLink :to="{name : 'home'}" class="underline">Pawlicious</RouterLink>. All right reversed</h6>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
const date = new Date().getFullYear()
</script>

<style scoped>

</style>