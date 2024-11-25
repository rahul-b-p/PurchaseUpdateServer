import winston from "winston";


export const loggers = winston.createLogger({
    transports:[new winston.transports.Console()]
});