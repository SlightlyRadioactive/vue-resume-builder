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
      props.group ? `group-hover/${props.group}:inline` : 'group-hover:inline',
    ]"
  >
    ❌
  </button>
</template>
