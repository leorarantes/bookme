import joi, { Schema } from "joi";
import { DAYMS } from "../utils/date.js";

export const getDayScheduleParamsSchema: Schema = joi.object({
  date: joi.string().custom(validateDate).required(),
  serviceId: joi.string().required()
}).required();

function validateDate(strDate: string) {
  const error = new Error("invalid date.");
  
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if(!regex.test(strDate)) throw error;

  const arrDate = strDate.split('-');
  const day = arrDate[0];
  const month = arrDate[1];
  const year = arrDate[2];
  const date = new Date(`${year}/${month}/${day}`);
  if(!date.getTime()) throw error;
  if((date.getTime() + DAYMS) <= new Date().getTime()) throw error;
  
  return true;
}