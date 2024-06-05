<script setup lang="ts">
import FormField from '../FormField.vue'
import SubmitButton from '../Home/Forms/SubmitButton.vue'
import { getErrors } from '@/helpers/form'
import type { ValidationOptions } from '@/services/Validator'
import { inject, ref, type Ref } from 'vue'
import type { UpdateHollidayVal } from './HollidayTable.vue'
import type { ConvertedHollidays } from '@/helpers/data'
import type { HollidayFormFields, HollidayFormType } from '@/types/FormFields'

const props = defineProps<{
  buttonText: string;
  type: HollidayFormType;
  closeModal: () => void;
}>()
const updateHollidayVal: UpdateHollidayVal = inject('updateHollidayVal')!
const errors = ref<{ [key: string]: string[] } | null>(null)

const formFields = inject<Ref<HollidayFormFields>>('formFields')!
const updateForm = (type: string, input: HTMLInputElement) => {
  formFields.value[type as keyof HollidayFormFields] = input.value
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const validationOptions: ValidationOptions = {
    month: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    },
    day: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    },
    description: {
      types: ['string'],
      rules: [['no_rule', [0]]]
    }
  }
  errors.value = getErrors(formFields.value, validationOptions)
  const isValid = !Object.keys(errors.value).length

  const sortObj = (hollidays: ConvertedHollidays): ConvertedHollidays => {
    const entries = Object.entries(hollidays)
    entries.sort((a, b) => {
      if (a[1]['month'] === b[1]['month']) return +a[1]['day'] - +b[1]['day']
      return +a[1]['month'] - +b[1]['month']
    })
    let newHollidays: ConvertedHollidays = {}
    for (const [key, value] of entries) {
      newHollidays[key] = value
    }
    return newHollidays
  }
  if (isValid) {
    let hollidays = JSON.parse(localStorage.getItem('hollidays')!)
    const { month, day, description } = formFields.value
    hollidays[`${month}/${day}`] = { month, day, description }
    hollidays = sortObj(hollidays)
    localStorage.setItem('hollidays', JSON.stringify(hollidays))

    updateHollidayVal(hollidays)
    if(props.type === 'edit') props.closeModal();
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <FormField
      :key="formFields.month"
      :inputVal="formFields.month"
      for="month"
      :errors="errors?.month"
      :updateForm="updateForm"
      >Month:</FormField
    >
    <FormField
      :key="formFields.day"
      :inputVal="formFields.day"
      for="day"
      :errors="errors?.day"
      :updateForm="updateForm"
      >Day:</FormField
    >
    <FormField
      :key="formFields.description"
      :textArea="true"
      :inputVal="formFields.description"
      for="description"
      :errors="errors?.description"
      :updateForm="updateForm"
      >Description:</FormField
    >
    <SubmitButton>{{ props.buttonText }}</SubmitButton>
  </form>
</template>

<style scoped></style>
