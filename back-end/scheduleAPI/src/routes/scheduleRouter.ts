import {Router} from "express";

import { getMonthSchedule, getDaySchedule } from "../controllers/scheduleController.js";
import { validateParams } from "../middlewares/schemaValidator.js";
import { getMonthScheduleParamsSchema } from "../schemas/getMonthSchedule.js";
import { getDayScheduleParamsSchema } from "../schemas/getDaySchedule.js";

const scheduleRouter = Router();

scheduleRouter.get('/schedule/month/:date/:serviceId', validateParams(getMonthScheduleParamsSchema), getMonthSchedule);
scheduleRouter.get('/schedule/day/:date/:serviceId', validateParams(getDayScheduleParamsSchema), getDaySchedule);

export default scheduleRouter;