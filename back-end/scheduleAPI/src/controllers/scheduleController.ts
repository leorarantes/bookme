import { Request, Response } from "express";

import { log } from "../logger.js";
import * as scheduleService from "../services/scheduleService.js";
import { } from "@prisma/client";

export async function getMonthSchedule(req: Request, res: Response) {
    const requestId: number = res.locals.requestId;
    const { serviceId, date } = req.params;

    log.info(`[${requestId}] Retrieving month schedule...`);
    const schedule = await scheduleService.getMonthSchedule(requestId, serviceId, date);
    log.info(`[${requestId}] Month schedule successfully retrieved.`);

    res.send(schedule).status(200);
}

export async function getDaySchedule(req: Request, res: Response) {
    const requestId: number = res.locals.requestId;
    const { date, serviceId } = req.params;

    log.info(`[${requestId}] Retrieving day schedule...`);
    const schedule = await scheduleService.getDaySchedule(requestId, serviceId, date);
    log.info(`[${requestId}] Day schedule successfully retrieved.`);

    res.send(schedule).status(200);
}