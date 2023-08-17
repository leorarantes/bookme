import { Book } from "@prisma/client";
import { prisma } from "../database.js";

export interface BookData {
  protocol: string;
  date: Date;
  serviceId: string;
  clientId: number;
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

export default {
  getAll,
  create
}