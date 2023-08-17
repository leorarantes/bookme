import { Router } from "express";
import scheduleRouter from "./scheduleRouter.js";
import bookRouter from "./bookRouter.js";

const router = Router();
router.use(scheduleRouter);
router.use(bookRouter);
export default router;