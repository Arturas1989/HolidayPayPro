<script setup lang="ts">
import type { DataRef } from '@/types/DataRef'
import FormField from '../../FormField.vue'
import SubmitButton from './SubmitButton.vue'
import { ref } from 'vue'
import { calcInfo, getVal, isValid, updateFormFields, validateForm } from '@/helpers/form'
import { bestMonths } from '@/helpers/calc'
import type { FormFields, GeneralFields } from '@/types/FormFields'

const emit = defineEmits(['update:modelValue']);

const defaultData = {
  defaultYear: new Date().getFullYear(),
  defaultSalary: 2000,
  defaultDays: 10
}

const { defaultYear, defaultSalary, defaultDays } = defaultData
// month form
let formFields: GeneralFields = {
  year: ref<DataRef>(defaultYear),
  salary: ref<DataRef>(defaultSalary),
  days: ref<DataRef>(defaultDays)
}

const info = ref<FormFields>(calcInfo(defaultYear, defaultSalary));

const updateForm = (type: string, input: HTMLInputElement) => {
  updateFormFields(type, input, info, formFields)
}
const formErrors = {
  general: ref<{ [key: string]: string[] } | null>(null),
  month: ref<{ [key: string]: string[] } | null>(null),
  salary: ref<{ [key: string]: string[] } | null>(null)
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  validateForm(info, formFields, formErrors);
  if(isValid(formErrors)){
    const result = bestMonths(info.value.monthFields, info.value.salaryFields, +getVal(formFields.days.value));
    emit('update:modelValue', result)
  }
}
</script>

<template>
  <form class="salary-form" @submit="handleSubmit">
    <div class="salary-fields card">
      <div class="salary-container">
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.year.value)"
          :ref="formFields?.year"
          :errors="formErrors.general.value?.year"
          for="year"
          >Enter a year</FormField
        >
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.salary.value)"
          :ref="formFields?.salary"
          :errors="formErrors.general.value?.salary"
          for="salary"
          >Enter a salary</FormField
        >
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.days.value)"
          :ref="formFields?.days"
          :errors="formErrors.general.value?.days"
          for="days"
          >Enter days</FormField
        >
        <SubmitButton>Submit</SubmitButton>
      </div>
    </div>
    <div class="month-fields card">
      <table>
        <tr>
          <th>Month</th>
          <th>Work days</th>
          <th>Salary</th>
        </tr>
        <tbody>
          <tr class="container" v-for="(days, month) in info.workDays" :key="month">
            <td>{{ month }}</td>
            <td>
              <FormField
                :updateForm="updateForm"
                :errors="formErrors.month.value ? formErrors.month.value[month] : []"
                :for="month + ';days'"
                :inputVal="info.workDays[month]"
              ></FormField>
            </td>
            <td>
              <FormField
                :updateForm="updateForm"
                :key="info.salaryFields[month]"
                :errors="formErrors.salary.value ? formErrors.salary.value[month] : []"
                :for="month + ';salary'"
                :inputVal="info.salaryFields[month]"
              ></FormField>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<style>
.salary-fields,
.month-fields, section > .container > table {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px 5px;
}

section > .container > table {
  border: 1px solid black
}

.salary-fields {
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 10px;
  border: 1px solid black;
}

.salary-container {
  padding: 5px;
}

.month-fields {
  width: 90%;
  border: 1px solid black;
}

table, tbody {
  width: 100%;
}

tr,
td,
th {
  outline: 1px solid black;
  padding: 5px;
}

tr > td {
  width: 40%;
}
tr > td:first-child {
  width: fit-content;
}

.salary-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100%;
}

.container > td:first-child {
  vertical-align: bottom;
}
</style>
