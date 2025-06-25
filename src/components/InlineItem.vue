<script lang="ts" setup>
import { ref } from 'vue'
import EditField from '@/components/EditField.vue'
import DelButton from '@/components/DelButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const emit = defineEmits(['remove', 'update'])

const props = withDefaults(defineProps<{ text?: string }>(), { text: 'Contact' })
const isVisible = ref(true)
</script>

<template>
  <span
    :class="`group gap-2 rounded-2xl hover:bg-gray-700 p-2 ${isVisible ? '' : 'text-black/30 print:hidden'}`"
  >
    <ToggleButton container="span" :show="isVisible" @update="isVisible = $event" />
    <EditField :text="props.text" @update="emit('update', $event)" />
    <DelButton container="span" @click="emit('remove')" />
  </span>
</template>
