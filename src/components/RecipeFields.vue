<script setup lang="ts">
import { Field } from 'vee-validate'
import type { FormContext, FieldArrayContext, FieldEntry } from 'vee-validate'

interface FieldSchema {
  name: string
  label: string
  type: 'text' | 'textarea' | 'file' | 'array' | 'steps'
  placeholder?: string
}

const props = defineProps<{
  schema: FieldSchema[]
  form: FormContext
  fieldArrays?: Record<string, FieldArrayContext>
  onFileChange?: (e: Event) => void
  onAddField?: (name: string) => void
  onRemoveField?: (name: string, index: number) => void
}>()
</script>

<template>
  <div>
    <div v-for="field in schema" :key="field.name" class="mb-4">

      <template v-if="field.type === 'text' || field.type === 'textarea'">
        <label class="block mb-1">{{ field.label }}</label>
        <Field :as="field.type" :name="field.name" :placeholder="field.placeholder" class="border px-2 py-1 w-full" />
        <p class="text-red-500 text-sm">{{ form.errors.value?.[field.name] }}</p>
      </template>

      <template v-else-if="field.type === 'file'">
        <label class="block mb-1">{{ field.label }}</label>
        <input type="file" @change="onFileChange" class="w-full" />
        <p class="text-red-500 text-sm">{{ form.errors.value?.[field.name] }}</p>
      </template>

      <template v-else-if="field.type === 'array' && Array.isArray(fieldArrays?.[field.name]?.fields)">
        <label class="block mb-1">{{ field.label }}</label>
        <div
          v-for="(item, index) in fieldArrays![field.name]!.fields.value as FieldEntry[]"
          :key="index"
          class="flex gap-2 mb-1"
        >
          <Field :name="`${field.name}[${index}]`" class="border px-2 py-1 w-full" />
          <button type="button" @click="onRemoveField?.(field.name, index)">❌</button>
        </div>
        <button type="button" @click="onAddField?.(field.name)" class="text-blue-600 text-sm">+ Add {{ field.label }}</button>
        <p class="text-red-500 text-sm">{{ form.errors.value?.[field.name] }}</p>
      </template>

      <template v-else-if="field.type === 'steps' && Array.isArray(fieldArrays?.[field.name]?.fields)">
        <label class="block mb-1">{{ field.label }}</label>
        <div
          v-for="(step, index) in fieldArrays![field.name]!.fields.value as FieldEntry[]"
          :key="index"
          class="border rounded-md p-3 mb-2 space-y-2"
        >
          <div>
            <label class="text-sm">Step</label>
            <Field :name="`${field.name}[${index}].step`" class="border px-2 py-1 w-full" />
          </div>
          <div>
            <label class="text-sm">Instruction</label>
            <Field :name="`${field.name}[${index}].instruction`" as="textarea" class="border px-2 py-1 w-full" />
          </div>
          <button type="button" @click="onRemoveField?.(field.name, index)" class="text-sm text-red-500">Remove Step</button>
        </div>
        <button type="button" @click="onAddField?.(field.name)" class="text-blue-600 text-sm">+ Add Step</button>
        <p class="text-red-500 text-sm">{{ form.errors.value?.[field.name] }}</p>
      </template>
    </div>
  </div>
</template>
