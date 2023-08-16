import joi, { Schema } from "joi";
import { DAYMS, getMonthDaysNumber } from "../utils/date.js";

export const getMonthScheduleParamsSchema: Schema = joi.object({
  date: joi.string().custom(validateDate).required(),
  serviceId: joi.string().required()
}).required();

function validateDate(strDate: string) {
  const error = new Error("Invalid date.");
  
  const regex = /^\d{2}-\d{4}$/;
  if(!regex.test(strDate)) throw error;
  
  const arrDate = strDate.split('-');
  const month = arrDate[0];
  const year = arrDate[1];
  const date = new Date(`${year}/${month}/${getMonthDaysNumber(+month)}`);
  if(!date.getTime()) throw error;
  if((date.getTime() + DAYMS) <= new Date().getTime()) throw error;
  
  return true;
}