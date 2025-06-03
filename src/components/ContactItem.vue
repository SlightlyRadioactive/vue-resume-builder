<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import EditField from '@/components/EditField.vue'

defineProps({
  text: {
    type: String,
    default: 'Contact',
  },
})

const isVisible = ref(true)
</script>

<template>
  <span v-if="isVisible" class="group gap-2 rounded-2xl hover:bg-gray-700 p-2">
    <EditField :text="text" />
    <button
      type="button"
      @click="isVisible = false"
      class="hidden group-hover:inline rounded-2xl hover:bg-gray-800"
    >
      ❌
    </button>
  </span>
</template>
