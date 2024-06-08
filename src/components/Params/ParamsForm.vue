<script setup lang="ts">
import FormField from '../FormField.vue'
import SubmitButton from '../Home/Forms/SubmitButton.vue'
import UpdateInfo from './UpdateInfo.vue'
import { ref } from 'vue'
import { getFormFields, getVal } from '@/helpers/form'
import { getErrors } from '@/helpers/form'
import type { DataRef } from '@/types/DataRef'
import type { GeneralFields } from '@/types/FormFields'
import type { ValidationOptions } from '@/services/Validator'
import { useDefaultData } from '@/composables/useDefaultData'

const { defaultYear, defaultSalary, defaultDays } = useDefaultData(true)
const formErrors = ref<{ [key: string]: string[] } | null>(null)
const isUpdated = ref<boolean>(false);
const animationFinished = ref<boolean>(true);
let formFields: GeneralFields = {
  defaultYear: ref<DataRef>(defaultYear),
  defaultSalary: ref<DataRef>(defaultSalary),
  defaultDays: ref<DataRef>(defaultDays)
}

const updateForm = (type: string, input: HTMLInputElement) => {
  formFields[type].value = input.value
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const validationOptions: ValidationOptions = {
    defaultYear: {
      types: ['current_year_or_number'],
      rules: [['greater_than', [0]]]
    },
    defaultSalary: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    },
    defaultDays: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    }
  }
  const currFields = getFormFields(formFields)
  const errors = getErrors(currFields, validationOptions)
  formErrors.value = errors
  const isValid = Object.keys(formErrors.value!).length === 0

  if (isValid && animationFinished.value) {
    localStorage.setItem('params', JSON.stringify(currFields));

    if(animationFinished.value){
      isUpdated.value = true;
      animationFinished.value = false;
      setTimeout(() => {
        isUpdated.value = false;
        animationFinished.value = true;
      }, 4000)
    }
  }
}
</script>

<template>
  <form @submit="handleSubmit" class="salary-form">
    <div class="salary-fields card">
      <div class="salary-container">
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.defaultYear.value)"
          :ref="formFields?.defaultYear"
          :errors="formErrors?.defaultYear"
          for="defaultYear"
          >Enter a year</FormField
        >
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.defaultSalary.value)"
          :ref="formFields?.defaultSalary"
          :errors="formErrors?.defaultSalary"
          for="defaultSalary"
          >Enter a salary</FormField
        >
        <FormField
          :updateForm="updateForm"
          :inputVal="getVal(formFields?.defaultDays.value)"
          :ref="formFields?.defaultDays"
          :errors="formErrors?.defaultDays"
          for="defaultDays"
          >Enter days</FormField
        >
        <SubmitButton>Update settings</SubmitButton>
      </div>
    </div>
    <UpdateInfo :isUpdated="isUpdated">Updated successfully</UpdateInfo>
  </form>
</template>

<style>
  section.params{
    min-width: 450px
  }
</style>
