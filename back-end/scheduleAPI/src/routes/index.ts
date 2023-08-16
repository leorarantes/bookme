import { Router } from "express";
import scheduleRouter from "./scheduleRouter.js";

const router = Router();
router.use(scheduleRouter);
export default router;