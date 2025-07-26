<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
const {recipes,loading,error,currentPage,lastPage} = storeToRefs(useRecipeStore())
const { myRecipes,loadMore, resetRecipes,removeRecipe} = useRecipeStore()

onMounted(()=>{
    myRecipes()
})

onBeforeRouteLeave(()=>{
  resetRecipes()
})
</script>

<template>
    <div class="flex flex-row justify-between items-center pt-5 md:pt-10 lg:pt-20 2xl:gap-10 px-4 md:px-10 lg:px-15">
      <h1 class="text-[2.563rem] md:text-[3.438rem] 2xl:text-[4.563rem] font-semibold text-[#221F20] leading-[120%]">My Recipes</h1>
      <div>
        <RouterLink to="/my-recipes/create" class="bg-[#221F20] text-white px-4 py-2 rounded-3xl cursor-pointer">Add Recipes</RouterLink>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 md:pt-10  lg:pt-20  gap-5 2xl:gap-10 px-4 md:px-10 lg:px-15 " v-if="recipes.length">
    <div class="w-full" v-for="recipe in recipes" :key="recipe?.id">
        <RouterLink :to="`/recipe/${Number(recipe.id)}`" class="h-w-full">
        <div class="overflow-hidden aspect-square">
            <img :src="recipe.image" alt="" class="w-full h-full object-cover">
        </div>
        </RouterLink>
        <div class="flex flex-col pt-4 w-full">
          <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
            {{ recipe.title }}
          </h6>
          <div class="flex flex-row items-center gap-6">
            <form @submit.prevent="removeRecipe(recipe.id)">
              <button class="cursor-pointer text-red-500">
                  Remove
              </button>
            </form>
            <RouterLink :to="`/my-recipes/edit/${recipe.id}`">Edit</RouterLink>
          </div>
         
        </div>
    </div>
  </div>
  <div class="flex justify-center items-center min-h-[300px]">
    <div v-if="loading" class="text-center">
      Loading...
    </div>

    <div v-else-if="!recipes.length" class="text-center">
      <p>You don't have any recipes yet</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error }}
    </div>
  </div>
  <div class="text-center my-6">
    <button
      v-if="currentPage < lastPage"
      @click="loadMore"
      :disabled="loading"
      class="bg-[#221F20] text-white px-4 py-2 rounded-3xl cursor-pointer"
    >
      {{loading ? 'Loading...' : 'See More' }}
    </button>
  </div>
</template>

<style scoped>

</style>