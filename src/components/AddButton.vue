<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <button
    type="button"
    :class="[
      'px-2',
      'hidden',
      'text-lg',
      'font-bold',
      'bg-black',
      'rounded-3xl',
      'print:hidden',
      'text-white',
      'hover:bg-gray-800',
      'group-hover/add:inline',
    ]"
  >
    <FontAwesomeIcon class="text-lg" :icon="faPlus" />
  </button>
</template>
