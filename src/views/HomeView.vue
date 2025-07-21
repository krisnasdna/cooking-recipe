<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const {getRecipes} = useRecipeStore()
const { recipes, loading, error} = storeToRefs(useRecipeStore())

onMounted(()=>{
  if(!recipes.value.length){
    getRecipes()
  }
})

</script>

<template>
  <main>
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
