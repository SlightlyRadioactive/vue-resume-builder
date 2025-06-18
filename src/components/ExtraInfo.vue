<script lang="ts" setup>
import { ref, watch } from 'vue'
import EditField from './EditField.vue'
import EditSection from '@/components/EditSection.vue'
import AddButton from '@/components/AddButton.vue'
import DelButton from './DelButton.vue'
import ContactItem from './ContactItem.vue'

interface InfoEntry {
  title: string
  items: string[]
}

interface Data {
  title?: string
  list?: InfoEntry[]
}

const props = withDefaults(defineProps<{ data: Data }>(), {
  data: () => ({ title: 'Title', list: [] }),
})

const emit = defineEmits(['add', 'addItem', 'update'])
const info = ref({ ...props.data })

const updateList = (index: number, value: string): void => {
  const newList = info.value.list ? [...info.value.list] : []
  newList[index].title = value
  emit('update', { ...info.value, list: newList })
}

const removeLine = (entryIndex: number): void => {
  info.value.list?.splice(entryIndex, 1)
  emit('update', { ...info.value })
}

const removeItem = (entryIndex: number, itemIndex: number): void => {
  if (info.value.list && info.value.list[entryIndex]) {
    info.value.list[entryIndex].items.splice(itemIndex, 1)
    emit('update', { ...info.value })
  }
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
    <div class="group/add w-full flex flex-col">
      <div v-for="(entry, entryIndex) in info.list" :key="entryIndex" class="group">
        <EditField
          class="font-bold"
          :text="entry.title"
          :required="true"
          @update="(value) => updateList(entryIndex, value)"
        />
        <DelButton @click="removeLine(entryIndex)" />
        <span>:</span>
        <span v-for="(item, index) in entry.items" :key="index">
          <ContactItem
            :text="item"
            @remove="removeItem(entryIndex, index)"
            @update="(value) => (entry.items[index] = value)"
          />
          <span v-if="index < entry.items.length - 1">|</span>
        </span>
        <AddButton @click="emit('addItem', entryIndex)" />
      </div>
      <AddButton @click="emit('add')" />
    </div>
  </EditSection>
</template>
