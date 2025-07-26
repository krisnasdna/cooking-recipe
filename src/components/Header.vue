<script setup lang="ts">
import Logo from './Logo.vue';
import Menu from './Menu.vue';
</script>

<template>
    <div class="flex flex-row justify-between items-center pt-6 lg:pt-10 bg-[#D7D37F]">
        <div class="mx-4 lg:mx-15">
            <Logo/>
        </div>
        <div class="mx-4 lg:mx-15">
            <Menu />
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>