<script lang="ts" setup>
import { ref, nextTick, watch, onMounted } from 'vue'

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{ text?: string; required?: boolean }>(), {
  text: 'Description',
  required: false,
})

const isActive = ref(false)
const inputWidth = ref('auto')
const inputValue = ref(props.text)
const spanRef = ref<HTMLSpanElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
  if (!inputRef.value) return
  isActive.value = true
  inputRef.value?.focus()
}

const blurInput = () => {
  if (!inputRef.value) return

  isActive.value = false
  nextTick(() => {
    inputValue.value = inputValue.value || props.text
    emit('update', inputValue.value)
    resizeField()
  })
}

const resizeField = () => {
  if (!spanRef.value) return

  isActive.value = false
  nextTick(() => {
    if (spanRef.value) {
      const lineHeight = parseFloat(spanRef.value.style.lineHeight || '0')
      spanRef.value.style.wordBreak =
        spanRef.value.offsetHeight > lineHeight ? 'break-all' : 'normal'

      inputWidth.value = `${(spanRef.value?.offsetWidth || 0) + 1}px`
    }
    isActive.value = true
  })
}

watch(
  () => props.text,
  (newText) => {
    inputValue.value = newText
    resizeField()
  },
)

onMounted(resizeField)
</script>

<template>
  <span>
    <input
      type="text"
      ref="inputRef"
      v-show="isActive"
      v-model="inputValue"
      :required="props.required"
      @input="resizeField"
      @blur="blurInput"
      :style="{ width: inputWidth }"
      aria-label="Editable text field"
    />
    <span ref="spanRef" class="whitespace-pre" v-show="!isActive" @click="focusInput">
      {{ inputValue }}
    </span>
  </span>
</template>
