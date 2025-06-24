<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
const props = defineProps<{ group?: string }>()
</script>

<template>
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
      props.group ? `group-hover/${props.group}:inline` : 'group-hover:inline',
    ]"
  >
    <FontAwesomeIcon class="text-lg" :icon="faTrashCan" />
  </button>
</template>
