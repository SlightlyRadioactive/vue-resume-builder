<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const text = ref('Description')
const textarea = ref<HTMLTextAreaElement | null>(null)

const resizeTextarea = () => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto' // Reset height
  textarea.value.style.height = textarea.value.scrollHeight + 'px' // Set new height
}

// Ensure initial resizing when the component is mounted
onMounted(() => {
  resizeTextarea()
})
</script>

<template>
  <textarea
    v-model="text"
    @input="resizeTextarea"
    ref="textarea"
    rows="1"
    class="w-full"
  ></textarea>
</template>
