<script lang="ts" setup>
const props = withDefaults(defineProps<{ text?: string; color?: string }>(), {
  text: 'Button',
  color: 'gray',
})

let colors = 'bg-gray-500 hover:bg-gray-700'
if (props.color == 'black') colors = 'bg-black hover:bg-gray-800'
</script>

<template>
  <button type="button" :class="`btn ${colors}`">{{ props.text }}</button>
</template>
