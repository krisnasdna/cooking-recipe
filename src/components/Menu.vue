<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Logo from './Logo.vue';
import { useModalStore } from '@/stores/modal';
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

const handelLogout = () => {
    toggleMenu.value = !toggleMenu.value
    modal.showModalLogout()
}
const toggleMenu = ref(false)
const modal = useModalStore()
</script>

<template>
    <div class="sm:hidden relative">
        <div class="w-5" @click="toggleMenu = !toggleMenu">
            <img src="@/assets/image/hamburger.png" alt="" class="w-full h-full">
        </div>
        <div class="bg-[#FCF1E0] z-[8888]  absolute w-68 h-68  origin-top-right -right-3 -top-4 px-4 py-4 rounded-2xl" v-if="toggleMenu">
            <div class="h-full">
                <div class="flex flex-row justify-end items-center">
                    <div class="w-5" @click="toggleMenu = !toggleMenu">
                        <img src="@/assets/image/close.png" alt="" class="w-full h-full">
                    </div>
                </div>
                <div class="flex flex-col justify-between py-4 h-full">
                    <div class="flex flex-col gap-4">
                        <RouterLink v-for="(menu, index) in mainMenu" :key="index" :to="menu.path" class="text-base font-semibold" @click="toggleMenu = !toggleMenu">
                            {{ menu.name }}
                        </RouterLink>
                        <RouterLink to="/my-recipes" class="text-base font-semibold" v-if="user" @click="toggleMenu = !toggleMenu" >My Recipe</RouterLink>
                    </div>
                    <div class="flex flex-row justify-end  gap-8" v-if="!user">
                        <RouterLink :to="{name: 'login'}" class="py-2 px-6 rounded-3xl bg-[#221F20]  font-medium text-[#FFEEEE]" @click="toggleMenu = !toggleMenu">Sign In</RouterLink>
                    </div>
                    <div v-else class="flex flex-row justify-between items-center pb-4">
                        <div>
                            <button class="cursor-pointer w-5" @click="handelLogout()">
                                <img src="@/assets/image/logout.png" alt="">
                            </button>
                        </div>
                        <div class="flex flex-row gap-4 items-center">
                            <p class="text-base font-medium">{{ user.name }}</p>
                            <div class="w-5">
                                <img src="@/assets/image/user.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <div class="md:flex flex-row items-center gap-8 hidden">
        <div class="flex flex-row gap-10 items-center">
            <RouterLink v-for="(menu, index) in mainMenu" :key="index" :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div>
        <div class="flex flex-row items-center gap-8" v-if="!user">
            <RouterLink :to="{name: 'login'}" class="py-2 px-6 rounded-3xl bg-[#FFEEEE]  font-medium text-[#777421]">Sign In</RouterLink>
        </div>
        <div v-else class="flex flex-row items-center gap-10">
            <div>
                <RouterLink to="/my-recipes">My Recipe</RouterLink>
            </div>
            <div class="relative">
                <div class="flex flex-row items-center gap-2 bg-white rounded-3xl py-2 px-4 text-[#221F20] cursor-pointer" @click="toggleMenu = !toggleMenu">
                    <div class="w-5">
                        <img src="@/assets/image/user.png" alt="">
                    </div>
                    <p class="text-base font-medium">{{ user.name }}</p>
                    <div class="w-3">
                        <img src="@/assets/image/down.png" alt="">
                    </div>
                </div>
                <div v-if="toggleMenu" class="fixed inset-0 z-[9998]" @click.self="toggleMenu = false">
                <div class="absolute right-14 top-22 bg-white w-38 p-4 rounded-xl z-[9999]">
                <button @click="handelLogout()" class="flex flex-row w-5 items-center gap-2 cursor-pointer">
                        <img src="@/assets/image/logout.png" alt="" />
                        <p class="text-base font-medium">Logout</p>
                    </button>
                    </div>
                </div>
                <!-- <div class="absolute right-0 top-12 bg-white w-38 p-4 rounded-xl z-[9999]" v-if="toggleMenu" @click.self="toggleMenu = !toggleMenu">
                    <button @click="handelLogout()" class="flex flex-row w-5 items-center gap-2 cursor-pointer" >
                        <img src="@/assets/image/logout.png" alt="">
                        <p class="text-base font-medium">Logout</p>
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>