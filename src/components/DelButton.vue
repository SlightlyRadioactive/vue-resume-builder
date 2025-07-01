<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const props = withDefaults(defineProps<{ container?: 'div' | 'span'; addStyle?: string }>(), {
  container: 'div',
})
</script>

<template>
  <component
    :is="props.container"
    :class="`${props.container == 'div' ? 'flex' : ''} print:hidden`"
  >
    <button
      type="button"
      :class="[
        'px-1',
        'hidden',
        'rounded-2xl',
        'print:hidden',
        'text-white',
        'bg-red-600',
        'hover:bg-red-800',
        props.addStyle ?? 'group-hover:inline',
      ]"
    >
      <FontAwesomeIcon :icon="faTrashCan" />
    </button>
  </component>
</template>
