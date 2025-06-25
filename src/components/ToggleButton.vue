<script lang="ts" setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const emit = defineEmits(['update'])

const props = withDefaults(
  defineProps<{ container?: 'div' | 'span'; group?: string; show?: boolean }>(),
  { container: 'div', show: true },
)
const isVisible = ref(props.show)

watch(
  () => props.show,
  (newShow) => (isVisible.value = newShow),
)
</script>

<template>
  <component
    :is="props.container"
    :class="`${props.container == 'div' ? 'flex' : ''} print:hidden`"
  >
    <button
      type="button"
      @click="emit('update', !isVisible)"
      :class="[
        'px-1',
        'hidden',
        'rounded-2xl',
        'print:hidden',
        'text-white',
        'bg-gray-600',
        'hover:bg-gray-800',
        props.group ? `group-hover/${props.group}:inline` : 'group-hover:inline',
      ]"
    >
      <FontAwesomeIcon v-if="isVisible" :icon="faEyeSlash" />
      <FontAwesomeIcon v-else :icon="faEye" />
    </button>
  </component>
</template>
