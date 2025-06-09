<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const { text = 'Description' } = defineProps<{ text?: string }>()
const description = ref(text)
const textarea = ref<HTMLTextAreaElement | null>(null)

watch(
  () => text,
  (newText) => {
    description.value = newText
  },
)

const emit = defineEmits(['update'])

const updateDescription = (value: string) => {
  description.value = value
  emit('update', value)
}

const resizeTextarea = () => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto' // Reset height
  textarea.value.style.height = textarea.value.scrollHeight + 'px' // Set new height
  updateDescription(textarea.value.value)
}

onMounted(() => {
  resizeTextarea()
})
</script>

<template>
  <textarea
    rows="1"
    ref="textarea"
    class="w-full"
    v-model="description"
    @input="resizeTextarea"
  ></textarea>
</template>
