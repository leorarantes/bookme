import { Client } from "@prisma/client";
import { prisma } from "../database.js";
import { ClientData } from "../controllers/bookController.js";

async function getOne(clientData: ClientData) {
  const client: Client = await prisma.client.findFirst({
    where: clientData
  })
  return client;
}

async function create(clientData: ClientData) {
  const client = await prisma.client.create({
    data: clientData
  });
  return client
}

export default {
  getOne,
  create
}