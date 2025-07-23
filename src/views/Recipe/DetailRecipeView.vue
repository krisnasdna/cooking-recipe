
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
    <div>
        <h1>Detail resep</h1>
        <div v-if="loading.isLoading">
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
    </div>
</template>

<style scoped>

</style>