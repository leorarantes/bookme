import joi, { Schema } from "joi";
import { DAYMS, generateBrDate } from "../utils/date.js";

export const createBookBodySchema: Schema = joi.object({
    dateTime: joi.object({
        date: joi.string().custom(validateDate).required(),
        time: joi.string().custom(validateTime).required()
    }).required(),
    clientData: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().required()
    }).required(),
    serviceId: joi.string().required()
}).required();

function validateDate(strDate: string) {
    const error = new Error("date is invalid.");

    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(strDate)) throw error;

    const arrDate = strDate.split('-');
    const day = arrDate[0];
    const month = arrDate[1];
    const year = arrDate[2];
    const date = new Date(`${year}/${month}/${day}`);
    if (!date.getTime()) throw error;
    if ((date.getTime() + DAYMS) <= new Date().getTime()) throw error;

    return true;
}

function validateTime(time: string) {
    const error = new Error("Invalid time.");

    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(time)) throw error;

    const date = generateBrDate('2000-01-01', time);
    if (!date.getTime()) throw error;

    return true;
}