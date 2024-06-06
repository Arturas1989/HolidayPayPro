import type { HolidayFormType } from '@/types/FormFields'

export type Modal = {
  show: boolean
  title: string
  buttonText: string
  type: HolidayFormType
}
