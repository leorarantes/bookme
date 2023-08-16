import { Availability, Book, Professional, Service, ServiceAvailability, ServiceDescription, ServiceName } from "@prisma/client";
import { prisma } from "../database.js";

export interface ServiceInfo extends Service {
  name: ServiceName;
  description: ServiceDescription;
  professional: Professional;
  servicesAvailabilities: ServiceAvailabilityInfo[];
}

interface ServiceAvailabilityInfo extends ServiceAvailability {
  availability: Availability;
}

export interface ServiceAvailabilitiesBooks extends Service {
  name: ServiceName;
  servicesAvailabilities: ServiceAvailabilityInfo[];
  books: Book[];
}

async function getById(id: string) {
  const service: ServiceInfo = await prisma.service.findFirst({
    where: {
      id
    },
    include: {
      name: true,
      description: true,
      professional: true,
      servicesAvailabilities: {
        include: {
          availability: true
        }
      }
    }
  })
  return service;
}

async function getAvailabilitiesBooksByDate(id: string, startDate: Date, endDate: Date) {
  const service: ServiceAvailabilitiesBooks = await prisma.service.findFirst({
    where: {
      id
    },
    include: {
      name: true,
      servicesAvailabilities: {
        include: {
          availability: true
        }
      },
      books: {
        where: {
          date: {
            gte: startDate,
            lt: endDate
          }
        }
      }
    }
  })
  return service;
}

export default {
  getById,
  getAvailabilitiesBooksByDate
}