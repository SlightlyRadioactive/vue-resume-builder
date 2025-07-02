<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ListItem, ItemKey } from '@/scripts/util'
import EditField from '@/components/EditField.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import DelButton from '@/components/DelButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const emit = defineEmits(['remove', 'update'])

const props = withDefaults(defineProps<{ info?: ListItem }>(), { info: () => ({}) })

const defaults: ListItem = {
  place: 'Place',
  title: 'Title',
  location: 'Location, FS',
  date_start: 'Start Date',
  date_end: 'End Date',
  description: 'Description',
  isVisible: true,
}

const json = computed(() => ({ ...defaults, ...props.info }))

const isVisible = ref(json.value.isVisible)

const updateField = (field: ItemKey, value: string) => {
  emit('update', { ...json.value, [field]: value })
}

const updateVisibility = (value: boolean) => {
  isVisible.value = value
  emit('update', { ...json.value, isVisible: value })
}
</script>

<template>
  <div :class="`group/entry flex columns-2 ${isVisible ? '' : 'text-black/30 print:hidden'}`">
    <ToggleButton
      :show="isVisible"
      addStyle="group-hover/entry:inline"
      @update="updateVisibility($event)"
    />
    <div class="w-full group-hover/entry:px-1">
      <div class="w-full flex justify-between">
        <div class="flex flex-col">
          <EditField class="font-bold" :text="json.place" @update="updateField('place', $event)" />
          <EditField :text="json.title" @update="updateField('title', $event)" />
        </div>
        <div class="flex flex-col items-end">
          <EditField :text="json.location" @update="updateField('location', $event)" />
          <span>
            <EditField :text="json.date_start" @update="updateField('date_start', $event)" />
            <span> - </span>
            <EditField :text="json.date_end" @update="updateField('date_end', $event)" />
          </span>
        </div>
      </div>
      <EditTextArea
        v-model="json.description"
        @update:model-value="updateField('description', $event)"
      />
    </div>
    <DelButton @click="emit('remove')" addStyle="group-hover/list:inline" />
  </div>
</template>
