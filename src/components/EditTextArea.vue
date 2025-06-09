<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: 'Description' })
const description = ref(props.modelValue)
const textarea = ref<HTMLTextAreaElement | null>(null)

watch(
  () => props.modelValue,
  (newText) => (description.value = newText),
)

const resizeTextarea = () => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto' // Reset height
  textarea.value.style.height = textarea.value.scrollHeight + 'px' // Set new height
  emit('update:modelValue', description.value)
}

onMounted(resizeTextarea)
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
