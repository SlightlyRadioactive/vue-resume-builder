<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import EditField from './EditField.vue'
import EditTextArea from './EditTextArea.vue'

const isVisible = ref(true)

defineProps({
  place: {
    type: String,
    default: 'Place',
  },
  title: {
    type: String,
    default: 'Role',
  },
})
</script>

<template>
  <div v-if="isVisible" class="group flex columns-2">
    <div class="w-full group-hover:pe-1">
      <div v-if="isVisible" class="w-full flex justify-between">
        <div class="flex flex-col">
          <EditField :text="place" class="font-bold" />
          <EditField :text="title" />
        </div>
        <div class="flex flex-col items-end">
          <EditField text="Location, FS" />
          <span>
            <EditField text="Start Date" />
            -
            <EditField text="End Date" />
          </span>
        </div>
      </div>
      <EditTextArea />
    </div>
    <div class="flex">
      <button
        type="button"
        @click="isVisible = false"
        class="hidden group-hover:inline rounded-2xl px-1 hover:bg-gray-800"
      >
        ❌
      </button>
    </div>
  </div>
</template>
