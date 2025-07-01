<script lang="ts" setup>
import { computed } from 'vue'
import type { InlineItem } from '@/scripts/util'
import EditField from '@/components/EditField.vue'
import DelButton from '@/components/DelButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const emit = defineEmits(['remove', 'update'])

const props = withDefaults(defineProps<{ data?: InlineItem }>(), {
  data: () => ({ content: 'Contact', isVisible: true }),
})

const json = computed(() => props.data)

const updateField = (field: 'content' | 'isVisible', value: string) => {
  emit('update', { ...json.value, [field]: value })
}
</script>

<template>
  <span
    :class="[
      'p-2',
      'gap-2',
      'group/sec',
      'rounded-2xl',
      'hover:bg-gray-700',
      json.isVisible ? '' : 'text-black/30 print:hidden',
    ]"
  >
    <ToggleButton
      container="span"
      :show="json.isVisible"
      addStyle="group-hover/sec:inline"
      @update="updateField('isVisible', $event)"
    />
    <EditField :text="props.data.content" @update="updateField('content', $event)" />
    <DelButton addStyle="group-hover/sec:inline" container="span" @click="emit('remove')" />
  </span>
</template>
