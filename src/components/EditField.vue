<script lang="ts" setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Description',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const isActive = ref(false)
const inputWidth = ref('auto')
const inputValue = ref(props.text)
const spanRef = ref<HTMLSpanElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
nextTick(() => {
  resizeField()
})

const focusInput = () => {
  if (!inputRef.value) return

  isActive.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const blurInput = () => {
  if (!inputRef.value) return

  isActive.value = false
  nextTick(() => {
    inputValue.value = inputValue.value.trim() || props.text
    resizeField()
  })
}

const resizeField = () => {
  if (!spanRef.value) return

  isActive.value = false
  nextTick(() => {
    inputWidth.value = `${(spanRef.value?.offsetWidth || 0) + 1}px`
    isActive.value = true
  })
}
</script>

<template>
  <span>
    <input
      type="text"
      ref="inputRef"
      v-show="isActive"
      v-model="inputValue"
      :required="required"
      @input="resizeField"
      @blur="blurInput"
      :style="{ width: inputWidth }"
      aria-label="Editable text field"
    />
    <span ref="spanRef" v-show="!isActive" @click="focusInput">
      {{ inputValue }}
    </span>
  </span>
</template>
