<script lang="ts" setup>
import { ref, watch } from 'vue'
import EditField from '@/components/EditField.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const emit = defineEmits(['update:title', 'update:isVisible'])

const props = withDefaults(defineProps<{ text?: string; show?: boolean }>(), {
  text: 'Title',
  show: true,
})

const isVisible = ref(props.show)

const updateVisibility = (value: boolean) => {
  isVisible.value = value
  emit('update:isVisible', isVisible.value)
}

watch(
  () => props.show,
  (newShow) => (isVisible.value = newShow),
)
</script>

<template>
  <div
    :class="`group/add w-full flex flex-col py-1 ${isVisible ? '' : 'text-black/30 print:hidden'}`"
  >
    <span>
      <ToggleButton
        container="span"
        :show="isVisible"
        addStyle="group-hover/add:inline"
        @update="updateVisibility($event)"
      />
      <EditField class="font-bold" :text="props.text" @update="emit('update:title', $event)" />
    </span>
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
