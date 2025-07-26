import { defineStore } from "pinia";
import {  onMounted, ref, type Ref } from "vue";
import { useLoadingStore } from "./loading";
import { useTokenStore } from "./token";
import { useRouter } from "vue-router";

export interface Step {
  step: string
  instruction: string
}

export interface Recipe {
  id: number
  title: string
  image: string
  ingredients: string[]
  utensils: string[]
  steps: Step[]
}

export const useRecipeStore = defineStore('recipe', () =>{
    const recipes: Ref<Recipe[] > = ref([])
    const recipe: Ref<Recipe | null>=ref(null)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const router = useRouter()
    const error = ref(null)
    const loading = ref(false)
    const keyword = ref('')
    const token = useTokenStore()
    const getRecipes = async (page = 1, search ='') => {
        loading.value = true
        try{
            const query = new URLSearchParams({
                page: String(page),
                search, 
            })
            const res = await fetch(`https://api-recipes-alpha.vercel.app/api/api/recipes?${query}`,{
             headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            }
            })
            const data = await res.json()
            if(page === 1){
                recipes.value = data.data
            }else{
                recipes.value.push(...data.data)
            }
            currentPage.value = data.current_page
            lastPage.value = data.last_page
        }catch(err:any){
             error.value = err?.message
        }finally{
            loading.value = false
        }
    }
    const loadMore = async() =>{
        if(currentPage.value < lastPage.value && !loading.value){
            await getRecipes(currentPage.value + 1)
        }
    }
    const searchRecipes = async (term: string) => {
        keyword.value = term
        await getRecipes(1, term) 
    }
    const resetRecipes = () =>{
        recipes.value = []
        recipe.value = null
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
    const myRecipes = async (page = 1) => {
        loading.value = true
        try{
            const res = await token.authFetch(`my-recipes?${page}`,{
                method: 'get'
            })
            const data = await res?.json()
            if(page === 1){
                recipes.value = data.data
            }else{
                recipes.value.push(...data.data)
            }

            currentPage.value = data.current_page
            lastPage.value = data.last_page

        }catch(err:any){
             error.value = err?.message
        }finally{
            loading.value = false
        }
    }
    const getMyRecipeById = async (id:number) => {
        loading.value = true
        try{
            const res = await token.authFetch(`my-recipes/${id}`,{
            headers:{
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            })
            const data = await res?.json()
            recipe.value = data

        }catch(err:any){
                error.value = err?.message
        }finally{
            loading.value = false
        }
    }
    async function addRecipe(form: {}) {
        loading.value = true
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
            router.push('/my-recipes')
        } catch (err) {
            console.error(err)
        }finally{
            loading.value = false
        }
    }

    async function removeRecipe(id: number) {
        loading.value = true
        try {
            const res = await token.authFetch(`recipes/${id}`, {
                method: 'DELETE',
            })
            const data = await res?.json()

            if (!res?.ok) 
            {
                console.log(data)
            }
            recipes.value = []
            router.push('/my-recipes')
        } catch (err) {
            console.error(err)
        }finally{
            loading.value = false
        }
    }

    async function editRecipe(id: number,form : {}){
        loading.value = true
        try {
            const res = await token.authFetch(`recipes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(form)
            })
            const data = await res?.json()
            if (!res?.ok) 
            {
                console.log(data)
            }
            router.push('/my-recipes')
        } catch (err) {
            console.error(err)
        }finally{
            loading.value = false
        }
    }
    return { error, loading,  recipes, recipe, getRecipes, getRecipeById,addRecipe,currentPage,lastPage,loadMore,searchRecipes,keyword,myRecipes,resetRecipes, removeRecipe,getMyRecipeById,editRecipe}
})