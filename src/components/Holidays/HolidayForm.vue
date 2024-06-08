<script setup lang="ts">
import FormField from '../FormField.vue'
import SubmitButton from '../Home/Forms/SubmitButton.vue'
import { getErrors } from '@/helpers/form'
import type { ValidationOptions } from '@/services/Validator'
import { inject, type Ref } from 'vue'
import type { UpdateHolidayVal } from './HolidayTable.vue'
import type { ConvertedHolidays } from '@/helpers/data'
import type { Errors, HolidayFormFields, HolidayFormType } from '@/types/FormFields'

const props = defineProps<{
  buttonText: string
  type: HolidayFormType
  closeModal: () => void
  setErrors: (val: Errors) => void
  errors: Errors | null
}>()
const updateHolidayVal: UpdateHolidayVal = inject('updateHolidayVal')!

const formFields = inject<Ref<HolidayFormFields>>('formFields')!
const updateForm = (type: string, input: HTMLInputElement) => {
  formFields.value[type as keyof HolidayFormFields] = input.value
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
  const errors = getErrors(formFields.value, validationOptions)
  props.setErrors(errors);
  const isValid = !Object.keys(errors).length

  const sortObj = (holidays: ConvertedHolidays): ConvertedHolidays => {
    const entries = Object.entries(holidays)
    entries.sort((a, b) => {
      if (a[1]['month'] === b[1]['month']) return +a[1]['day'] - +b[1]['day']
      return +a[1]['month'] - +b[1]['month']
    })
    let newHolidays: ConvertedHolidays = {}
    for (const [key, value] of entries) {
      newHolidays[key] = value
    }
    return newHolidays
  }
  if (isValid) {
    let holidays = JSON.parse(localStorage.getItem('holidays')!)
    const { month, day, description } = formFields.value
    holidays[`${month}/${day}`] = { month, day, description }
    holidays = sortObj(holidays)
    localStorage.setItem('holidays', JSON.stringify(holidays))

    updateHolidayVal(holidays)
    if (props.type === 'edit') props.closeModal()
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
