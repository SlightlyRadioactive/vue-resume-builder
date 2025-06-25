<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const props = withDefaults(defineProps<{ container?: 'div' | 'span' }>(), { container: 'div' })
</script>

<template>
  <component
    :is="props.container"
    :class="`${props.container == 'div' ? 'w-full flex flex-col' : ''} print:hidden`"
  >
    <button
      type="button"
      :class="[
        'px-1.5',
        'hidden',
        'font-bold',
        'bg-black',
        'rounded-3xl',
        'print:hidden',
        'text-white',
        'hover:bg-gray-800',
        'group-hover/add:inline',
      ]"
    >
      <FontAwesomeIcon :icon="faPlus" />
    </button>
  </component>
</template>
