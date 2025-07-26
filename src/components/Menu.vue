<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
const {user} = storeToRefs(useAuthStore())
const { getUser,logout} = useAuthStore()

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

onMounted(()=>{
    getUser()
})
</script>

<template>
    <div class="flex felx-row items-center gap-8">
        <div class="lg:flex flex-row gap-10 items-center hidden">
            <RouterLink v-for="(menu, index) in mainMenu" :key="index" :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div>
        <div class="hidden lg:flex flex-row items-center gap-8" v-if="!user">
            <RouterLink :to="{name: 'login'}" class="py-2 px-6 rounded-3xl bg-[#FFEEEE]  font-medium text-[#777421]">Login</RouterLink>
        </div>
        <div v-else class="flex flex-row items-center gap-4">
            <div>
                <RouterLink to="/my-recipes">My Recipe</RouterLink>
            </div>
            <div class="hidden lg:flex flex-row justify-center space-x-2.5 border border-blue-700 rounded-xl py-2 px-5">
                <div >
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="inline-block size-6 rounded-full ring-2 ring-white" />
                </div>
                <div>
                    <h1>{{ user.name }}</h1>
                </div>
                <div >
                    <form @submit.prevent="logout()">
                        <button class="cursor-pointer">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>