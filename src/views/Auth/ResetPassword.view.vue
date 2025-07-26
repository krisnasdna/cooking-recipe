<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import * as Yup from 'yup'
import DynamicForm from '@/components/DynamicForm.vue'
import Logo from '@/components/Logo.vue'
const {resetPassword} = useAuthStore()

const formSchema = {
  forms:{
    name : 'Reset'
  },
  fields: [
    {
      label: 'Password',
      name: 'password',
      as: 'input',
      type: 'password',
      placeholder: '•••••••••••',
      rules: Yup.string().required().min(8),
    },
    {
      label: 'Konfirmasi Password',
      name: 'password_confirmation',
      as: 'input',
      type: 'password',
      placeholder: '•••••••••••',
      rules: Yup.string().required(),
    },
  ]
};

async function handleSubmit(values : {}){
    await resetPassword(values);
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen md:overflow-hidden">
  <div class=" hidden lg:inline">
    <img src="@/assets/image/auth2.jpg" alt="" class="object-center object-cover w-full h-full">
  </div>
  <div class="flex flex-col bg-[#FCF1E0] py-10 px-4 md:px-10 lg:px-15 h-full w-full">
    <div class="flex flex-row justify-between items-center justify-self-start w-full shrink-0">
      <div>
        <Logo/>
      </div>
      <div>
        <RouterLink :to="{name: 'home'}" class="text-[#221F20] text-base font-medium">Back</RouterLink>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center px-4 md:px-0 2xl:px-40 h-full pt-10 md:pt-0">
      <div class="w-full">
        <div class="flex flex-col space-y-2">
          <h3 class="text-[1.875rem] md:text-[2.563rem] font-bold tracking-wide text-center text-[#221F20]">Reset Password</h3>
        </div>
        <DynamicForm :schema="formSchema" @onSubmit="handleSubmit"/>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>