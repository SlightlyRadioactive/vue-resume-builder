<script lang="ts" setup>
import EditField from '@/components/EditField.vue'
import DelButton from '@/components/DelButton.vue'

const emit = defineEmits(['remove', 'update'])

const props = withDefaults(defineProps<{ text?: string }>(), { text: 'Contact' })
</script>

<template>
  <span class="group gap-2 rounded-2xl hover:bg-gray-700 p-2">
    <EditField :text="props.text" @update="emit('update', $event)" />
    <DelButton @click="emit('remove')" />
  </span>
</template>
