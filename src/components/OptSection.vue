<script lang="ts" setup>
import EditField from '@/components/EditField.vue'

const emit = defineEmits(['update'])

const { text = 'Title' } = defineProps<{ text?: string }>()
</script>

<template>
  <div class="group/add w-full flex flex-col py-1">
    <EditField @update="(value) => emit('update', value)" :text="text" class="font-bold" />
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
