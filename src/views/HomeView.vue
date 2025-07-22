<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const {user} = storeToRefs(useAuthStore())
const {getUser ,logout} = useAuthStore()
const {getRecipes} = useRecipeStore()
const { recipes, loading, error} = storeToRefs(useRecipeStore())

onMounted(()=>{
  if(!recipes.value.length){
    getRecipes()
  }
  if(!user.value){
    getUser()
  }
})

</script>

<template>
  <main>
    <div v-if="user">
      <h1>{{ user.name }}</h1>
      <form @submit.prevent="logout()">
        <button type="submit" class="cursor-pointer">logout</button>
      </form>
   </div>
    <h1 class="text-3xl font-bold underline uppercase">resep makanan</h1>

    <div v-if="loading">
      Loading....
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
    <div v-else>
      <ul>
        <li v-for="recipe in recipes" :key="recipe?.id">
          <RouterLink :to="`/recipe/${Number(recipe?.id)}`">
            {{ recipe?.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>
