<script lang="ts" setup>
import { ref } from 'vue'

// Components
import EditField from '@/components/EditField.vue'
import ContactItem from '@/components/ContactItem.vue'
import OptSection from '@/components/OptSection.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

// Static data
interface ResumeEntry {
  place: string
  title: string
}

interface ResumeData {
  name: string
  contacts: string[]
  summary: { title: string; text: string }
  works: { title: string; list: ResumeEntry[] }
  degrees: { title: string; list: ResumeEntry[] }
  projects: { title: string; list: ResumeEntry[] }
  extraInfo: { title: string; text: string }
}

const DEFAULT_DATA: ResumeData = {
  name: 'Your Name',
  contacts: ['Email', 'Phone', 'Location'],
  summary: { title: 'Summary', text: 'Description' },
  works: { title: 'Experience', list: [{ place: 'Company', title: 'Position' }] },
  degrees: { title: 'Education', list: [{ place: 'Institution', title: 'Degree' }] },
  projects: { title: 'Projects', list: [{ place: 'Project Name', title: 'Role' }] },
  extraInfo: { title: 'Additional Info', text: 'Description' },
}

// Reactive data
const data = ref(DEFAULT_DATA)

const saveJSON = () => {
  const load_data = JSON.stringify(data.value)

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
        <OptSection :text="data.summary.title" @update="(value) => (data.summary.title = value)">
          <EditTextArea
            :text="data.summary.text"
            @update="(value) => (data.summary.text = value)"
          />
        </OptSection>

        <!--Experience-->
        <OptSection
          class="group/add"
          text="Experience"
          @update="(value) => (data.works.title = value)"
        >
          <EditEntry
            v-for="(work, index) in data.works.list"
            :key="index"
            :info="work"
            @remove="data.works.list.splice(index, 1)"
            @update="(value) => (data.works.list[index] = value)"
          />
          <AddButton @click="data.works.list.push({ place: 'Company', title: 'Position' })" />
        </OptSection>

        <!--Education-->
        <OptSection text="Education" @update="(value) => (data.degrees.title = value)">
          <EditEntry
            v-for="(degree, index) in data.degrees.list"
            :key="index"
            :info="degree"
            @remove="data.degrees.list.splice(index, 1)"
            @update="(value) => (data.degrees.list[index] = value)"
          />
          <AddButton @click="data.degrees.list.push({ place: 'Institution', title: 'Degree' })" />
        </OptSection>

        <!--Projects-->
        <OptSection text="Projects" @update="(value) => (data.projects.title = value)">
          <EditEntry
            v-for="(project, index) in data.projects.list"
            :key="index"
            :info="project"
            @remove="data.projects.list.splice(index, 1)"
            @update="(value) => (data.projects.list[index] = value)"
          />
          <AddButton @click="data.projects.list.push({ place: 'Project Name', title: 'Role' })" />
        </OptSection>

        <!--Additional Info-->
        <OptSection
          :text="data.extraInfo.title"
          @update="(value) => (data.extraInfo.title = value)"
        >
          <EditTextArea
            :text="data.extraInfo.text"
            @update="(value) => (data.extraInfo.text = value)"
          />
        </OptSection>
      </div>
    </div>
  </section>
  <div class="flex justify-center pb-20 gap-2">
    <button
      type="button"
      @click="console.log('Download PDF clicked')"
      class="btn bg-black hover:bg-gray-800"
    >
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
    <p>Generated by Vue Resume Builder</p>
    <p>© 2023 SlightlyRadioactive</p>
  </footer>
</template>
