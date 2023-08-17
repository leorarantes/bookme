import {Router} from "express";

import { create, deleteOne } from "../controllers/bookController.js";
import { validateBody, validateParams } from "../middlewares/schemaValidator.js";
import { createBookBodySchema } from "../schemas/createBook.js";
import { deleteBookParamsSchema } from "../schemas/deleteBook.js";

const bookRouter = Router();

bookRouter.post('/book', validateBody(createBookBodySchema), create);
bookRouter.delete('/book/:protocol', validateParams(deleteBookParamsSchema), deleteOne);

export default bookRouter;