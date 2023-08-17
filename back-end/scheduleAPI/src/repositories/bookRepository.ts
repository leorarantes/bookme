import { Book, Client } from "@prisma/client";
import { prisma } from "../database.js";

export interface BookData {
  protocol: string;
  date: Date;
  serviceId: string;
  clientId: number;
}

export interface BookClient extends Book {
  client: Client;
}

async function getAll() {
  const books: Book[] = await prisma.book.findMany()
  return books;
}

async function create(bookData: BookData) {
  await prisma.book.create({
    data: bookData
  });
}

async function getByProtocol(protocol: string) {
  const book: BookClient = await prisma.book.findFirst({
    where: {
      protocol
    },
    include: {
      client: true
    }
  });
  return book;
}

async function deleteOne(protocol: string) {
  await prisma.book.delete({
    where: {
      protocol
    }
  });
}

export default {
  getAll,
  create,
  getByProtocol,
  deleteOne
}