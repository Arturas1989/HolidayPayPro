<script setup lang="ts">
import { storageHolidays, type ConvertedHolidays } from '@/helpers/data'
import RemoveButton from './RemoveButton.vue'
import EditButton from './EditButton.vue'
import HolidayModal from './HolidayModal.vue'
import { useLocalStorage } from '@vueuse/core'
import { provide, ref } from 'vue'
import type { HolidayFormFields, HolidayFormType } from '@/types/FormFields'
import type { Modal } from '@/types/Modal'

const holidays = useLocalStorage<ConvertedHolidays>('holidays', {...storageHolidays})

const remove = (key: string) => {
  let newValue = { ...holidays.value }
  delete newValue[key]
  localStorage.setItem('holidays', JSON.stringify(newValue))
  holidays.value = newValue
}

const modal = defineModel<Modal>({
  default: {
    show: false,
    title: '',
    buttonText: '',
    type: ''
  }
})
const formFields = ref<HolidayFormFields>({
  month: '',
  day: '',
  description: ''
})

const handleEdit = (
  val: HolidayFormFields,
  title: string,
  buttonText: string,
  type: HolidayFormType
) => {
  modal.value = { show: true, title, buttonText, type }
  formFields.value = val
}

export type UpdateHolidayVal = (val: ConvertedHolidays) => void
const updateHolidayVal: UpdateHolidayVal = (val: ConvertedHolidays) => {
  holidays.value = val
}
provide('updateHolidayVal', updateHolidayVal)
provide('formFields', formFields)
provide('handleEdit', handleEdit)
</script>

<template>
  <div class="holiday-container container">
    <HolidayModal v-model="modal" />
    <table class="card">
      <thead>
        <tr>
          <th>Month</th>
          <th>Day</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ month, day, description }, key) in holidays" :key="key">
          <td>{{ month }}</td>
          <td>{{ day }}</td>
          <td>
            <span>
              {{ description }}
            </span>
            <div class="buttons">
              <EditButton
                @click="
                  handleEdit({ month, day, description }, 'Edit the holiday', 'Submit', 'edit')
                "
              />
              <RemoveButton @click="remove(key as string)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.holiday-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.holidays table * {
  width: fit-content;
}
tr > td:last-child > span {
  width: 600px;
}
tr > td:last-child {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.buttons {
  margin-left: 10px;
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  gap: 10px;
}
.buttons > button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 810px) {
  tr > td:last-child > span {
    width: 400px;
  }
}
@media only screen and (max-width: 710px) {
  tr > td:last-child > span {
    width: 300px;
  }
}

@media only screen and (max-width: 500px) {
  tr > td:last-child > span {
    width: 150px;
  }
}
</style>
