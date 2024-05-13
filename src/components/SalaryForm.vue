<script setup lang="ts">
import FormField from './FormField.vue';
import { getFormFields } from '@/helpers/getFormFields'
import type { DataRef } from '@/types/DataRef'
import { ref } from 'vue'

const formFields = {
  year: ref<DataRef>(null),
  salary: ref<DataRef>(null),
  days: ref<DataRef>(null)
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const { year, salary, days } = getFormFields(formFields)
  console.log(year, salary, days)
}
</script>

<template>
  <form @submit="handleSubmit">
    <FormField :ref="formFields.year" for="year">Enter a year</FormField>
    <FormField :ref="formFields.salary" for="salary">Enter a salary</FormField>
    <FormField :ref="formFields.days" for="days">Enter days</FormField>
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
