import {readData,writeData} from '../../database/index.js';



export const getSales = () => {
    return new Promise((resolve, reject) => {
        try {
            const data = readData();
            const { sales } = data;
            resolve(sales);
        } catch (error) {
            reject(error);
        }
    });
}

export const setSales = (sales) => {
    return new Promise((resolve, reject) => {
        try {
            const data = readData();
            if (!Array.isArray(sales)) {
                throw new Error('users should be an array');
            }
            else {
                data.sales = sales;
                writeData(data);
                resolve('User Key Updated on db.json');
            }
        } catch (error) {
            reject(error);
        }
    })
}
