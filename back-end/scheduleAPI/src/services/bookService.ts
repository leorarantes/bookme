import serviceRepository, { ServiceAvailabilitiesBooks } from "../repositories/serviceRepository.js";
import bookRepository, { BookClient } from "../repositories/bookRepository.js";
import clientRepository from "../repositories/clientRepository.js";
import { log } from "../logger.js";
import { DAYMS, MINUTEMS, extractIntDateTime, generateBrDate, isNumberInIntervalS, isNumberInIntervalE, getStringHour } from "../utils/date.js";
import { twoDigitsNumber } from "../utils/parse.js";
import { ClientData, DateTime } from "../controllers/bookController.js";
import { Book } from "@prisma/client";

interface DayTimeSlotMS {
  startDateMS: number;
  endDateMS: number;
}

export async function create(requestId: number, dateTime: DateTime, clientData: ClientData, serviceId: string) {
  const { day, month, year } = extractIntDateTime(dateTime.date, dateTime.time);
  // date of the first milisecond of the day
  let date = generateBrDate(`${year}-${month}-${day}`);

  // get Service record, Availabilities and Books of the day
  const service: ServiceAvailabilitiesBooks = await serviceRepository.getAvailabilitiesBooksByDate(
    serviceId,
    date,
    // new Date(date.getTime() + DAYMS - 1) === date of the last milisecond of the day
    new Date(date.getTime() + DAYMS - 1)
  );
  if (!service) throw { type: "error_not_found", message: "Service not found." };
  log.info(`[${requestId}] Service '${service.name.name}' availabilities and books records successfully retrieved from the database.`);

  // parse availabilities date data
  let dayAvailabilities: DayTimeSlotMS[] = [];
  service.servicesAvailabilities.forEach((serviceAvailability) => {
    const availabilityData = serviceAvailability.availability;
    const { dayOfTheWeek, startHour, duration } = availabilityData;

    if (date.getDay() === dayOfTheWeek) {
      const startDateMS = generateBrDate(`${year}-${month}-${day}`, `${twoDigitsNumber(startHour)}:00`).getTime();
      const endDateMS = startDateMS + (duration * MINUTEMS);
      dayAvailabilities.push({ startDateMS, endDateMS });
    }
  });

  // parse books date data
  let dayBooks: DayTimeSlotMS[] = [];
  service.books.forEach((book) => {
    const startDateMS = book.date.getTime();
    const endDateMS = startDateMS + (service.duration * MINUTEMS);
    dayBooks.push({ startDateMS, endDateMS });
  });

  // new book exact date
  date = generateBrDate(`${year}-${month}-${day}`, dateTime.time);
  
  const nowMS = new Date().getTime();
  let availableTimeSlots = [];
  for (let i = 0; i < dayAvailabilities.length; i++) {
    const dayAvailability = dayAvailabilities[i];
    
    let timeSlot = {
      startDateMS: dayAvailability.startDateMS,
      endDateMS: dayAvailability.startDateMS + (service.duration * MINUTEMS)
    };

    while (timeSlot.endDateMS <= dayAvailability.endDateMS) {
      let conflict = dayBooks.find((dayUnavailability: DayTimeSlotMS) => {
        const { startDateMS, endDateMS } = dayUnavailability;
        return isNumberInIntervalS(timeSlot.startDateMS, startDateMS, endDateMS)
          || isNumberInIntervalE(timeSlot.endDateMS, startDateMS, endDateMS)
          || isNumberInIntervalS(startDateMS, timeSlot.startDateMS, timeSlot.endDateMS)
      });
      if (conflict) {
        const startDateMS = date.getTime();
        const endDateMS = startDateMS + (service.duration * MINUTEMS);
        if(isNumberInIntervalS(startDateMS, conflict.startDateMS, conflict.endDateMS)
          || isNumberInIntervalE(endDateMS, conflict.startDateMS, conflict.endDateMS)
          || isNumberInIntervalS(conflict.startDateMS, startDateMS, endDateMS)
        ) throw { type: "error_conflict", message: "Unavailable date." };

        timeSlot.startDateMS = conflict.endDateMS;
        timeSlot.endDateMS = conflict.endDateMS + (service.duration * MINUTEMS);
      }
      else if (timeSlot.startDateMS <= nowMS) {
        timeSlot.startDateMS = timeSlot.endDateMS;
        timeSlot.endDateMS = timeSlot.startDateMS + (service.duration * MINUTEMS);
      }
      else {
        const timeExceeded = timeSlot.endDateMS > dayAvailability.endDateMS;
        if (timeExceeded) break;
        availableTimeSlots.push({...timeSlot});

        // next time slot
        timeSlot.startDateMS = timeSlot.endDateMS;
        timeSlot.endDateMS = timeSlot.startDateMS + (service.duration * MINUTEMS);
      }
    }
  }

  if (!availableTimeSlots.some((timeSlot) => {
    return getStringHour(new Date(timeSlot.startDateMS)) === dateTime.time;
  })) throw { type: "error_not_found", message: "Unavailable date." };

  const books: Book[] = await bookRepository.getAll();
  const protocol = generateUniqueProtocol(books);
  log.info(`[${requestId}] Protocol successfully generated.`);

  // create client if it doesnt already exists
  let client = await clientRepository.getOne(clientData);
  if(!client) client = await clientRepository.create(clientData);

  await bookRepository.create({protocol, date, serviceId, clientId: client.id});

  return {
    date: `${year}-${month}-${day}`,
    time: dateTime.time,
    protocol
  };
}

export async function deleteOne(requestId: number, protocol: string) {
  const book: BookClient = await bookRepository.getByProtocol(protocol);
  if(!book) throw { type: "error_unauthorized", message: "Invalid protocol." };
  await bookRepository.deleteOne(protocol);
}

export function generateUniqueProtocol(books: Book[]) {
  let isUnique: Boolean | null = null;

  let protocol = '';
  while (!isUnique) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 5; i++) {
      protocol += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (!books.some((book: Book) => book.protocol === protocol)) isUnique = true;
  };

  return protocol;
}