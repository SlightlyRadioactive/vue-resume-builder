<script lang="ts" setup>
import { ref } from 'vue'
import EditField from '@/components/EditField.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{ text?: string; show?: boolean }>(), {
  text: 'Title',
  show: true,
})

const isVisible = ref(props.show)
</script>

<template>
  <div
    :class="`group/add w-full flex flex-col py-1 ${isVisible ? '' : 'text-black/30 print:hidden'}`"
  >
    <span>
      <ToggleButton container="span" :show="isVisible" group="add" @update="isVisible = $event" />
      <EditField class="font-bold" :text="props.text" @update="emit('update', $event)" />
    </span>
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
