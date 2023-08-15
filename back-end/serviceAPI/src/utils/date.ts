import { twoDigitsNumber } from "./parse.js";

export const DAYMS = 86400000;
export const HOURMS = 3600000;
export const MINUTEMS = 60000;

export function getMonthDaysNumber(month: number) {
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
  if(month < 1 || month > 12) return -1;
  return monthDaysNumberHash[month];
}

export function isDateInDay(date: Date, day: Date) {
  if(date.getTime() >= day.getTime() && date.getTime() < day.getTime()+DAYMS) return true;
  return false;
}

export function getStringHour(date: Date) {
  const hour = twoDigitsNumber(date.getUTCHours()-3);
  const minutes = twoDigitsNumber(date.getMinutes());
  return `${hour}:${minutes}`;
}

export function generateBrDate(strDate: string, strTime?: string) {
  const arrDate = strDate.split('-');
  const year = +arrDate[0];
  const month = twoDigitsNumber(+arrDate[1]);
  const day = twoDigitsNumber(+arrDate[2]);
  
  if(strTime) {
    const arrTime = strTime.split(':');
    const hour = twoDigitsNumber(+arrTime[0]);
    const minute = twoDigitsNumber(+arrTime[1]);
    return new Date(`${year}-${month}-${day}T${hour}:${minute}-03:00`);
  }
  return new Date(`${year}-${month}-${day}T00:00-03:00`);
}

export function extractIntDateTime(strDate?: string, strTime?: string) {
  let minute = null;
  let hour = null;
  let day = null;
  let month = null;
  let year = null;
  let arrDate = null;
  let arrTime = null;

  if(strTime) {
    arrTime = strTime.split(':');
    hour = +arrTime[0];
    minute = +arrTime[1];
  }

  if(strDate) {
    let dateType = null;
    const monthRegex = /^\d{2}-\d{4}$/;
    const dayRegex = /^\d{2}-\d{2}-\d{4}$/;

    if(monthRegex.test(strDate)) dateType = 'month';
    if(dayRegex.test(strDate)) dateType = 'day';
  
    arrDate = strDate.split('-');
    if(dateType === 'month') {
      month = +arrDate[0];
      year = +arrDate[1];
    }
    else {
      day = +arrDate[0];
      month = +arrDate[1];
      year = +arrDate[2];
    }
  }

  return {minute, hour, day, month, year};
}

export function isNumberInIntervalS(number: number, startInterval: number, endInterval: number) { // include start but not end
  if(number >= startInterval && number < endInterval) return true;
  return false;
}

export function isNumberInIntervalE(number: number, startInterval: number, endInterval: number) { // include end but not start
  if(number > startInterval && number <= endInterval) return true;
  return false;
}