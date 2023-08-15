import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";
import {log} from "./logger.js";
import { generateRandomNumber } from "./utils/random.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    const randomNum = generateRandomNumber(5);
    res.locals.requestId = randomNum;
    log.info(`New request received! (Route: '/${req.url.split('/')[1]}', Method: '${req.method}', ID: ${randomNum})`);
    next();
});

app.use(router);
app.use(errorHandler);

export default app;