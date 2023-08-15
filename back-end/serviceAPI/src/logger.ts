import winston from "winston";
import cryptojs from "crypto-js";

const { combine, printf } = winston.format;

export const log = winston.createLogger({
    format: combine(
        printf(({ level, message }) => {
            return `${getCurrentISODate()} ${level}: ${message}`;
        }),
        winston.format.errors({ stack: true })
    ),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "info.log", level: "info" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    log.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

function getCurrentISODate() {
    const unformattedDate = new Date();
    const date = new Date(unformattedDate.valueOf() - unformattedDate.getTimezoneOffset() * 60000);
    const dateString = date.toISOString().replace("Z", '-03:00');
    return dateString;
}

const info = (info: string, sensitiveInfo: string[]) => {
    let newInfo = info;
    for(let i = 0; i < sensitiveInfo.length; i++) {
        newInfo = newInfo.replace("ENCRYPTED", cryptojs.AES.encrypt(sensitiveInfo[i], process.env.SENSITIVE_INFO_ENCRYPT_KEY).toString());
    }
    log.info(newInfo);
}

export const logSI = {
    info
}

export default {
    log
}