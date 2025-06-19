<script lang="ts" setup>
import { ref, watch } from 'vue'
import EditSection from '@/components/EditSection.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

type ListItemKeys = 'place' | 'title' | 'date_end' | 'date_start' | 'description' | 'location'

type ListItem = { [K in ListItemKeys]?: string }

interface Data {
  title?: string
  list?: ListItem[]
}

const props = withDefaults(defineProps<{ data: Data }>(), {
  data: () => ({ title: 'Title', list: [] }),
})

const emit = defineEmits(['add', 'update'])
const info = ref({ ...props.data })

const updateList = (index: number, value: ListItem): void => {
  const newList = info.value.list ? [...info.value.list] : []
  newList[index] = value
  emit('update', { ...info.value, list: newList })
}

const removeItem = (index: number): void => {
  info.value.list?.splice(index, 1)
  emit('update', { ...info.value })
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
    @update="(value) => emit('update', { ...info, title: value })"
  >
    <EditEntry
      v-for="(item, index) in info.list"
      :key="index"
      :info="item"
      @remove="removeItem(index)"
      @update="updateList(index, $event)"
    />
    <AddButton @click="emit('add')" />
  </EditSection>
</template>
