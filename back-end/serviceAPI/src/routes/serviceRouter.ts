import {Router} from "express";

import { getAll, getById } from "../controllers/serviceController.js";
import { validateParams } from "../middlewares/schemaValidator.js";
import { getServiceByIdParamsSchema } from "../schemas/getServiceById.js";

const serviceRouter = Router();

serviceRouter.get('/service', getAll);
serviceRouter.get('/service/:id', validateParams(getServiceByIdParamsSchema), getById);

export default serviceRouter;