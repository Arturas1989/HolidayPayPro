import type { WorkDays } from '@/helpers/workdays'
import type { ValidationOptions } from '@/services/Validator'
import type { Ref } from 'vue'
import type { DataRef } from './DataRef'

export type SalaryFormFields = {
  year: unknown
  salary: unknown
  days: unknown
}

export type MonthFields = {
  [key: string]: string
}

export type SalaryFields = {
  [key: string]: string | number
}

export type FormFields = {
  workDays: WorkDays
  monthValidationOptions: ValidationOptions
  salaryValidationOptions: ValidationOptions
  monthFields: MonthFields
  salaryFields: SalaryFields
}

export type GeneralFields = { [key: string]: Ref<DataRef> }

export type Errors = {
  [key: string]: string[];
};
export type ErrorsRef = Ref<Errors | null>

export type FormErrors = {
  general: ErrorsRef,
  month: ErrorsRef,
  salary: ErrorsRef,
}

export type HollidayFormFields = {
  month: string
  day: string
  description: string
}

export type HollidayFormType = 'edit' | 'add' | '';
