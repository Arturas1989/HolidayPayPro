import { Validator, type Fields, type FormOption } from "@/services/Validator";
import type { FormFields } from "@/types/FormFields";

export const getFormFields = (formFields: FormFields) => {
  type Data = {[key: string]: string};
  const data: Data = {};
  for(const key in formFields){
    console.log(formFields[key].value)
    data[key] = formFields[key].value?.inputRef?.value!;
  }
  return data;
}

export const getErrors = (formFields: Fields, formOption: FormOption) => {
  const validator = new Validator(formOption, formFields);
  validator.validate();
  return validator.errors;
}