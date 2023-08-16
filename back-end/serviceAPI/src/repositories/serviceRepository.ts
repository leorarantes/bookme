import { Availability, Professional, Service, ServiceAvailability, ServiceDescription, ServiceName } from "@prisma/client";
import { prisma } from "../database.js";

export interface ServiceData extends Service {
  name: ServiceName;
  description: ServiceDescription;
  professional: Professional;
  servicesAvailabilities: ServiceAvailabilityInfo[];
}

interface ServiceAvailabilityInfo extends ServiceAvailability {
  availability: Availability;
}

async function getById(id: string) {
  const service: ServiceData = await prisma.service.findFirst({
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

export default {
  getById
}