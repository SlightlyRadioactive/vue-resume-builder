<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ShortInfo } from '@/scripts/util'
import EditField from '@/components/EditField.vue'
import EditSection from '@/components/EditSection.vue'
import AddButton from '@/components/AddButton.vue'
import DelButton from '@/components/DelButton.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import InlineItem from '@/components/InlineItem.vue'

const props = withDefaults(defineProps<{ data: ShortInfo }>(), {
  data: () => ({ title: 'Title', list: [], isVisible: true }),
})

const emit = defineEmits(['add', 'addItem', 'update'])
const info = ref({ ...props.data })

const updateList = (index: number, value: string | boolean): void => {
  const newList = info.value.list ? [...info.value.list] : []
  if (typeof value == 'string') newList[index].title = value
  else if (typeof value == 'boolean') newList[index].isVisible = value
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
  (newData) => (info.value = { ...newData }),
)
</script>

<template>
  <EditSection
    :text="info.title"
    :show="info.isVisible"
    @update:title="emit('update', { ...info, title: $event })"
    @update:is-visible="emit('update', { ...info, isVisible: $event })"
  >
    <div class="w-full flex flex-col">
      <div
        v-for="(entry, entryIndex) in info.list"
        :key="entryIndex"
        :class="['group', entry.isVisible ? '' : 'text-black/30 print:hidden']"
      >
        <ToggleButton
          container="span"
          :show="entry.isVisible"
          @update="updateList(entryIndex, $event)"
        />
        <EditField class="font-bold" :text="entry.title" @update="updateList(entryIndex, $event)" />
        <DelButton container="span" @click="removeLine(entryIndex)" />
        <span v-for="(item, index) in entry.items" :key="index">
          <InlineItem
            :data="item"
            @update="entry.items[index] = $event"
            @remove="removeItem(entryIndex, index)"
          />
          <span
            v-if="index < entry.items.length - 1"
            :class="`${item.isVisible ? '' : 'text-black/30 print:hidden'}`"
            >|</span
          >
        </span>
        <AddButton container="span" @click="emit('addItem', entryIndex)" />
      </div>
      <AddButton @click="emit('add')" />
    </div>
  </EditSection>
</template>
