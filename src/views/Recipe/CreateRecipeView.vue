<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipies'
import { uploadImage } from '@/utils/uploadImage'
import { storeToRefs } from 'pinia'
import { useForm,useFieldArray } from 'vee-validate'
import { computed, reactive, ref } from 'vue'
import * as Yup from 'yup'
const {loading} = storeToRefs(useRecipeStore())
const { addRecipe } = useRecipeStore()

const MAX_FILE_SIZE = 5 * 1024 * 1024; 

type FileType = 'image';

const validFileExtensions: Record<FileType, string[]> = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string, fileType: FileType): boolean {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  return validFileExtensions[fileType].includes(ext);
}
const {errors, values, defineField,handleSubmit} = useForm({
  initialValues:{
    title: '',
    image: null as File | null,
    ingredients: [''],
    utensils: [''],
    steps: [
      {
        step: '', 
        instruction: ''
      }
    ]
  },
  validationSchema:{
    title : Yup.string().required('Title is required'),
    image: Yup.mixed().required('Image is required')
    .test('is-valid-type', 'Not a valid image type', (value) => {
      if (value instanceof File) {
        return isValidFileType(value.name.toLowerCase(), 'image');
      }
      return false;
    })
    .test('is-valid-size', 'Max allowed size is 5Mb', (value) => {
      if (value instanceof File) {
        return value.size <= MAX_FILE_SIZE;
      }
      return false;
    }),
    ingredients: Yup.array().of(Yup.string().required('Ingredient cannot be empty')).min(1, 'At least one ingredient is required').required('Ingredients are required'),
    utensils: Yup.array().of(Yup.string().required('Utensil cannot be empty')).min(1, 'At least one Utensil is required').required('Utensils are required'),
    steps: Yup.array().of(Yup.object({step: Yup.string().required('Step is required'),instruction: Yup.string().required('Instruction is required'),})).min(1, 'At least one step is required').required('Steps are required'),
  }
});

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if(file){
    image.value = file
  }
}

const onSubmit = handleSubmit( async values =>{
  try {
    const url = await uploadImage(values.image!, 'recipe')

    const payload = {
        ...values,
        image: url,
    };

    addRecipe(payload)
    console.log(payload)
  } catch (err) {
    console.error('Create recipe error', err)
  }
})

const [title, titleAttrs]= defineField('title')
const [image]= defineField('image')
const {fields:ingredientField, push: addIngredient,remove: removeIngredients} = useFieldArray('ingredients')
const {fields:utensilField, push: addUtensil,remove: removeUtensil} = useFieldArray('utensils')
const { fields:stepsField, push: addSteps, remove: removeSteps} = useFieldArray<{ step: string; instruction: string }>('steps')
function isFile(obj: unknown): obj is File {
  return obj instanceof File
}
const previewUrl = computed(() => {
  if (isFile(values.image)) {
    return window.URL.createObjectURL(values.image)
  }
  return undefined 
})
</script>

<template>
  <div class="flex flex-col px-4 pt-10 md:px-10 lg:px-15 md:py-20 gap-10">
    <h1 class="text-[2.563rem] md:text-[3.438rem] 2xl:text-[4.563rem] font-semibold text-[#221F20] leading-[120%]">Create Recipe</h1>
    <div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="flex flex-col">
        <label for="title" class="text-[#221F20] font-medium pb-2">Title</label>
        <input v-model="title" placeholder="Title" class="w-full bg-white py-4 px-4 md:py-2 md:px-2 rounded-lg disabled:bg-[#F4F4F4]" v-bind="titleAttrs" name="title" :disabled="loading"/>
        <p class="text-sm text-red-500 pt-1">{{ errors.title }}</p>
      </div>
      <div class="flex flex-col">
        <div v-if="isFile(values.image)">
          <p class="text-sm">New image preview:</p>
          <img :src="previewUrl" class="w-32 h-32 object-cover rounded border" />
        </div>
        <label for="image" class="text-[#221F20] font-medium pb-2">Upload Image</label>
        <input type="file" @change="onFileChange" accept="image/*" name="image" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2" :disabled="loading"/>
        <p class="text-sm text-red-500 pt-1">{{ errors.image }}</p>
      </div>
      <p>{{ errors.image }}</p>
      <div class="flex flex-col">

        <label for="ingredients" class="text-[#221F20] font-medium">Ingredient</label>
        <div v-for="(ingredient, i) in ingredientField" :key="i" class="flex flex-row items-center gap-4 pt-2">
          <input v-model="ingredient.value" placeholder="Ingredient" class="w-full bg-white py-4 px-4 md:py-2 md:px-2 rounded-lg disabled:bg-[#F4F4F4]" name="ingredients" :disabled="loading"/>
          <button type="button" @click="removeIngredients(i)" class="cursor-pointer">
            <div class="w-6">
              <img src="@/assets/image/remove.png" alt=""></img>
            </div>
          </button>
        </div>
        <p class="text-sm text-red-500 pt-1">{{ errors.ingredients }}</p>
        <div class="pt-4">
          <button type="button" @click="addIngredient('')"  class="border-[#221F20] border text-[#221F20] px-4 py-2 rounded-lg cursor-pointer">Add Ingredient</button>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="utensil" class="text-[#221F20] font-medium">Utensils</label>
        <div v-for="(utensil, i) in utensilField" :key="i" class="flex flex-row items-center gap-4 pt-2">
          <input v-model="utensil.value" placeholder="Utensils" class="w-full bg-white py-4 px-4 md:py-2 md:px-2 rounded-lg disabled:bg-[#F4F4F4]" name="utensil" :disabled="loading"/>
          <button type="button" @click="removeUtensil(i)" class="cursor-pointer">
            <div class="w-6">
              <img src="@/assets/image/remove.png" alt=""></img>
            </div>
          </button>
        </div>
        <p class="text-sm text-red-500 pt-1">{{ errors.utensils }}</p>
        <div class="pt-4">
          <button type="button" @click="addUtensil('')"  class="border-[#221F20] border text-[#221F20] px-4 py-2 rounded-lg cursor-pointer">Add Utensils</button>
        </div>
      </div>
      <div>
        <label for="utensil" class="text-[#221F20] font-medium">Steps</label>
        <div
          v-for="(step, i) in stepsField"
          :key="i"
          class=" flex flex-col gap-2 pt-2" 
        >
          <div class="flex flex-row gap-4">
            <input v-model="step.value.step" placeholder="Step Title" class="w-full bg-white py-4 px-4 md:py-2 md:px-2 rounded-lg disabled:bg-[#F4F4F4]"  :disabled="loading"/>
            <button type="button" @click="removeSteps(i)" class="cursor-pointer">
            <div class="w-6">
              <img src="@/assets/image/remove.png" alt=""></img>
            </div>
            </button>
          </div>
          <textarea
            v-model="step.value.instruction"
            placeholder="Instruction"
            class="w-full bg-white py-4 px-4 md:py-2 md:px-2 rounded-lg disabled:bg-[#F4F4F4]"
            :disabled="loading" 
          />
        </div>
        <p class="text-sm text-red-500 pt-1">{{ errors.steps }}</p>
        <div class="pt-4">
            <button type="button" @click="addSteps({step: '', instruction: ''})"  class="border-[#221F20] border text-[#221F20] px-4 py-2 rounded-lg cursor-pointer">Add Steps</button>
        </div>
      </div>
      <div class="text-center py-10">
        <button type="submit" class="bg-[#221F20] text-white px-10 py-2 rounded-3xl cursor-pointer">
          {{ loading ? 'Processing...' : 'Submit'}}
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<style scoped>

</style>