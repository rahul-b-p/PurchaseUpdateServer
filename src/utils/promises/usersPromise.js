import { readData, writeData } from "../../database/index.js";

export const getUsers = ()=>{
    return new Promise((resolve, reject) => {
        try {
            const data = readData();
            const { users } = data;
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

export const setUsers =(users)=>{
    return new Promise((resolve,reject)=>{
        try {
            const data = readData();
            if(!Array.isArray(users)){
                throw new Error('users should be an array');
            }
            else{
                data.users = users;
                writeData(data);
                resolve('User Key Updated on db.json');
            }
        } catch (error) {
            reject(error);
        }
    })
}



