<script lang="ts" setup>
import { defineEmits, defineProps, ref, nextTick, watch } from 'vue'

const emit = defineEmits(['update'])

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

watch(
  () => props.text,
  (newText) => {
    inputValue.value = newText
    resizeField()
  },
)

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
    emit('update', inputValue.value)
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
