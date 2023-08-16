import { twoDigitsNumber } from "./parse";

export const DAYMS = 86400000;
export const HOURMS = 3600000;

export function getMonthDaysNumber(month: number) {
  if(
    month !== 1
    && month !== 2
    && month !== 3
    && month !== 4
    && month !== 5
    && month !== 6
    && month !== 7
    && month !== 8
    && month !== 9
    && month !== 10
    && month !== 11
    && month !== 12
  ) return 30;
  
  const monthDaysNumberHash = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  }
  
  return monthDaysNumberHash[month];
}

export function getMonthName(month: number) {
  if(
    month !== 1
    && month !== 2
    && month !== 3
    && month !== 4
    && month !== 5
    && month !== 6
    && month !== 7
    && month !== 8
    && month !== 9
    && month !== 10
    && month !== 11
    && month !== 12
  ) return '';
  
  const monthDaysNumberHash = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  }
  
  return monthDaysNumberHash[month];
}

export function getPreviousMonth(monthYear: string) {
  let month = +monthYear.split('-')[0];
  let year = +monthYear.split('-')[1];

  if(month <= 1) {
    month = 12;
    year--;
    return `12-${year}`;
  }
  month--;
  return `${twoDigitsNumber(month)}-${year}`;
}

export function getNextMonth(monthYear: string) {
  let month = +monthYear.split('-')[0];
  let year = +monthYear.split('-')[1];

  if(month > 12) {
    month = 1;
    year++;
    return `01-${year}`;
  }
  month++;
  return `${twoDigitsNumber(month)}-${year}`;
}

export function getCurrentMonthYear() {
  const date = new Date();
  return twoDigitsNumber(date.getMonth()+1) + '-' + date.getFullYear();
}