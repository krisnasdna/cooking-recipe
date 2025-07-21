<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const {user} = storeToRefs(useAuthStore())
const { getUser, logout} = useAuthStore()

onMounted(()=>{
  getUser()
})

</script>

<template>
  <div  v-if="user">
    <h1>{{ user.name }}</h1>
    <form @submit.prevent="logout()">
      <button type="submit" class="cursor-pointer">logout</button>
    </form>
  </div>
  <RouterView />
</template>

<style scoped>
</style>
