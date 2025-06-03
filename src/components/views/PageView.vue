<script lang="ts" setup>
import { ref } from 'vue'
import EditField from '@/components/EditField.vue'
import ContactItem from '@/components/ContactItem.vue'
import OptSection from '@/components/OptSection.vue'
import EditTextArea from '@/components/EditTextArea.vue'
import EditEntry from '@/components/EditEntry.vue'
import AddButton from '@/components/AddButton.vue'

const contactList = ref(['Email', 'Phone', 'Location'])
const workList = ref(['Company'])
const degreeList = ref([{ place: 'Institution', title: 'Degree' }])
const projectList = ref([{ place: 'Project Name', title: 'Role' }])

const addContact = () => {
  contactList.value.push('Contact')
}

const addWork = () => {
  workList.value.push('Company')
}

const addDegree = () => {
  degreeList.value.push({ place: 'Institution', title: 'Degree' })
}

const addProject = () => {
  projectList.value.push({ place: 'Project Name', title: 'Role' })
}
</script>

<template>
  <section class="py-20 mb-4">
    <div class="px-auto flex flex-col items-center">
      <div
        class="bg-gray-500 flex flex-col items-center"
        style="width: 21cm; height: 29.7cm; padding: 1.27cm 1.07cm 0.89cm 1.07cm"
      >
        <!--Name-->
        <EditField text="Nome" :required="true" />
        <hr class="w-full border-1" />
        <!--Contacts-->
        <div class="group/add w-full flex flex-col items-center py-1">
          <div>
            <ContactItem v-for="(item, index) in contactList" :key="index" :text="item" />
            <AddButton @click="addContact" />
          </div>
        </div>

        <!--Summary-->
        <OptSection text="Summary">
          <EditTextArea />
        </OptSection>

        <!--Experience-->
        <OptSection class="group/add" text="Experience">
          <EditEntry v-for="(item, index) in workList" :key="index" :place="item" />
          <AddButton @click="addWork" />
        </OptSection>

        <!--Education-->
        <OptSection text="Education">
          <EditEntry
            v-for="(item, index) in degreeList"
            :key="index"
            :place="item.place"
            :title="item.title"
          />
          <AddButton @click="addDegree" />
        </OptSection>

        <!--Projects-->
        <OptSection text="Projects">
          <EditEntry
            v-for="(item, index) in projectList"
            :key="index"
            :place="item.place"
            :title="item.title"
          />
          <AddButton @click="addProject" />
        </OptSection>

        <!--Additional Info-->
        <OptSection text="Additional Info">
          <EditTextArea />
        </OptSection>
      </div>
    </div>
  </section>
</template>
