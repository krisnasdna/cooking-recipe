<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRecipeStore } from '@/stores/recipies'
import { uploadImage } from '@/utils/uploadImage'
import { storeToRefs } from 'pinia'
import { useForm,useFieldArray } from 'vee-validate'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as Yup from 'yup'
const {recipe,loading} = storeToRefs(useRecipeStore())
const { editRecipe, getMyRecipeById } = useRecipeStore()
const route = useRoute()
const id: number = Number(route.params.id)

const MAX_FILE_SIZE = 5 * 1024 * 1024; 

type FileType = 'image';

const validFileExtensions: Record<FileType, string[]> = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string, fileType: FileType): boolean {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  return validFileExtensions[fileType].includes(ext);
}

const {errors, values, defineField,handleSubmit, resetForm} = useForm({
  initialValues:{
    title: '',
    image: null as File | null,
    ingredients:  [''],
    utensils: [''],
    steps:[{ step: '', instruction: '' }]
  },
  validationSchema:{
    title : Yup.string().required('Title is required'),
    image: Yup.mixed()
    .test('is-valid-type', 'Not a valid image type', (value) => {
      if (value instanceof File) {
        return isValidFileType(value.name.toLowerCase(), 'image');
      }
      return false;
    })
    .test('is-valid-size', 'Max allowed size is 10Mb', (value) => {
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
    let imageUrl = recipe.value?.image || ''
    if(values.image instanceof File){
        imageUrl  = await uploadImage(values.image!, 'recipe')
    }
    
    const payload = {
        ...values,
        image: imageUrl,
    };

    editRecipe(id,payload)
    console.log(payload)
  } catch (err) {
    console.error('Edit recipe error', err)
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
onMounted(async () => {
  await getMyRecipeById(id)
  
  if (recipe.value) {
    resetForm({
      values: {
        title: recipe.value.title,
        image: null,
        ingredients: recipe.value.ingredients || [''],
        utensils: recipe.value.utensils || [''],
        steps: recipe.value.steps || [{ step: '', instruction: '' }],
      }
    })
  }
})

</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <form @submit.prevent="onSubmit" class="space-y-6" v-else>
    <input v-model="title" placeholder="Title" class="input" v-bind="titleAttrs" />
    <p>{{ errors.title }}</p>

    <div v-if="recipe?.image && !values.image">
        <p class="text-sm">Current image:</p>
        <img :src="recipe.image" class="w-32 h-32 object-cover rounded border" />
    </div>
    <div v-if="isFile(values.image)">
        <p class="text-sm">New image preview:</p>
        <img :src="previewUrl" class="w-32 h-32 object-cover rounded border" />
    </div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <p>{{ errors.image }}</p>
    <div v-for="(ingredient, i) in ingredientField" :key="i" class="flex gap-2">
      <input v-model="ingredient.value" placeholder="Ingredient" class="input" />
      <button type="button" @click="removeIngredients(i)">❌</button>
    </div>
     <p>{{ errors.ingredients }}</p>
    <button type="button" @click="addIngredient('')" class="btn">+ Add Ingredient</button>
    <div v-for="(utensil, i) in utensilField" :key="i" class="flex gap-2">
      <input v-model="utensil.value" placeholder="utensil" class="input" />
      <button type="button" @click="removeUtensil(i)">❌</button>
    </div>
    <p>{{ errors.utensils }}</p>
    <button type="button" @click="addUtensil('')" class="btn">+ Add Utensils</button>
    <div
      v-for="(step, i) in stepsField"
      :key="i"
      class="space-y-2 border p-2 rounded bg-gray-50"
    >
      <input v-model="step.value.step" placeholder="Step Title" class="input" />
      <textarea
        v-model="step.value.instruction"
        placeholder="Instruction"
        class="textarea"
      />
      <p>{{ errors.steps }}</p>
      <button type="button" @click="removeSteps(i)">❌</button>
    </div>
    <button type="button" @click="addSteps({step: '', instruction: ''})" class="btn">+ Add Step</button>
    <button type="submit">
      submit
    </button>
  </form>
</template>

<style scoped>

</style>