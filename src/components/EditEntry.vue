<script lang="ts" setup>
import { computed } from 'vue'
import EditField from '@/components/EditField.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import DelButton from '@/components/DelButton.vue'

const emit = defineEmits(['remove', 'update'])

type InfoKey = 'place' | 'title' | 'location' | 'date_start' | 'date_end' | 'description'
type Info = Partial<Record<InfoKey, string>>

const props = withDefaults(defineProps<{ info?: Info }>(), { info: () => ({}) })

const defaults: Record<InfoKey, string> = {
  place: 'Place',
  title: 'Title',
  location: 'Location, FS',
  date_start: 'Start Date',
  date_end: 'End Date',
  description: 'Description',
}

const json = computed(() => ({ ...defaults, ...props.info }))

const updateField = (field: InfoKey, value: string) => {
  emit('update', { ...json.value, [field]: value })
}
</script>

<template>
  <div class="group flex columns-2">
    <div class="w-full group-hover:pe-1">
      <div class="w-full flex justify-between">
        <div class="flex flex-col">
          <EditField
            class="font-bold"
            :text="json.place"
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
        v-model="json.description"
        @update:model-value="(value) => updateField('description', value)"
      />
    </div>
    <div class="flex">
      <DelButton @click="emit('remove')" />
    </div>
  </div>
</template>
