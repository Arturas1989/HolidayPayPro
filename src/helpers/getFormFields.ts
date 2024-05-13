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