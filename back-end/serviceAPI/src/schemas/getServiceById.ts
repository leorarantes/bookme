import joi, { Schema } from "joi";

export const getServiceByIdParamsSchema: Schema = joi.object({
  id: joi.string().required()
}).required();