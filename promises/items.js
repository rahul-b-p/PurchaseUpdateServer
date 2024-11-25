import { readData, writeData } from "../database/index.js";

export const getItems = new Promise((resolve, reject) => {
    try {
        const data = readData();
        const { items } = data;
        resolve(items);
    } catch (error) {
        reject(error);
    }
});

export const setItems =(items)=>{
    return new Promise((resolve,reject)=>{
        try {
            const data = readData();
            if(!Array.isArray(items)){
                throw new Error('"items" should be an array');
            }
            else{
                data.items = items;
                writeData(data);
                resolve('Items Key Updated on db.json');
            }
        } catch (error) {
            reject(error);
        }
    })
}




