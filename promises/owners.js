import { readData,writeData } from "../database/index.js";

export const getOwners = new Promise((resolve, reject) => {
    try {
        const data = readData();
        const { owners } = data;
        resolve(owners);
    } catch (error) {
        reject(error);
    }
});

export const setOwners =(owners)=>{
    return new Promise((resolve,reject)=>{
        try {
            const data = readData();
            if(!Array.isArray(owners)){
                throw new Error('owners should be an array');
            }
            else{
                data.owners = owners;
                writeData(data);
                resolve('Owners Key Updated on db.json');
            }
        } catch (error) {
            reject(error);
        }
    })
}




