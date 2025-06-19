<script lang="ts" setup>
const props = defineProps<{ group?: string }>()
</script>

<template>
  <button
    type="button"
    :class="[
      'hidden',
      'rounded-2xl',
      'hover:bg-gray-800',
      `group-hover${props.group ? '/' + props.group : ''}:inline`,
    ]"
  >
    ❌
  </button>
</template>
