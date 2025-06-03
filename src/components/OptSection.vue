<script lang="ts" setup>
import { defineProps } from 'vue'
import EditField from '@/components/EditField.vue'

defineProps({
  text: {
    type: String,
    default: 'Title',
  },
})
</script>

<template>
  <div class="group/add w-full flex flex-col py-1">
    <EditField :text="text" class="font-bold" />
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
