<script lang="ts" setup>
import { computed } from 'vue'
import type { ListEntry, ItemKey } from '@/scripts/util'
import EditField from '@/components/EditField.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import DelButton from '@/components/DelButton.vue'

const emit = defineEmits(['remove', 'update'])

const props = withDefaults(defineProps<{ info?: ListEntry }>(), { info: () => ({}) })

const defaults: ListEntry = {
  place: 'Place',
  title: 'Title',
  location: 'Location, FS',
  date_start: 'Start Date',
  date_end: 'End Date',
  description: 'Description',
}

const json = computed(() => ({ ...defaults, ...props.info }))

const updateField = (field: ItemKey, value: string) => {
  emit('update', { ...json.value, [field]: value })
}
</script>

<template>
  <div class="group flex columns-2">
    <div class="w-full group-hover:pe-1">
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
    <div class="flex print:hidden">
      <DelButton @click="emit('remove')" />
    </div>
  </div>
</template>
