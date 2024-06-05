import type { HollidayFormType } from '@/types/FormFields';

export type Modal = {
  show: boolean,
  title: string,
  buttonText: string,
  type: HollidayFormType,
}