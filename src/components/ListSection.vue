<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ListItem, LongInfo } from '@/scripts/util'
import EditSection from '@/components/EditSection.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

const props = withDefaults(defineProps<{ data: LongInfo }>(), {
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
  (newData) => (info.value = { ...newData }),
)
</script>

<template>
  <EditSection
    class="group"
    :text="info.title"
    :show="info.isVisible"
    @update:title="emit('update', { ...info, title: $event })"
    @update:is-visible="emit('update', { ...info, isVisible: $event })"
  >
    <EditEntry
      v-for="(item, index) in info.list"
      :key="index"
      :info="item"
      class="py-1"
      @remove="removeItem(index)"
      @update="updateList(index, $event)"
    />
    <AddButton @click="emit('add')" />
  </EditSection>
</template>
