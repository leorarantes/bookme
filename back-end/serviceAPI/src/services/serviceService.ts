import serviceNameRepository, { ServiceNameData } from "../repositories/serviceNameRepository.js";
import { log } from "../logger.js";
import serviceRepository, { ServiceData } from "../repositories/serviceRepository.js";
import { unparseAvailability, unparseAvailabilityPT, unparseDuration, unparsePrice } from "../utils/parse.js";

export async function getAll(requestId: number) {
  const servicesData: ServiceNameData[] = await serviceNameRepository.getAll();
  log.info(`[${requestId}] Services records successfully retrieved from the database.`);
  
  let allServicesData = [];
  servicesData.forEach((serviceData) => {
    const {name, services} = serviceData;
    services.forEach((service) => allServicesData.push({
      id: service.id,
      data: name + ' | ' + service.professional.name + ' | ' + unparsePrice(service.price)
    }))
  });
  return allServicesData;
}

export async function getById(requestId: number, id: string) {
  const service: ServiceData = await serviceRepository.getById(id);
  if (!service) throw { type: "error_not_found", message: "Service not found." };
  log.info(`[${requestId}] Service '${service.name.name}' record sucessfully retrieved from the database.`);
  return {
    id,
    name: service.name.name,
    description: service.description.description,
    duration: unparseDuration(service.duration),
    price: unparsePrice(service.price),
    professional: service.professional.name,
    availability: service.servicesAvailabilities.map((serviceAvailability) => {
      const {dayOfTheWeek, startHour, duration} = serviceAvailability.availability;
      return unparseAvailabilityPT(dayOfTheWeek, startHour, duration);
    })
  };
}