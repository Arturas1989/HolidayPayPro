import type { MonthFields, SalaryFields } from "@/types/FormFields";

const getSum = (entries: [string, string | number][], startIndex: number) => {
  let sum = 0
  for(let i = startIndex - 1; i >= startIndex - 3; i--){
    sum+= +entries[i][1];
  }
  
  return sum;
}

const roundDecPoint = (val: number, dec: number) =>{
  const power = 10 ** dec;
  return Math.round(val * power) / power;
}

export const bestMonths = (monthFields: MonthFields, salaryFields: SalaryFields, days: number) => {
  const monthEntries = Object.entries(monthFields);
  const salaryEntries = Object.entries(salaryFields);

  const results: [string, number][] = [];
  for(let i = 3; i < monthEntries.length; i++){
    const average = getSum(salaryEntries, i) / getSum(monthEntries, i);
    const vacationSalary = average * days;
    const remDays = +monthEntries[i][1] - days;
    const remSalary = +salaryEntries[i][1] / +monthEntries[i][1] * remDays;
    const fullSalary = vacationSalary + remSalary;
    const dif = roundDecPoint(fullSalary - +salaryEntries[i][1], 2);
    results.push([monthEntries[i][0], dif]);
  }
  results.sort((a, b) => b[1] - a[1]);
  return results;
}