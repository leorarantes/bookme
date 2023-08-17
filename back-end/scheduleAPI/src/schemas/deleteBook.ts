import joi, { Schema } from "joi";

export const deleteBookParamsSchema: Schema = joi.object({
    protocol: joi.string().pattern(/^[a-zA-Z0-9]+$/).required()
}).required();