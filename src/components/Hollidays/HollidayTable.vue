<script setup lang="ts">
import type { ConvertedHollidays } from '@/helpers/data'
import RemoveButton from './RemoveButton.vue'
import EditButton from './EditButton.vue'
import HollidayModal from './HollidayModal.vue'
import { useLocalStorage } from '@vueuse/core';
import { provide, ref } from 'vue';
import type { HollidayFormFields, HollidayFormType } from '@/types/FormFields';


const hollidays = useLocalStorage<ConvertedHollidays>('hollidays', {});

const remove = (key: string) => {
  let newValue = {...hollidays.value};
  delete newValue[key];
  localStorage.setItem('hollidays', JSON.stringify(newValue));
  hollidays.value = newValue;
}

const modal = defineModel({default: {
  show: false,
  title: '',
  buttonText: '',
  type: '',
}});
const formFields = ref<HollidayFormFields>({
  month: '',
  day: '',
  description: ''
})

const handleEdit = (val: HollidayFormFields, title: string, buttonText: string, type: HollidayFormType) => {
  modal.value = {show: true, title, buttonText, type};
  formFields.value = val;
}

export type UpdateHollidayVal = (val: ConvertedHollidays) => void
const updateHollidayVal: UpdateHollidayVal = (val: ConvertedHollidays) => {
  hollidays.value = val
}
provide('updateHollidayVal', updateHollidayVal);
provide('formFields', formFields);
provide('handleEdit', handleEdit);

</script>

<template>
  <div class="holliday-container container">
    <HollidayModal v-model="modal" />
    <table class="card">
      <thead>
        <tr>
          <th>Month</th>
          <th>Day</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ month, day, description }, key) in hollidays" :key="key">
          <td>{{ month }}</td>
          <td>{{ day }}</td>
          <td>
            <span>
              {{ description }}
            </span>
            <div class="buttons">
              <EditButton @click="handleEdit({ month, day, description }, 'Edit the holliday', 'Submit', 'edit')"/>
              <RemoveButton @click="remove(key as string)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.holliday-container{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hollidays table * {
  width: fit-content;
}
tr > td:last-child > span{
  width: 600px;
}
tr > td:last-child {
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.buttons{
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
