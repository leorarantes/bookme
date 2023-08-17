import { Request, Response } from "express";

import { log } from "../logger.js";
import * as bookService from "../services/bookService.js";
import { } from "@prisma/client";

export interface DateTime {
  date: string;
  time: string;
};

export interface ClientData {
  name: string;
  email: string;
  phone: string;
}

export async function create(req: Request, res: Response) {
    const requestId: number = res.locals.requestId;
    const { dateTime, clientData, serviceId } = req.body;

    log.info(`[${requestId}] Booking new service...`);
    const book = await bookService.create(requestId, dateTime, clientData, serviceId);
    log.info(`[${requestId}] Service successfully booked.`);

    res.send(book).status(201);
}

export async function deleteOne(req: Request, res: Response) {
  const requestId: number = res.locals.requestId;
  const { protocol } = req.params;

  log.info(`[${requestId}] Deleting book...`);
  await bookService.deleteOne(requestId, protocol);
  log.info(`[${requestId}] Book successfully deleted.`);

  res.sendStatus(204);
}