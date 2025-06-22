<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import * as util from '@/scripts/util'

// Components
import EditField from '@/components/EditField.vue'
import InlineItem from '@/components/InlineItem.vue'
import EditSection from '@/components/EditSection.vue'
import ListSection from '@/components/ListSection.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import AddButton from '@/components/AddButton.vue'
import ExtraInfo from '../ExtraInfo.vue'
import StdButton from '../StdButton.vue'

const data = ref(structuredClone(util.DEFAULT_DATA))

const saveJSON = () => {
  const load_data = JSON.stringify(data.value, null, 2)

  const link = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([load_data], { type: 'application/json' })),
    download: 'resume.json',
  })
  link.click()
  URL.revokeObjectURL(link.href)
}

const loadJSON = () => {
  const input = Object.assign(document.createElement('input'), {
    type: 'file',
    accept: 'application/json',
    onchange: async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const json = JSON.parse(await file.text())
        if (typeof json !== 'object' || json === null) {
          alert('Invalid JSON format')
          return
        }
        data.value = {
          ...util.DEFAULT_DATA,
          ...json,
          contacts: json.contacts || util.DEFAULT_DATA.contacts,
          summary: { ...util.DEFAULT_DATA.summary, ...json.summary },
          works: {
            ...util.DEFAULT_DATA.works,
            title: json.works?.title || 'Experience',
            list: json.works?.list || [],
          },
          degrees: {
            ...util.DEFAULT_DATA.degrees,
            title: json.degrees?.title || 'Degrees',
            list: json.degrees?.list || [],
          },
          projects: {
            ...util.DEFAULT_DATA.projects,
            title: json.projects?.title || 'Projects',
            list: json.projects?.list || [],
          },
          extraInfo: {
            ...util.DEFAULT_DATA.extraInfo,
            title: json.extraInfo?.title,
            ...json.extraInfo,
          },
        }

        //Trigger resize for all textareas
        await nextTick()
        document.querySelectorAll('textarea').forEach((textarea) => {
          textarea.dispatchEvent(new Event('input'))
          textarea.dispatchEvent(new Event('blur'))
        })
      } catch (err) {
        console.error('Error parsing JSON:', err)
      }
    },
  })
  input.click()
}

function safeStructuredClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj)

  return JSON.parse(JSON.stringify(obj))
}
</script>

<template>
  <section class="pt-20 pb-4 mb-4">
    <div class="px-auto flex flex-col items-center">
      <div
        class="bg-gray-500 flex flex-col items-center"
        style="width: 21cm; height: 29.7cm; padding: 1.27cm 1.07cm 0.89cm 1.07cm"
      >
        <!--Name-->
        <EditField :text="data.name" @update="data.name = $event" />
        <hr class="w-full border-1" />

        <!--Contacts-->
        <div class="group/add w-full flex flex-col items-center py-1">
          <div>
            <span v-for="(item, index) in data.contacts" :key="index">
              <InlineItem
                :text="item"
                @remove="data.contacts.splice(index, 1)"
                @update="data.contacts[index] = $event"
              />
              <span v-if="index < data.contacts.length - 1">|</span>
            </span>
            <AddButton @click="data.contacts.push('Contact')" />
          </div>
        </div>

        <!--Summary-->
        <EditSection :text="data.summary.title" @update="data.summary.title = $event">
          <EditTextArea v-model="data.summary.text" />
        </EditSection>

        <!--Experience-->
        <ListSection
          :data="data.works"
          @add="data.works.list.push(...util.DEFAULT_DATA.works.list)"
          @update="data.works = $event"
        />

        <!--Education-->
        <ListSection
          :data="data.degrees"
          @add="data.degrees.list.push(...util.DEFAULT_DATA.degrees.list)"
          @update="data.degrees = $event"
        />

        <!--Projects-->
        <ListSection
          :data="data.projects"
          @add="data.projects.list.push(...util.DEFAULT_DATA.projects.list)"
          @update="data.projects = $event"
        />

        <!--Additional Info-->
        <ExtraInfo
          :data="data.extraInfo"
          @add="data.extraInfo.list.push(safeStructuredClone(util.DEFAULT_DATA.extraInfo.list[0]))"
          @addItem="data.extraInfo.list[$event].items.push('Item')"
          @update="data.extraInfo = $event"
        />
      </div>
    </div>
  </section>
  <div class="flex justify-center pb-20 gap-2">
    <StdButton @click="console.log('PDF')" text="Download PDF" color="black" />
    <StdButton @click="saveJSON" text="Save JSON" />
    <StdButton @click="loadJSON" text="Load JSON" />
  </div>
  <footer class="text-center text-gray-500 text-xs">
    <p>Vue Resume Builder</p>
    <p>© {{ new Date().getFullYear() }} SlightlyRadioactive</p>
  </footer>
</template>
