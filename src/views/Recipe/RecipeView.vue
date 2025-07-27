<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch, type Ref } from 'vue';
import { onBeforeRouteLeave, RouterLink } from 'vue-router';

const {user} = storeToRefs(useAuthStore())
const {getRecipes,loadMore,searchRecipes,resetRecipes} = useRecipeStore()
const { recipes,loading, error,currentPage,lastPage} = storeToRefs(useRecipeStore())

const searchTerm = ref('')
let debounceTimeout: ReturnType<typeof setTimeout>

function onSearch(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  searchTerm.value = value
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    searchRecipes(value)
  }, 500)
}

onMounted(()=>{
  if(!recipes.value.length){
    getRecipes()
  }
})

onBeforeRouteLeave(()=>{
  resetRecipes()
})

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="bg-[#D7D37F] px-4 md:px-10 lg:px-15 pt-10 ">
        <h1 class="text-[#1F2D0F] font-semibold text-[2.563rem]  lg:text-[3.438rem] text-center ">Find Your Pawfect Recipe</h1>
        <p class="text-center text-base text-[#5C5B5B] pt-2 lg:pt-4">Discover tasty ideas crafted with love. Because even your cravings deserve a little purrfection.</p>
        <div class="text-center py-10">
          <input
            type="text"
            @input="onSearch"
            placeholder="Search recipes..."
            class="bg-white p-2 mb-4 w-full lg:w-[60%] rounded-3xl focus:ring-0 focus:border-none"
          />
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 md:pt-10  lg:pt-20  gap-5 2xl:gap-10 px-4 md:px-10 lg:px-15">
      <div class="w-full" v-for="recipe in recipes" :key="recipe?.id">
        <RouterLink :to="`/recipe/${Number(recipe.id)}`">
          <div class="overflow-hidden aspect-square">
            <img :src="recipe.image" alt="" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col pt-4 w-full">
            <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
              {{ recipe.title }}
            </h6>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="flex justify-center items-center flex-1 py-10">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="!recipes.length" class="text-center">
        <p>You don't have any recipes yet</p>
      </div>
      <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
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
  </div>

</template>
