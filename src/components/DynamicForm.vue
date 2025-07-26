<template>
  <Form @submit="onSubmit">
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
      class="flex flex-col pt-6 text-[#221F20]"
    >
      <label :for="name" class="block font-medium pb-2">{{ label }}</label>

      <Field
        :disabled="loading"
        :as="as"
        :id="name"
        :name="name"
        v-bind="attrs"
        class="w-full bg-white py-4 px-4 md:py-4 md:px-6 rounded-2xl disabled:bg-[#F4F4F4]"
      />

      <template v-if="children && children.length">
        <component
          v-for="({ tag, text, ...childAttrs }, idx) in children"
          :key="idx"
          :is="tag"
          v-bind="childAttrs"
        >
          {{ text }}
        </component>
      </template>

      <ErrorMessage :name="name" class="text-red-500 text-sm pt-1" />

      <p v-if="serverErrors?.[name]" class="text-red-600 text-sm pt-1">
        {{ serverErrors[name][0] }}
      </p>
    </div>

    <div class="py-4 flex flex-col items-center gap-4">
      <div class="self-end" v-if="schema.forms.name === 'Sign In'">
        <RouterLink
          :to="{ name: 'forgetPassword' }"
          class="border-b border-dashed text-[#4A52E6] text-sm"
        >
          Forgot Password?
        </RouterLink>
      </div>

      <div class="w-full py-4">
        <button
          type="submit"
          class="bg-[#221F20] py-2 px-1 text-white w-full text-lg tracking-wide font-bold rounded-3xl"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' :schema.forms.name   }}
        </button>
      </div>

      <div class="pb-2">
        <p v-if="schema.forms.name === 'Sign In'" class="text-sm text-[#221F20]">
          Don't have an account?
          <RouterLink :to="{ name: 'register' }" class="text-[#4A52E6]"> Sign Up</RouterLink>
        </p>
        <p v-else-if="schema.forms.name === 'Sign Up'" class="text-sm text-[#221F20]">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="text-[#4A52E6]"> Sign In</RouterLink>
        </p>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'


interface FormField {
  as: string
  name: string
  label: string
  children?: Array<{
    tag: string
    text: string
    [key: string]: any
  }>
  [key: string]: any
}


interface FormSchema {
  fields: FormField[]
  forms: {
    name: string
  }
}


const props = defineProps<{
  schema: FormSchema
}>()


const emit = defineEmits<{
  (e: 'onSubmit', values: Record<string, any>): void
}>()


const onSubmit = (values: Record<string, any>) => {
  emit('onSubmit', values)
}

const { error: rawServerErrors } = storeToRefs(useAuthStore())
const { loading } = storeToRefs(useAuthStore()) 
const serverErrors = rawServerErrors as unknown as Record<string, string[]>
</script>
