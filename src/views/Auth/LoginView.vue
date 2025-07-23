<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import * as Yup from 'yup'
import DynamicForm from '@/components/DynamicForm.vue'
import { RouterLink } from 'vue-router'

const { authenticate } = useAuthStore()

const formSchema = {
  forms:{
    name : 'Sign In'
  },
  fields: [
    {
      label: 'Email',
      name: 'email',
      as: 'input',
      type: 'text',
      rules: Yup.string().required().email(),
    },
    {
      label: 'Password',
      name: 'password',
      as: 'input',
      type: 'password',
      rules: Yup.string().required().min(8)
    }
  ]
};

async function handleSubmit(values: {}){
  await authenticate('login', values);
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
  <div class="bg-[#F86D36] hidden lg:inline">
    <div class="flex flex-col gap-[58px]">
        <div class="flex flex-row justify-between items-center mx-10 mt-10">
          <h5 class="font-bold leading-1.5 text-[1.438rem] text-[#FCF1E0]">Masak Yuk</h5>
          <RouterLink class="text-[#FCF1E0]" :to="{name: 'home'}">Back</RouterLink>
        </div>
        <div class="flex flex-col justify-center items-center gap-[58px]">
          <h1 class="text-[4.188rem] font-bold text-[#FCF1E0] uppercase tracking-wide">Welcome</h1>
          <div class="pt-10">
            <img src="@/assets/image/ayam-goreng.png" alt="">
          </div>
          <p class="text-base text-[#FCF1E0] text-center px-20 leading-7 pt-8 tracking-wide font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec sapien ultrices, sagittis metus ut, cursus quam. Fusce iaculis euismod sem, eget cursus libero pharetra id. In hac habitasse platea dictumst. </p>
        </div>
    </div>
  </div>
  <div class="flex justify-center items-center bg-[#FCF1E0] px-[16px] md:px-30 lg:px-60">
    <div class="bg-white py-4 px-4 w-full shadow-[0px_4px_0px_-1px_#000000] border border-black rounded-xl">
      <div class="flex flex-col space-y-2">
        <h3 class="text-[1.75rem] font-bold tracking-wide">Login</h3>
        <p class="text-sm lg:text-base text-[#4C4C4C] tracking-wide">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <DynamicForm :schema="formSchema" @onSubmit="handleSubmit"/>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>