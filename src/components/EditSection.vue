<script lang="ts" setup>
import EditField from '@/components/EditField.vue'

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{ text?: string }>(), { text: 'Title' })
</script>

<template>
  <div class="group/add w-full flex flex-col py-1">
    <EditField class="font-bold" :text="props.text" @update="emit('update', $event)" />
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
