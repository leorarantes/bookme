import serviceRepository, { ServiceAvailabilitiesBooks } from "../repositories/serviceRepository.js";
import { log, logSI } from "../logger.js";
import { DAYMS, MINUTEMS, extractIntDateTime, generateBrDate, getMonthDaysNumber, isNumberInIntervalS, isNumberInIntervalE, getStringHour } from "../utils/date.js";
import { twoDigitsNumber } from "../utils/parse.js";

interface DayTimeSlotMS {
  startDateMS: number;
  endDateMS: number;
}

interface WeekDayAvailability {
  startHour: number;
  duration: number;
}

export async function getMonthSchedule(requestId: number, serviceId: string, strDate: string) {
  const { month, year } = extractIntDateTime(strDate);
  const firstDayOfTheMonth = generateBrDate(`${year}-${month}-01`);
  const lastDayOfTheMonth = generateBrDate(`${year}-${month}-${getMonthDaysNumber(month)}`);
  const firstCalendarSunday = new Date(firstDayOfTheMonth.getTime() - (firstDayOfTheMonth.getDay() * DAYMS));

  const service: ServiceAvailabilitiesBooks = await serviceRepository.getAvailabilitiesBooksByDate(
    serviceId,
    firstCalendarSunday,
    // new Date(generateBrDate(`${year}-${month}-${getMonthDaysNumber(month)}`).getTime() + DAYMS - 1) === last milisecond of lastDayOfTheMonth
    new Date(generateBrDate(`${year}-${month}-${getMonthDaysNumber(month)}`).getTime() + DAYMS - 1)
  );
  if (!service) throw { type: "error_not_found", message: "Service not found." };
  log.info(`[${requestId}] Service '${service.name.name}' availabilities and books records successfully retrieved from the database.`);

  // group availabilities by day of the week (hash)
  let weekAvailabilitiesHash: { [key: number]: WeekDayAvailability[]; } = {};
  service.servicesAvailabilities.forEach((serviceAvailability) => {
    const {dayOfTheWeek, startHour, duration} = serviceAvailability.availability;
    if(weekAvailabilitiesHash[dayOfTheWeek]) weekAvailabilitiesHash[dayOfTheWeek].push({startHour, duration});
    else weekAvailabilitiesHash[dayOfTheWeek] = [{startHour, duration}];
  });
  
  // group books by day of the month (hash)
  let monthBooksHash: { [key: string]: DayTimeSlotMS[]; } = {};
  service.books.forEach((book) => {      
    const dayOfTheMonth = book.date.getUTCDate();
    const month = book.date.getMonth()+1;
    const startDateMS = book.date.getTime();
    const endDateMS = startDateMS + (service.duration * MINUTEMS);
    if(monthBooksHash[`${dayOfTheMonth}-${month}`]) monthBooksHash[`${dayOfTheMonth}-${month}`].push({startDateMS, endDateMS});
    else monthBooksHash[`${dayOfTheMonth}-${month}`] = [{startDateMS, endDateMS}];
  });

  // check which days of the month are available
  let monthSchedule = [];
  const nowMS = new Date().getTime();
  for (let dateMS = firstCalendarSunday.getTime(); dateMS <= lastDayOfTheMonth.getTime(); dateMS += DAYMS) {
    const id = monthSchedule.length + 1;
    const dayDate = new Date(dateMS);
    const dayMonth = dayDate.getMonth() + 1;
    const dayYear = dayDate.getFullYear();
    const dayOfTheMonth = dayDate.getUTCDate();
    const dayOfTheWeek = dayDate.getDay();
    let dayData = {
      id,
      year: dayYear,
      month: dayMonth,
      dayOfTheMonth,
      isAvailable: null
    };

    if (dateMS + DAYMS <= nowMS) monthSchedule.push({ ...dayData, isAvailable: false });
    else {
      const dayAvailabilities = getDayAvailabilities(weekAvailabilitiesHash, dayOfTheWeek, dayOfTheMonth, dayMonth, dayYear);
      const dayBooks = getDayBooks(monthBooksHash, dayOfTheMonth, month);
      let isDayAvailable = false;
      
      for (let i = 0; i < dayAvailabilities.length; i++) {
        const dayAvailability = dayAvailabilities[i];
        let newBook = {
          startDateMS: dayAvailability.startDateMS > nowMS ? dayAvailability.startDateMS : nowMS,
          endDateMS: dayAvailability.startDateMS > nowMS ? dayAvailability.startDateMS + (service.duration * MINUTEMS) : nowMS + (service.duration * MINUTEMS)
        };

        while (newBook.endDateMS <= dayAvailability.endDateMS) {
          let conflict = dayBooks.find((dayBook: DayTimeSlotMS) => {
            const { startDateMS, endDateMS } = dayBook;
            return isNumberInIntervalS(newBook.startDateMS, startDateMS, endDateMS)
              || isNumberInIntervalE(newBook.endDateMS, startDateMS, endDateMS)
              || isNumberInIntervalS(startDateMS, newBook.startDateMS, newBook.endDateMS)
          });

          if (conflict) {
            newBook.startDateMS = conflict.endDateMS;
            newBook.endDateMS = conflict.endDateMS + (service.duration * MINUTEMS);
          }
          else {
            const timeExceeded = newBook.endDateMS > dayAvailability.endDateMS;
            if (timeExceeded) break;
            isDayAvailable = true;
            break;
          }
        }
        if (isDayAvailable) break;
      }

      if (isDayAvailable) monthSchedule.push({ ...dayData, isAvailable: true });
      else monthSchedule.push({ ...dayData, isAvailable: false });
    }
  }

  log.info(`[${requestId}] Month schedule successfully generated.`);
  return monthSchedule;
}

export async function getDaySchedule(requestId: number, serviceId: string, strDate: string) {
  const {day, month, year} = extractIntDateTime(strDate);
  const date = generateBrDate(`${year}-${month}-${day}`);

  const service: ServiceAvailabilitiesBooks = await serviceRepository.getAvailabilitiesBooksByDate(
    serviceId,
    date,
    // new Date(date.getTime() + DAYMS - 1) === last milisecond of day
    new Date(date.getTime() + DAYMS - 1)
  );
  if (!service) throw { type: "error_not_found", message: "Service not found." };
  log.info(`[${requestId}] Service '${service.name.name}' availabilities and books records successfully retrieved from the database.`);

  let dayAvailabilities: DayTimeSlotMS[] = [];
  service.servicesAvailabilities.forEach((serviceAvailability) => {
    const availabilityData = serviceAvailability.availability;
    const {dayOfTheWeek, startHour, duration} = availabilityData;
    const startDateMS = generateBrDate(`${year}-${month}-${day}`, `${twoDigitsNumber(startHour)}:00`).getTime();
    const endDateMS = startDateMS + (duration * MINUTEMS);
    if(date.getDay() === dayOfTheWeek) dayAvailabilities.push({startDateMS, endDateMS});
  });

  let dayBooks: DayTimeSlotMS[] = [];
  service.books.forEach((book) => {
    const startDateMS = book.date.getTime();
    const endDateMS = startDateMS + (service.duration * MINUTEMS);
    dayBooks.push({startDateMS, endDateMS});    
  });

  let daySchedule = [];
  const nowMS = new Date().getTime();
  for (let i = 0; i < dayAvailabilities.length; i++) {
    const dayAvailability = dayAvailabilities[i];
    let newBook = {
      startDateMS: dayAvailability.startDateMS,
      endDateMS: dayAvailability.startDateMS + (service.duration * MINUTEMS)
    };

    while (newBook.endDateMS <= dayAvailability.endDateMS) {
      let conflict = dayBooks.find((dayUnavailability: DayTimeSlotMS) => {
        const { startDateMS, endDateMS } = dayUnavailability;
        return isNumberInIntervalS(newBook.startDateMS, startDateMS, endDateMS)
          || isNumberInIntervalE(newBook.endDateMS, startDateMS, endDateMS)
          || isNumberInIntervalS(startDateMS, newBook.startDateMS, newBook.endDateMS)
      });

      if (conflict) {
        newBook.startDateMS = conflict.endDateMS;
        newBook.endDateMS = conflict.endDateMS + (service.duration * MINUTEMS);
      }
      else if(newBook.startDateMS <= nowMS) {
        newBook.startDateMS = newBook.endDateMS;
        newBook.endDateMS = newBook.startDateMS + (service.duration * MINUTEMS);
      }
      else {
        const timeExceeded = newBook.endDateMS > dayAvailability.endDateMS;
        if (timeExceeded) break;
        daySchedule.push({id: daySchedule.length+1, hourMinute: getStringHour(new Date(newBook.startDateMS))});
        newBook.startDateMS = newBook.endDateMS;
        newBook.endDateMS = newBook.startDateMS + (service.duration * MINUTEMS);
      }
    }
  }  

  log.info(`[${requestId}] Day schedule successfully generated.`);
  return daySchedule;
}

function getDayAvailabilities(weekAvailabilities: { [key: number]: WeekDayAvailability[]; }, dayOfTheWeek: number, dayOfTheMonth: number, month: number, year: number) {
  let dayAvailabilities: DayTimeSlotMS[] = [];

  if(weekAvailabilities[dayOfTheWeek]) {
    dayAvailabilities = weekAvailabilities[dayOfTheWeek].map((weekAvailability) => {
      const startDateMS = generateBrDate(`${year}-${month}-${dayOfTheMonth}`, `${twoDigitsNumber(weekAvailability.startHour)}:00`).getTime();
      const endDateMS = startDateMS + (weekAvailability.duration * MINUTEMS);
      return { startDateMS, endDateMS };
    });
  }

  return dayAvailabilities;
};

function getDayBooks(monthBooks: { [key: string]: DayTimeSlotMS[]; }, dayOfTheMonth: number, month: number) {
  let dayBooks: DayTimeSlotMS[] = [];
  if(monthBooks[`${dayOfTheMonth}-${month}`]) {
    dayBooks = monthBooks[`${dayOfTheMonth}-${month}`];
    dayBooks.sort((a, b) => a.startDateMS - b.startDateMS);
  }
  return dayBooks;
}