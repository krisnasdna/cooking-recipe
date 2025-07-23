<template>
  <Form @submit="onSubmit">
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
      class="flex flex-col pt-5"
    >
      <label :for="name" class="block font-medium mb-1">{{ label }}</label>

      <Field
        :as="as"
        :id="name"
        :name="name"
        v-bind="attrs"
        class="w-full border p-2 rounded"
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

      <ErrorMessage :name="name" class="text-red-500 text-sm" />

      <p v-if="serverErrors?.[name]" class="text-red-600 text-sm mt-1">
        {{ serverErrors[name][0] }}
      </p>
    </div>

    <div class="pt-4 flex flex-col items-center gap-5">
      <div class="self-end" v-if="schema.forms.name === 'Sign In'">
        <RouterLink
          :to="{ name: 'forgetPassword' }"
          class="border-b border-dashed text-[#4A52E6] text-sm"
        >
          Lupa Password?
        </RouterLink>
      </div>

      <div class="w-[85%] pt-4">
        <button
          type="submit"
          class="bg-[#F86D36] py-2 px-1 text-white rounded-lg w-full text-lg shadow-[0px_4px_0px_-1px_#000000] border border-black tracking-wide"
        >
          {{ schema.forms.name }}
        </button>
      </div>

      <div class="pb-2 pt-4">
        <p v-if="schema.forms.name === 'Sign In'">
          Don't have an account?
          <RouterLink :to="{ name: 'register' }" class="text-[#4A52E6]">Sign Up</RouterLink>
        </p>
        <p v-else-if="schema.forms.name === 'Sign Up'">
          Already have an account?
          <RouterLink :to="{ name: 'register' }" class="text-[#4A52E6]">Sign Up</RouterLink>
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

const serverErrors = rawServerErrors as unknown as Record<string, string[]>
</script>
