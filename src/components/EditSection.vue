<script lang="ts" setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import EditField from '@/components/EditField.vue'

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{ text?: string; show?: boolean }>(), {
  text: 'Title',
  show: true,
})

const isVisible = ref(props.show)
</script>

<template>
  <div
    :class="`group/add w-full flex flex-col py-1 ${isVisible ? '' : 'text-black/30 print:hidden'}`"
  >
    <span>
      <button
        type="button"
        @click="isVisible = !isVisible"
        class="hidden px-1 rounded-2xl text-white hover:bg-gray-800 group-hover/add:inline print:hidden"
      >
        <FontAwesomeIcon v-if="isVisible" :icon="faEyeSlash" />
        <FontAwesomeIcon v-else :icon="faEye" />
      </button>
      <EditField class="font-bold" :text="props.text" @update="emit('update', $event)" />
    </span>
    <hr class="w-full border-1" />
    <slot></slot>
  </div>
</template>
