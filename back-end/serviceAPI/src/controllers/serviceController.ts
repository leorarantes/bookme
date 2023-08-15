import { Request, Response } from "express";
import { log } from "../logger.js";
import * as serviceService from "../services/serviceService.js";

export async function getAll(req: Request, res: Response) {
    const requestId: number = res.locals.requestId;

    log.info(`[${requestId}] Retrieving all services...`);
    const services = await serviceService.getAll(requestId);
    log.info(`[${requestId}] Services successfully retrieved.`);

    res.send(services).status(200);
}