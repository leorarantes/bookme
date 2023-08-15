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

export async function getById(req: Request, res: Response) {
    const requestId: number = res.locals.requestId;
    const id: string = req.params.id;

    log.info(`[${requestId}] Retrieving service by ID '${id}'...`);
    const services = await serviceService.getById(requestId, id);
    log.info(`[${requestId}] Service successfully retrieved.`);

    res.send(services).status(200);
}