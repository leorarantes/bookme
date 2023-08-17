import {Router} from "express";

import { create } from "../controllers/bookController.js";
import { validateBody } from "../middlewares/schemaValidator.js";
import { createBookBodySchema } from "../schemas/createBook.js";

const bookRouter = Router();

bookRouter.post('/book', validateBody(createBookBodySchema), create);

export default bookRouter;