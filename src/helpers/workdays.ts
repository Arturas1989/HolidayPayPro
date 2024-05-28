type Hollidays = { [key: string]: { [key: string]: number } }



export type WorkDays = { [key: string]: string }

export function getAllWorkDays(year: string | undefined) {
  const allWorkDays: WorkDays = {}
  const defaultHollidays: Hollidays = {
    '1': { '1': 1 },
    '2': { '16': 1 },
    '3': { '11': 1 },
    '5': { '1': 1 },
    '6': { '24': 1 },
    '7': { '6': 1 },
    '8': { '15': 1 },
    '11': { '1': 1, '2': 1 },
    '12': { '24': 1, '25': 1, '26': 1 }
  }
  if (year) {
    const currYear = +year - 1
    for (let month = 10; month <= 12; month++) {
      allWorkDays[`${currYear}/${month}`] = getWorkDays('' + currYear, month, defaultHollidays)
    }


    setEaster(+year, defaultHollidays);
    for (let month = 1; month <= 12; month++) {
      allWorkDays[`${year}/${month}`] = getWorkDays(year, month, defaultHollidays)
    }
  }
  return allWorkDays
}

export function getWorkDays(year: string | undefined, monthNum: number, defaultHollidays: Hollidays) {
  if (year) {
    const lastDay = getLastDay(+year, monthNum)
    const lastDayNum = lastDay.getDate()

    const hollidaysCount = getHollidaysCount(+year, monthNum, defaultHollidays)

    const weekendsCount = getWeekends(+year, monthNum, lastDay, lastDayNum)
    return '' + (lastDayNum - weekendsCount - hollidaysCount)
  } else {
    return ''
  }
}

function setEaster(year: number, defaultHollidays: Hollidays) {
  const { easterMonth, easterDay } = GetEasterDate(year)
  if (easterMonth in defaultHollidays) {
    defaultHollidays[easterMonth][easterDay] = 1
  } else {
    defaultHollidays[easterMonth] = { [easterDay]: 1 }
  }
}

function GetEasterDate(year: number) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  const dateTime = new Date(year, month - 1, day + 1)
  const easterMonth = dateTime.getMonth() + 1
  const easterDay = dateTime.getDate()
  return { easterMonth, easterDay }
}

function getLastDay(year: number, monthNum: number) {
  return new Date(year, monthNum, 0)
}

function getWeekdayNum(day: Date) {
  const dayNum = day.getDay()
  return dayNum === 0 ? 7 : dayNum
}

function getHollidaysCount(year: number, monthNum: number, defaultHollidays: Hollidays) {
  let hollidaysCount = 0
  for (const day in defaultHollidays[monthNum]) {
    const hollidayWeekday = getWeekdayNum(new Date(year, monthNum - 1, +day))
    if (hollidayWeekday !== 7 && hollidayWeekday !== 6) hollidaysCount++
  }

  return hollidaysCount
}

function getWeekends(year: number, monthNum: number, lastDay: Date, lastDayNum: number) {
  const firstWeekdayNum = getWeekdayNum(new Date(year, monthNum - 1, 1))
  const lastWeekdayNum = getWeekdayNum(lastDay)

  let firstWeekdays = 2
  if (firstWeekdayNum === 7) firstWeekdays = 1

  let lastWeekdays = 0
  if (lastWeekdayNum > 5) lastWeekdays = lastWeekdayNum - 5

  const remainingWeekdays = ((lastDayNum - (8 - firstWeekdayNum) - lastWeekdayNum) / 7) * 2
  return firstWeekdays + lastWeekdays + remainingWeekdays
}
