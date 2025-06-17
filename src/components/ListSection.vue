<script lang="ts" setup>
import { ref, watch } from 'vue'
import EditSection from '@/components/EditSection.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

type ListItemKeys = 'place' | 'title' | 'date_end' | 'date_start' | 'description' | 'location'

type ListItem = {
  [K in ListItemKeys]?: string
}

interface Data {
  title?: string
  list?: ListItem[]
}

const props = withDefaults(defineProps<{ data: Data }>(), {
  data: () => ({ title: 'Title', list: [] }),
})

const emit = defineEmits(['add', 'update', 'remove'])
const info = ref({ ...props.data })

const updateSection = (field: 'title', value: string): void => {
  emit('update', { ...info.value, [field]: value })
}

const updateListItem = (index: number, value: ListItem): void => {
  const newList = info.value.list ? [...info.value.list] : []
  newList[index] = value
  emit('update', { ...info.value, list: newList })
}

watch(
  () => props.data,
  (newData: Data) => (info.value = { ...newData }),
)
</script>

<template>
  <EditSection
    class="group/add"
    :text="info.title"
    @update="(value) => updateSection('title', value)"
  >
    <EditEntry
      v-for="(item, index) in info.list"
      :key="index"
      :info="item"
      @remove="emit('remove', index)"
      @update="(value) => updateListItem(index, value)"
    />
    <AddButton @click="emit('add')" />
  </EditSection>
</template>
