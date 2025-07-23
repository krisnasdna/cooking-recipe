import { defineStore } from "pinia";
import {  onMounted, ref, type Ref } from "vue";
import { useLoadingStore } from "./loading";
import { useTokenStore } from "./token";
import { useRouter } from "vue-router";
export interface Recipe{
    id: number
    title: string
    description?: string
    ingredients: string[]
    steps: string[]
    image: string
    nutrition: string[]
}
export const useRecipeStore = defineStore('recipe', () =>{
    const recipes: Ref<Recipe[] > = ref([])
    const recipe: Ref<Recipe | null>=ref(null)
    const router = useRouter()
    const error = ref(null)
    const loading = useLoadingStore()
    const token = useTokenStore()
    const getRecipes = async () => {
        loading.show()
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
            loading.hide()
        }
    }
    
    const getRecipeById = async (id:number) => {
        loading.show()
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
            loading.hide()
        }
    }

    async function addRecipe(form: {}) {
        try {
            const res = await token.authFetch('recipes', {
                method: 'POST',
                body: JSON.stringify(form)
            })

            const data = await res?.json()
            if (!res?.ok) 
            {
                console.log(data)
            }
            router.push('/recipe')
        } catch (err) {
            console.error(err)
        }
    }
    return { error, loading,  recipes, recipe, getRecipes, getRecipeById,addRecipe}
})