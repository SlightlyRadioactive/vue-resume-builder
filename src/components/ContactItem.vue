<script lang="ts" setup>
import EditField from '@/components/EditField.vue'
import DelButton from '@/components/DelButton.vue'

const emit = defineEmits(['remove', 'update'])

const { text = 'Contact' } = defineProps<{ text?: string }>()
</script>

<template>
  <span class="group gap-2 rounded-2xl hover:bg-gray-700 p-2">
    <EditField :text="text" @update="(value) => emit('update', value)" />
    <DelButton @click="emit('remove')" />
  </span>
</template>
