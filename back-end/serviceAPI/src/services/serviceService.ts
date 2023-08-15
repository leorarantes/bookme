import serviceNameRepository, { ServiceNameData } from "../repositories/serviceNameRepository.js";
import { log } from "../logger.js";

export async function getAll(requestId: number) {
  const services: ServiceNameData[] = await serviceNameRepository.getAll();
  log.info(`[${requestId}] Services records successfully retrieved from the database.`);
  return services;
}

export default {
  getAll
}