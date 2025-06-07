<script lang="ts" setup>
import { defineProps, ref, onMounted, defineEmits, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Description',
  },
})

const description = ref(props.text)
const textarea = ref<HTMLTextAreaElement | null>(null)

watch(
  () => props.text,
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
    v-model="description"
    @input="resizeTextarea"
    ref="textarea"
    rows="1"
    class="w-full"
  ></textarea>
</template>
