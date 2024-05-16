<script setup lang="ts">
import FormField from './FormField.vue';
import { getErrors, getFormFields } from '@/helpers/helpers'
import { ref } from 'vue'
import type { DataRef } from '@/types/DataRef'

const formFields = {
  year: ref<DataRef>(null),
  salary: ref<DataRef>(null),
  days: ref<DataRef>(null)
}

const errors = ref<{[key: string]: string[]} | null>(null);

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const { year, salary, days } = getFormFields(formFields);
  errors.value = getErrors({ year, salary, days }, 'SalaryForm');
}
</script>

<template>
  <form @submit="handleSubmit">
    <FormField :ref="formFields.year" :errors="errors?.year" for="year">Enter a year</FormField>
    <FormField :ref="formFields.salary" :errors="errors?.salary" for="salary">Enter a salary</FormField>
    <FormField :ref="formFields.days" :errors="errors?.days" for="days">Enter days</FormField>
    <button>Submit</button>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  min-width: 350px;
}
button{
  margin-top: 20px;
  align-self: flex-start;
  background-color: rgb(237, 167, 29);
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 15px;
  cursor: pointer;
}

button:focus{
  border: 1px solid black;
}

@media only screen and (max-width: 400px) {
  form{
    min-width: 300px;
  }
}
</style>
