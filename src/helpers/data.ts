import type { Hollidays } from "./workdays";

const holliday_data: Hollidays = {
  '1': { '1': 'New Year’s Day' },
  '2': { '16': 'Day of Re-establishment of the State of Lithuania'},
  '3': { '11': 'Day of Restitution of Independence of Lithuania'},
  '5': { '1': 'International Labour Day' },
  '6': { '24': 'Saint John\'s Day' },
  '7': { '6': 'Statehood Day (commemorates the coronation of the first King of Lithuania)'},
  '8': { '15': 'Assumption Day (Day of Grass)'},
  '11': { '1': 'All Saints’ Day', '2': 'Memorial Day'},
  '12': { '24': 'Christmas Eve', '25': 'Christmas', '26': 'Christmas second day'}
}

type ConvertedHolliday = {
  month: string;
  day: string;
  description: string;
}

export type ConvertedHollidays = {
  [key: string]: ConvertedHolliday;
}

export const getData = (): Hollidays => {
  const hollidays = localStorage.getItem('hollidays');
  if(!hollidays) localStorage.setItem('hollidays', JSON.stringify(convertData(holliday_data)));
  return JSON.parse(localStorage.getItem('hollidays')!) as ConvertedHollidays;
}



const convertData = (data: Hollidays): ConvertedHollidays => {
  const newData: ConvertedHollidays = {};
  for(const month in data){
    for(const day in data[month]){
      const value: ConvertedHolliday = {month, day, description: data[month][day]};
      newData[`${month}/${day}`] = value;
    }
  }
  return newData;
}