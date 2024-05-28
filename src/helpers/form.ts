import {
  Validator,
  type Fields,
  type ValidationOption,
  type ValidationOptions
} from '@/services/Validator'
import type { FormErrors, FormFields, GeneralFields, MonthFields, SalaryFields } from '@/types/FormFields'
import { getAllWorkDays, type WorkDays } from './workdays'
import type { DataRef, refVal } from '@/types/DataRef'
import type { Ref } from 'vue'


export const isValid = (formErrors: FormErrors) => {
  for(const formType in formErrors){
    const hasErrors = Object.values(formErrors[formType as keyof FormErrors].value!).length;
    if(hasErrors) return false;
  }
  return true;
}

export const getVal = (val: refVal | refVal[] | DataRef | string) => {
  if(Array.isArray(val)) return val[0].inputRef ? val[0].inputRef.value : ''
  if(typeof val === 'object' && val?.inputRef) return val.inputRef.value
  return val as string;
}

export const getFormFields = (formFields: GeneralFields) => {
  const data: Fields = {}
  for (const key in formFields) {
    data[key] = typeof formFields[key] !== 'object' ? formFields[key] : getVal(formFields[key].value)
  }
  return data
}

export const getErrors = (formFields: Fields, validationOptions: ValidationOptions) => {
  const validator = new Validator(validationOptions, formFields)
  validator.validate()
  return validator.errors
}

export const getMonthValidationOptions = (workDays: WorkDays, option: ValidationOption) => {
  const validationOptions: ValidationOptions = {}
  for (const key in workDays) {
    validationOptions[key as keyof ValidationOptions] = option
  }
  return validationOptions
}

export const updateFormFields = (type: string, input: HTMLInputElement, info: Ref<FormFields>, formFields: GeneralFields) => {
  const types = type.split(';');
  if(types.length === 1){
    let updateVal = {...info.value};
    const {monthFields, salaryFields} = updateVal;
    
    const year = getVal(formFields.year.value);
    const salary = getVal(formFields.salary.value);
    if(+year > 0 && +salary > 0) updateVal = calcInfo(year, salary);
    if(types[0] === 'year'){
      const newSalaryFields: SalaryFields = {}
      const prevKeys = Object.keys(salaryFields);
      const newKeys = Object.keys(updateVal.monthFields);
      for(let i = 0; i < newKeys.length; i++){
        newSalaryFields[newKeys[i]] = salaryFields[prevKeys[i]];
      }
      updateVal.salaryFields = newSalaryFields;
    } else {
      updateVal.monthFields = monthFields;
    }
    info.value = updateVal
  } else {
    const updateType = types[1];
    const updateInfo = {...info.value};
    if(updateType === 'salary'){
      const salaryFields = {...updateInfo.salaryFields};
      salaryFields[types[0]] = input.value;
      updateInfo.salaryFields = salaryFields;
    } else {
      const monthFields = {...updateInfo.monthFields};
      monthFields[types[0]] = input.value;
      updateInfo.monthFields = monthFields;
    }
    info.value = updateInfo;
  }
}

export const calcInfo = (year: number | string, salary: number | string) => {
  const workDays = getAllWorkDays('' + year)
  const monthValidationOption: ValidationOption = {
    types: ['positive_integer'],
    rules: [['between', [1, 31]]]
  }

  const salaryValidationOption: ValidationOption = {
    types: ['positive_integer'],
    rules: [['greater_than', [0]]]
  }
  const monthValidationOptions = getMonthValidationOptions(workDays, monthValidationOption)
  const salaryValidationOptions = getMonthValidationOptions(workDays, salaryValidationOption)
  
  const monthFields: MonthFields = {}
  const salaryFields: SalaryFields = {}

  for (const month in workDays) {
    monthFields[month] = workDays[month]
    salaryFields[month] = salary
  }
  return {
    workDays, monthValidationOptions, salaryValidationOptions, monthFields, salaryFields
  }
}

export const validateForm = (info: Ref<FormFields>, formFields: GeneralFields, formErrors: FormErrors) => {
  const {monthValidationOptions, salaryValidationOptions, monthFields, salaryFields} = info.value
  const maxDay = Math.min(...Object.values(monthFields).filter(el => !el.match(/[^0-9]/g) && el !== '0').map(el => +(el as string)))
  const { year, salary, days } = getFormFields(formFields)
  const validationOptions: ValidationOptions = {
    year: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    },
    salary: {
      types: ['positive_integer'],
      rules: [['greater_than', [0]]]
    },
    days: {
      types: ['positive_integer'],
      rules: [['between', [1, maxDay]]]
    }
  }

  formErrors.general.value = getErrors({ year, salary, days }, validationOptions)
  formErrors.month.value = getErrors(monthFields, monthValidationOptions)
  formErrors.salary.value = getErrors(salaryFields, salaryValidationOptions)
}
