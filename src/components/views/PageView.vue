<script lang="ts" setup>
import { ref } from 'vue'
import EditField from '@/components/EditField.vue'
import ContactItem from '@/components/ContactItem.vue'
import OptSection from '@/components/OptSection.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

const name = ref('Your Name')
const contactList = ref(['Email', 'Phone', 'Location'])
const summary = ref({ title: 'Summary', text: 'Description' })
const workList = ref({ title: 'Experience', list: [{ place: 'Company', title: 'Position' }] })
const degreeList = ref({ title: 'Education', list: [{ place: 'Institution', title: 'Degree' }] })
const projectList = ref({ title: 'Projects', list: [{ place: 'Project Name', title: 'Role' }] })
const extraInfo = ref({ title: 'Additional Info', text: 'Description' })

const saveJSON = () => {
  const data = JSON.stringify(
    {
      name: name.value,
      contacts: contactList.value,
      summary: summary.value,
      works: workList.value,
      degrees: degreeList.value,
      projects: projectList.value,
      extraInfo: extraInfo.value,
    },
    null,
    2,
  )

  const link = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([data], { type: 'application/json' })),
    download: 'resume.json',
  })

  link.click()
  URL.revokeObjectURL(link.href)
}

const loadJSON = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      name.value = data.name || 'Your Name'
      contactList.value = data.contacts || ['Email', 'Phone', 'Location']
      summary.value = data.summary || {}
      workList.value = data.works || {
        title: 'Experience',
        list: [{ place: 'Company', title: 'Position' }],
      }
      degreeList.value = data.degrees || {
        title: 'Education',
        list: [{ place: 'Institution', title: 'Degree' }],
      }
      projectList.value = data.projects || {
        title: 'Projects',
        list: [{ place: 'Project Name', title: 'Role' }],
      }
      extraInfo.value = data.extraInfo || { title: 'Additional Info', text: 'Description' }
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }
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
        <EditField :text="name" :required="true" @update="(value) => (name = value)" />
        <hr class="w-full border-1" />

        <!--Contacts-->
        <div class="group/add w-full flex flex-col items-center py-1">
          <div>
            <span v-for="(item, index) in contactList" :key="index">
              <ContactItem
                :text="item"
                @remove="contactList.splice(index, 1)"
                @update="(value) => (contactList[index] = value)"
              />
              <span v-if="index < contactList.length - 1">|</span>
            </span>
            <AddButton @click="contactList.push('Contact')" />
          </div>
        </div>

        <!--Summary-->
        <OptSection :text="summary.title" @update="(value) => (summary.title = value)">
          <EditTextArea :text="summary.text" @update="(value) => (summary.text = value)" />
        </OptSection>

        <!--Experience-->
        <OptSection
          class="group/add"
          text="Experience"
          @update="(value) => (workList.title = value)"
        >
          <EditEntry
            v-for="(work, index) in workList.list"
            :key="index"
            :info="work"
            @remove="workList.list.splice(index, 1)"
            @update="(value) => (workList.list[index] = value)"
          />
          <AddButton @click="workList.list.push({ place: 'Company', title: 'Position' })" />
        </OptSection>

        <!--Education-->
        <OptSection text="Education" @update="(value) => (degreeList.title = value)">
          <EditEntry
            v-for="(degree, index) in degreeList.list"
            :key="index"
            :info="degree"
            @remove="degreeList.list.splice(index, 1)"
            @update="(value) => (degreeList.list[index] = value)"
          />
          <AddButton @click="degreeList.list.push({ place: 'Institution', title: 'Degree' })" />
        </OptSection>

        <!--Projects-->
        <OptSection text="Projects" @update="(value) => (projectList.title = value)">
          <EditEntry
            v-for="(project, index) in projectList.list"
            :key="index"
            :info="project"
            @remove="projectList.list.splice(index, 1)"
            @update="(value) => (projectList.list[index] = value)"
          />
          <AddButton @click="projectList.list.push({ place: 'Project Name', title: 'Role' })" />
        </OptSection>

        <!--Additional Info-->
        <OptSection :text="extraInfo.title" @update="(value) => (extraInfo.title = value)">
          <EditTextArea :text="extraInfo.text" @update="(value) => (extraInfo.text = value)" />
        </OptSection>
      </div>
    </div>
  </section>
  <div class="flex justify-center pb-20 gap-2">
    <button
      type="button"
      @click="console.log('Download PDF clicked')"
      class="text-white px-4 py-2 rounded-xl bg-black hover:bg-gray-800 border border-white"
    >
      Download PDF
    </button>
    <button
      type="button"
      @click="saveJSON"
      class="text-white px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-700 border border-white"
    >
      Save JSON
    </button>
    <button
      type="button"
      @click="loadJSON"
      class="text-white px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-700 border border-white"
    >
      Load JSON
    </button>
  </div>
  <footer class="text-center text-gray-500 text-xs">
    <p>Generated by Vue Resume Builder</p>
    <p>© 2023 SlightlyRadioactive</p>
  </footer>
</template>
