<script lang="ts" setup>
import { ref } from 'vue'
import EditField from '@/components/EditField.vue'
import EditEntry from './EditEntry.vue'
import AddButton from './AddButton.vue'

const emit = defineEmits(['update'])

const {
  text = 'Title',
  section,
  defaultItem,
} = defineProps<{
  text?: string
  section: { title: string; list: { place: string; title: string }[] }
  defaultItem: { place: string; title: string }
}>()

const list = ref(section.list)
</script>

<template>
  <div class="w-full flex flex-col py-1">
    <EditField @update="emit('update', $event)" :text="text" class="font-bold" />
    <hr class="w-full border-1" />
    <EditEntry
      v-for="(item, index) in list"
      :key="index"
      :info="item"
      @update="list[index] = $event"
      @remove="list.splice(index, 1)"
    />
    <AddButton @click="list.push(defaultItem)" />
  </div>
</template>
