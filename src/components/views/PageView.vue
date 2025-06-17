<script lang="ts" setup>
import { ref, nextTick } from 'vue'

// Components
import EditField from '@/components/EditField.vue'
import ContactItem from '@/components/ContactItem.vue'
import EditSection from '@/components/EditSection.vue'
import ListSection from '@/components/ListSection.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import AddButton from '@/components/AddButton.vue'
import DelButton from '@/components/DelButton.vue'

// Static data
interface ResumeEntry {
  place: string
  title: string
}

interface InfoEntry {
  title: string
  items: string[]
}

interface ResumeData {
  name: string
  contacts: string[]
  summary: { title: string; text: string }
  works: { title: string; list: ResumeEntry[] }
  degrees: { title: string; list: ResumeEntry[] }
  projects: { title: string; list: ResumeEntry[] }
  extraInfo: { title: string; list: InfoEntry[] }
}

const DEFAULT_DATA: ResumeData = {
  name: 'Your Name',
  contacts: ['Email', 'Phone', 'Location'],
  summary: { title: 'Summary', text: 'Description' },
  works: { title: 'Experience', list: [{ place: 'Company', title: 'Position' }] },
  degrees: { title: 'Education', list: [{ place: 'Institution', title: 'Degree' }] },
  projects: { title: 'Projects', list: [{ place: 'Project Name', title: 'Role' }] },
  extraInfo: {
    title: 'Additional Info',
    list: [{ title: 'Skills', items: ['Item1', 'Item2', 'Item3'] }],
  },
}

// Reactive data
const data = ref(structuredClone(DEFAULT_DATA))

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
          ...DEFAULT_DATA,
          ...json,
          contacts: json.contacts || DEFAULT_DATA.contacts,
          summary: { ...DEFAULT_DATA.summary, ...json.summary },
          works: { ...DEFAULT_DATA.works, list: json.works?.list || [] },
          degrees: { ...DEFAULT_DATA.degrees, list: json.degrees?.list || [] },
          projects: { ...DEFAULT_DATA.projects, list: json.projects?.list || [] },
          extraInfo: { ...DEFAULT_DATA.extraInfo, ...json.extraInfo },
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
</script>

<template>
  <section class="pt-20 pb-4 mb-4">
    <div class="px-auto flex flex-col items-center">
      <div
        class="bg-gray-500 flex flex-col items-center"
        style="width: 21cm; height: 29.7cm; padding: 1.27cm 1.07cm 0.89cm 1.07cm"
      >
        <!--Name-->
        <EditField :text="data.name" :required="true" @update="(value) => (data.name = value)" />
        <hr class="w-full border-1" />

        <!--Contacts-->
        <div class="group/add w-full flex flex-col items-center py-1">
          <div>
            <span v-for="(item, index) in data.contacts" :key="index">
              <ContactItem
                :text="item"
                @remove="data.contacts.splice(index, 1)"
                @update="(value) => (data.contacts[index] = value)"
              />
              <span v-if="index < data.contacts.length - 1">|</span>
            </span>
            <AddButton @click="data.contacts.push('Contact')" />
          </div>
        </div>

        <!--Summary-->
        <EditSection :text="data.summary.title" @update="(value) => (data.summary.title = value)">
          <EditTextArea v-model="data.summary.text" />
        </EditSection>

        <!--Experience-->
        <ListSection
          :data="data.works"
          @add="data.works.list.push(...DEFAULT_DATA.works.list)"
          @update="(value) => (data.works = value)"
          @remove="(value) => data.works.list.splice(value, 1)"
        />

        <!--Education-->
        <ListSection
          :data="data.degrees"
          @add="data.degrees.list.push(...DEFAULT_DATA.degrees.list)"
          @update="(value) => (data.degrees = value)"
          @remove="(value) => data.degrees.list.splice(value, 1)"
        />

        <!--Projects-->
        <ListSection
          :data="data.projects"
          @add="data.projects.list.push(...DEFAULT_DATA.projects.list)"
          @update="(value) => (data.projects = value)"
          @remove="(value) => data.projects.list.splice(value, 1)"
        />

        <!--Additional Info-->
        <EditSection
          :text="data.extraInfo.title"
          @update="(value) => (data.extraInfo.title = value)"
        >
          <div class="group/add w-full flex flex-col">
            <div v-for="(entry, entryIndex) in data.extraInfo.list" :key="entryIndex" class="group">
              <EditField
                class="font-bold"
                :text="entry.title"
                :required="true"
                @update="(value) => (entry.title = value)"
              />
              <DelButton @click="data.extraInfo.list.splice(entryIndex, 1)" />
              <span>:</span>
              <span v-for="(item, index) in entry.items" :key="index">
                <ContactItem
                  :text="item"
                  @remove="entry.items.splice(index, 1)"
                  @update="(value) => (entry.items[index] = value)"
                />
                <span v-if="index < entry.items.length - 1">|</span>
              </span>
              <AddButton @click="entry.items.push('Item')" />
            </div>
            <AddButton @click="data.extraInfo.list.push(...DEFAULT_DATA.extraInfo.list)" />
          </div>
        </EditSection>
      </div>
    </div>
  </section>
  <div class="flex justify-center pb-20 gap-2">
    <button type="button" @click="console.log('PDF')" class="btn bg-black hover:bg-gray-800">
      Download PDF
    </button>
    <button type="button" @click="saveJSON" class="btn bg-gray-500 hover:bg-gray-700">
      Save JSON
    </button>
    <button type="button" @click="loadJSON" class="btn bg-gray-500 hover:bg-gray-700">
      Load JSON
    </button>
  </div>
  <footer class="text-center text-gray-500 text-xs">
    <p>Vue Resume Builder</p>
    <p>© 2023 SlightlyRadioactive</p>
  </footer>
</template>
