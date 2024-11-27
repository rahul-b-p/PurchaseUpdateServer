import { readData, writeData } from "../../database/index.js";
import { loggers } from "../winston/winstonLoggers.js";

export const getOwners = ()=>{
    return new Promise((resolve, reject) => {
        try {
            const data = readData();
            const { owner } = data;
            resolve(owner);
        } catch (error) {
            reject(error);
        }
    });
}

export const setOwners = (owner) => {
    return new Promise((resolve, reject) => {
        try {
            const data = readData();
            data.owner = owner;
            writeData(data);
            resolve('Owners Key Updated on db.json');
        } catch (error) {
            reject(error);
        }
    });
}




