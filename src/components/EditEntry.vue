<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import EditField from '@/components/EditField.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import DelButton from '@/components/DelButton.vue'

const props = defineProps({
  info: { type: Object, default: () => ({}) },
})

const json = computed({
  get() {
    return {
      place: props.info.place || 'Place',
      title: props.info.title || 'Title',
      location: props.info.location || 'Location, FS',
      date_start: props.info.date_start || 'Start Date',
      date_end: props.info.date_end || 'End Date',
      description: props.info.description || 'Description',
    }
  },
  set(value) {
    return value
  },
})

const emit = defineEmits(['remove', 'update'])

const updateField = (field: string, value: string) => {
  emit('update', { ...json.value, [field]: value })
}
</script>

<template>
  <div class="group flex columns-2">
    <div class="w-full group-hover:pe-1">
      <div class="w-full flex justify-between">
        <div class="flex flex-col">
          <EditField
            :text="json.place"
            class="font-bold"
            @update="(value) => updateField('place', value)"
          />
          <EditField :text="json.title" @update="(value) => updateField('title', value)" />
        </div>
        <div class="flex flex-col items-end">
          <EditField :text="json.location" @update="(value) => updateField('location', value)" />
          <span>
            <EditField
              :text="json.date_start"
              @update="(value) => updateField('date_start', value)"
            />
            <span> - </span>
            <EditField :text="json.date_end" @update="(value) => updateField('date_end', value)" />
          </span>
        </div>
      </div>
      <EditTextArea
        :text="json.description"
        @update="(value) => updateField('description', value)"
      />
    </div>
    <div class="flex">
      <DelButton @click="emit('remove')" />
    </div>
  </div>
</template>
