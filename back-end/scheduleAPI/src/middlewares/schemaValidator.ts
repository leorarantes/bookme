import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

import {log} from "../logger.js";

export function validateBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestId: number = res.locals.requestId;
        log.info(`[${requestId}] Validating schema...`);
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw { type: "error_unprocessable_entity", message: `${error.details.map(detail => detail.message)}` };
        }

        log.info(`[${requestId}] Schema validated sucessfully.`);
        next();
    }
};

export function validateParams(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestId: number = res.locals.requestId;
        log.info(`[${requestId}] Validating schema...`);
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            if(error.details[0].context.error) throw { type: "error_bad_request", message: error.details[0].context.error.message };
            else throw { type: "error_unprocessable_entity", message: `${error.details.map(detail => detail.message)}` };
        }

        log.info(`[${requestId}] Schema validated sucessfully.`);
        next();
    }
};