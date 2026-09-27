<script setup lang="ts">
import { computed } from 'vue'
import type { ContactFormData, FormField } from './types'

const props = defineProps<{ data: ContactFormData }>()
const emit = defineEmits<{
  (e: 'submit', values: Record<string, string>): void
}>()

const d = computed(() => ({
  submitText: '发送消息',
  ...props.data,
}))

/**
 * text / email 且未显式声明 full 的字段并排两列，
 * 其余字段（full 文本、select、textarea）独占一行。
 */
const inlineFields = computed<FormField[]>(() =>
  d.value.fields.filter(
    (f) => (f.type === 'text' || f.type === 'email') && f.width !== 'full'
  )
)

const stackedFields = computed<FormField[]>(() =>
  d.value.fields.filter((f) => !inlineFields.value.includes(f))
)

function handleSubmit(e: Event) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const fd = new FormData(form)
  const values: Record<string, string> = {}
  fd.forEach((v, k) => (values[k] = String(v)))
  emit('submit', values)
}
</script>

<template>
  <section :id="d.id" :class="['bg-gray-50 py-20 dark:bg-gray-900', d.class]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-if="d.title || d.description" class="mb-12 text-center">
        <h2 v-if="d.title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ d.title }}</h2>
        <p v-if="d.description" class="mt-2 text-lg text-gray-600 dark:text-gray-400">{{ d.description }}</p>
      </div>
      <div class="mx-auto max-w-3xl">
        <form class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950" @submit="handleSubmit">
          <!-- 并排字段 -->
          <div v-if="inlineFields.length" class="grid gap-4 sm:grid-cols-2">
            <div v-for="field in inlineFields" :key="field.name">
              <label :for="field.name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input :id="field.name" :name="field.name" :type="field.type" :placeholder="field.placeholder" :required="field.required"
                     class="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:focus:bg-gray-900" />
            </div>
          </div>

          <!-- 独占一行字段 -->
          <template v-for="field in stackedFields" :key="field.name">
            <div class="mt-4">
              <label :for="field.name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>

              <select v-if="field.type === 'select'" :id="field.name" :name="field.name" :required="field.required"
                      class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800">
                <option value="">{{ field.placeholder ?? '请选择' }}</option>
                <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>

              <textarea v-else-if="field.type === 'textarea'" :id="field.name" :name="field.name" :placeholder="field.placeholder" :required="field.required" rows="4"
                        class="w-full resize-y rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800" />

              <input v-else :id="field.name" :name="field.name" :type="field.type" :placeholder="field.placeholder" :required="field.required"
                     class="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:focus:bg-gray-900" />
            </div>
          </template>

          <div class="mt-6">
            <button type="submit"
                    class="w-full rounded-full bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700">
              {{ d.submitText }}
            </button>
            <p v-if="d.footerNote" class="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">{{ d.footerNote }}</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
