import {Router} from "express";

import { getAll } from "../controllers/serviceController.js";

const serviceRouter = Router();

serviceRouter.get('/service', getAll);

export default serviceRouter;