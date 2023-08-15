import serviceNameRepository, { ServiceNameData } from "../repositories/serviceNameRepository.js";
import { log } from "../logger.js";
import serviceRepository, { ServiceInfo } from "../repositories/serviceRepository.js";
import { unparseAvailability, unparseDuration, unparsePrice } from "../utils/parse.js";

export async function getAll(requestId: number) {
  const servicesData: ServiceNameData[] = await serviceNameRepository.getAll();
  log.info(`[${requestId}] Services records successfully retrieved from the database.`);
  return servicesData.map((serviceData) => {
    const {id, name, services} = serviceData;
    return {
      id,
      name,
      services: services.map((service) => {
        return {
          id: service.id,
          price: service.price,
          professional: service.professional.name
        };
      })
    };
  });
}

export async function getById(requestId: number, id: string) {
  const service: ServiceInfo = await serviceRepository.getById(id);
  if (!service) throw { type: "error_not_found", message: "Service not found." };
  log.info(`[${requestId}] Service '${service.name.name}' record sucessfully retrieved from the database.`);
  return {
    id,
    name: service.name.name,
    description: service.description.description,
    duration: unparseDuration(service.duration),
    price: unparsePrice(service.price),
    availability: service.servicesAvailabilities.map((serviceAvailability) => {
      const {dayOfTheWeek, startHour, duration} = serviceAvailability.availability;
      return unparseAvailability(dayOfTheWeek, startHour, duration);
    })
  };
}