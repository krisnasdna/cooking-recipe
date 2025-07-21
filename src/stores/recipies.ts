import { defineStore } from "pinia";
import {  onMounted, ref, type Ref } from "vue";

export const useRecipeStore = defineStore('recipe', () =>{
    interface Recipe{
        id: number
        title: string
        description?: string
        ingredients: string[]
        steps: string[]
        image: string
        nutrition: string[]
    }
    const recipes: Ref<Recipe[] > = ref([])
    const recipe: Ref<Recipe | null>=ref(null)

    const error = ref(null)
    const loading = ref(false)

    const getRecipes = async () => {
        loading.value = true
        try{
            const res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/recipes`,{
             headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            }
            })
            const data = await res.json()
            recipes.value = data

        }catch(err:any){
             error.value = err?.message
        }finally{
            loading.value = false
        }
    }
    
    const getRecipeById = async (id:number) => {
        loading.value = true
        try{
            const res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/recipes/${id}`,{
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            })
            const data = await res.json()
            recipe.value = data

        }catch(err:any){
                error.value = err?.message
        }finally{
            loading.value = false
        }
    }
    return { error, loading,  recipes, recipe, getRecipes, getRecipeById}
})