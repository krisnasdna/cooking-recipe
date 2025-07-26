<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRecipeStore } from '@/stores/recipies'
import { uploadImage } from '@/utils/uploadImage'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const { addRecipe } = useRecipeStore()

interface Step {
  step: string
  instruction: string
}

interface RecipeForm {
  title: string
  image: string
  ingredients: string[]
  utensils: string[]
  steps: Step[]
}

const form = ref<RecipeForm>({
  title: '',
  image: '',
  ingredients: [''],
  utensils: [''],
  steps: [{ step: '', instruction: '' }]
})

const addIngredient = () => form.value.ingredients.push('')
const addUtensil = () => form.value.utensils.push('')
const addStep = () => form.value.steps.push({ step: '', instruction: '' })
const removeItem = <T>(arr: T[], index: number) => arr.splice(index, 1)
const file = ref<File | null>(null)

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    file.value = target.files[0]
    try {
      const url = await uploadImage(file.value, 'recipe')
      form.value.image = url
      console.log('Uploaded to:', url)
    } catch (error) {
      console.error('Upload error', error)
    }
  }
}

console.log(form.value)
</script>

<template>
  <form @submit.prevent="" class="space-y-6">

    <input v-model="form.title" placeholder="Title" class="input" />
    <input type="file" @change="onFileChange" accept="image/*" />

    <h3 class="font-bold mt-4">Ingredients</h3>
    <div v-for="(ingredient, i) in form.ingredients" :key="i" class="flex gap-2">
      <input v-model="form.ingredients[i]" placeholder="Ingredient" class="input" />
      <button type="button" @click="removeItem(form.ingredients, i)">❌</button>
    </div>
    <button type="button" @click="addIngredient" class="btn">+ Add Ingredient</button>

    <h3 class="font-bold mt-4">Utensils</h3>
    <div v-for="(item, i) in form.utensils" :key="i" class="flex gap-2">
      <input v-model="form.utensils[i]" placeholder="Utensil" class="input" />
      <button type="button" @click="removeItem(form.utensils, i)">❌</button>
    </div>
    <button type="button" @click="addUtensil" class="btn">+ Add Utensil</button>

    <h3 class="font-bold mt-4">Steps</h3>
    <div
      v-for="(step, i) in form.steps"
      :key="i"
      class="space-y-2 border p-2 rounded bg-gray-50"
    >
      <input v-model="form.steps[i].step" placeholder="Step Title" class="input" />
      <textarea
        v-model="form.steps[i].instruction"
        placeholder="Instruction"
        class="textarea"
      />
      <button type="button" @click="removeItem(form.steps, i)">❌</button>
    </div>
    <button type="button" @click="addStep" class="btn">+ Add Step</button>

    <button type="submit" class="btn bg-green-600">Submit Recipe</button>
  </form>
</template>

<style scoped>

</style>