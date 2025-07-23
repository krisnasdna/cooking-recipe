<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRecipeStore } from '@/stores/recipies'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const { addRecipe } = useRecipeStore()

interface Recipe{
    title: string
    description?: string
    ingredients: string[] 
    steps: string[]
    image: string | null
    nutrition: string[]
}
const form: Recipe = reactive({
    title : '',
    description: '',
    ingredients: [''],
    steps: [''],
    image: null,
    nutrition: [''],
})
function addIngredient() {
  form.ingredients.push('')
}
function removeIngredient(index: number) {
  form.ingredients.splice(index, 1)
}

function addStep() {
  form.steps.push('')
}
function removeStep(index: number) {
  form.steps.splice(index, 1)
}

function addNutrition() {
  form.nutrition.push('')
}
function removeNutrition(index: number) {
  form.nutrition.splice(index, 1)
}

</script>

<template>
  <form @submit.prevent="addRecipe(form)" class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6">

    <div>
      <label class="block font-semibold text-gray-700 mb-1">Judul Resep</label>
      <input v-model="form.title" type="text" required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Contoh: Nasi Goreng Spesial" />
    </div>


    <div>
      <label class="block font-semibold text-gray-700 mb-1">Deskripsi</label>
      <textarea v-model="form.description"
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows="3" placeholder="Deskripsi singkat resep..."></textarea>
    </div>


    <div>
      <label class="block font-semibold text-gray-700 mb-1">URL Gambar</label>
      <input v-model="form.image" type="text" required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="https://example.com/image.jpg" />
    </div>


    <div>
      <label class="block font-semibold text-gray-700 mb-2">Bahan-bahan</label>
      <div class="space-y-3">
        <div v-for="(item, index) in form.ingredients" :key="'ingr-' + index" class="flex gap-2">
          <input v-model="form.ingredients[index]" type="text"
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Contoh: 2 siung bawang putih" />
          <button type="button" @click="removeIngredient(index)"
            class="text-red-500 hover:text-red-700 transition">🗑</button>
        </div>
        <button type="button" @click="addIngredient"
          class="text-blue-600 hover:underline text-sm">+ Tambah Bahan</button>
      </div>
    </div>


    <div>
      <label class="block font-semibold text-gray-700 mb-2">Langkah Memasak</label>
      <div class="space-y-3">
        <div v-for="(step, index) in form.steps" :key="'step-' + index" class="flex gap-2">
          <textarea v-model="form.steps[index]" rows="2"
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Langkah memasak ke-{{ index + 1 }}"></textarea>
          <button type="button" @click="removeStep(index)"
            class="text-red-500 hover:text-red-700 transition">🗑</button>
        </div>
        <button type="button" @click="addStep"
          class="text-blue-600 hover:underline text-sm">+ Tambah Langkah</button>
      </div>
    </div>

    <div>
      <label class="block font-semibold text-gray-700 mb-2">Informasi Gizi</label>
      <div class="space-y-3">
        <div v-for="(nutri, index) in form.nutrition" :key="'nutri-' + index" class="flex gap-2">
          <input v-model="form.nutrition[index]" type="text"
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Contoh: Kalori 250 kcal" />
          <button type="button" @click="removeNutrition(index)"
            class="text-red-500 hover:text-red-700 transition">🗑</button>
        </div>
        <button type="button" @click="addNutrition"
          class="text-blue-600 hover:underline text-sm">+ Tambah Informasi Gizi</button>
      </div>
    </div>

    <div class="pt-4">
      <button type="submit"
        class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Simpan
        Resep</button>
    </div>
  </form>
</template>



<style scoped>

</style>