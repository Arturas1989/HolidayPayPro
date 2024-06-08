import { defaultData } from "@/helpers/data";
import { useLocalStorage } from "@vueuse/core";

export const useDefaultData = (showNow?: boolean) => {
  const storageData = useLocalStorage<DefaultData>('params', { ...defaultData })
  
  const {defaultSalary, defaultDays } = storageData.value
  let { defaultYear } = storageData.value;
  if (!showNow && defaultYear === 'now') defaultYear = new Date().getFullYear();
  console.log(defaultYear, defaultSalary, defaultDays, storageData.value)
  return {defaultYear, defaultSalary, defaultDays};
}
