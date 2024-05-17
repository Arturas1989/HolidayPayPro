import { Validator, type Fields, type ValidationOptions } from "@/services/Validator";
import type { FormFields } from "@/types/FormFields";

export const getFormFields = (formFields: FormFields) => {
  type Data = {[key: string]: string};
  const data: Data = {};
  for(const key in formFields){
    data[key] = formFields[key].value?.inputRef?.value!;
  }
  return data;
}

export const getErrors = (formFields: Fields, validationOptions: ValidationOptions) => {
  const validator = new Validator(validationOptions, formFields);
  validator.validate();
  return validator.errors;
}