
<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRecipeStore } from '@/stores/recipies';
import { storeToRefs } from 'pinia';
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const { recipe,loading,error} = storeToRefs(useRecipeStore())
const { getRecipeById} = useRecipeStore()
const id: number = Number(route.params.id)

onMounted(() =>{
    getRecipeById(id)
})

</script>

<template>
    <div class="bg-[#D7D37F] px-4 md:px-10 lg:px-15 pt-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 justify-start items-end w-full">
            <h1 class="text-[2.563rem] md:text-[3.438rem] lg:text-[3.438rem] 2xl:text-[6.188rem] font-semibold text-[#FFEEEE] leading-[120%] pb-5">{{ recipe?.title }}</h1>
            <div class="justify-self-end">
                <img src="@/assets/image/maskot2.png" alt="" class="w-[279px] h-[249px] object-cover object-center hidden lg:inline">
            </div> 
        </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
        <div class="w-full">
            <img :src="recipe?.image" :alt="recipe?.title" class="w-full h-full object-cover" >
        </div>
        <div class="bg-[#221F20] p-10 w-full">
            <div>
                <h1 class="text-[2.563rem] md:text-[3.438rem] 2xl:text-[4.563rem] font-semibold text-[#FFEEEE] leading-[120%]">Ingredients</h1>
                <div class="text-[#FFEEEE] ms-5">
                    <ul>
                        <li class="list-disc pt-4" v-for="ingredient in recipe?.ingredients" :key="ingredient">
                             {{ ingredient }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pt-5">
                <h1 class="text-[2.563rem] md:text-[3.438rem] 2xl:text-[4.563rem] font-semibold text-[#FFEEEE] leading-[120%]">Utensils</h1>
                <div class="text-[#FFEEEE] ms-5">
                    <ul>
                        <li class="list-disc pt-4" v-for="utensil in recipe?.utensils" :key="utensil">
                             {{ utensil }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="px-4 md:px-10 lg:px-15 pt-10">
        <h1 class="text-[2.563rem] md:text-[3.438rem] 2xl:text-[4.563rem] font-semibold text-[#221F20]">Instructions</h1>
        <div class="grid grid-cols-1  lg:grid-cols-2">
            <div class="">
                <ul>
                    <li class="list-decimal text-base text-[#221F20 pt-4 font-semibold ms-5" v-for="(instruction, index) in recipe?.steps" :key="index">
                        {{ instruction.step }}
                        <ul>
                            <li class="text-base pt-2 font-normal text-justify">
                                {{ instruction.instruction }}
                            </li>
                        </ul>
                    </li>
                </ul> 
            </div>
            <div>

            </div>
        </div>
    </div>
    <div class="px-4 md:px-10 lg:px-15 pt-16">
        <h1 class="text-[2.563rem] md:text-[3.438rem] lg:text-[4.563rem] font-semibold text-[#221F20]">More recipes</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5  gap-5 2xl:gap-10">
            <div class="w-full">
                <div class="overflow-hidden">
                <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col pt-4 w-full">
                <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
                    Soto Ayam
                </h6>
                </div>
            </div>
            <div class="w-full">
                <div class="overflow-hidden">
                <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col pt-4 w-full">
                <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
                    Soto Ayam
                </h6>
                </div>
            </div>
            <div class="w-full">
                <div class="overflow-hidden">
                <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col pt-4 w-full">
                <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
                    Soto Ayam
                </h6>
                </div>
            </div>
            <div class="w-full">
                <div class="overflow-hidden">
                <img src="@/assets/image/card.jpg" alt="" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col pt-4 w-full">
                <h6 class="text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] 2xl:text-[2.563rem] font-semibold truncate overflow-hidden whitespace-nowrap w-full text-[#221F20]">
                    Soto Ayam
                </h6>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="px-4 md:px-10 lg:px-15 pt-10">
        <h1 class="text-[4.563rem] font-semibold text-[#221F20] leading-[120%]">Instructions </h1>
        <div class="grid grid-cols-2">
            <div>

            </div>
            <div>

            </div>
        </div>
    </div> -->
    
    <!-- <div>
        <h1>Detail resep</h1>
        <div v-if="loading">
            loading....
        </div>
        <div v-else-if="error">
            error : {{ error }}
        </div>
        <ul v-else>
            <li>
                <h1>{{ recipe?.title }}</h1>
                <p>{{ recipe?.description }}</p>
                <h2>Bahan</h2>
                <ul>
                    <li v-for="ingredient in recipe?.ingredients">
                        {{ ingredient }}
                    </li>
                </ul>
                <h2>Cara Masak</h2>
                <ul>
                    <li v-for="step in recipe?.steps">
                        {{ step }}
                    </li>
                </ul>
                <h2>Nutrisi</h2>
                <ul>
                    <li v-for="(nutrition, key ) in recipe?.nutrition" :key="key">
                       {{ key }}: {{ nutrition }}
                    </li>
                </ul>
            </li>
        </ul>
    </div> -->
</template>

<style scoped>

</style>