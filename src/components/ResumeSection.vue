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
  <div class="group/add w-full flex flex-col py-1">
    <EditField @update="(value) => emit('update', value)" :text="text" class="font-bold" />
    <hr class="w-full border-1" />
    <EditEntry
      v-for="(item, idx) in list"
      :key="idx"
      :info="item"
      @update="(val) => (list[idx] = val)"
      @remove="list.splice(idx, 1)"
    />
    <AddButton @click="list.push(defaultItem)" />
  </div>
</template>
