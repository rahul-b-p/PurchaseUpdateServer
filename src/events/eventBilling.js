import { getItems } from "../utils/promises/index.js";
import { EventEmitter } from 'events';

const billing = new EventEmitter();



billing.on("billing", async (itemName, quantity, callback) => {
    try {
        const items = await getItems;
        const price = items.find(item => item.name == itemName).price;
        const totalPrice = price * quantity;
        const SGST = totalPrice * 9 / 100;
        const CGST = totalPrice * 9 / 100;
        const totalGST = SGST + CGST;
        const amountPayable = totalPrice + totalGST;
        const timestamp = Date.now();
        const bill = {
            price,
            quantity, 
            totalPrice, 
            SGST, CGST, totalGST, amountPayable, timestamp
        };
        callback(bill);
    } catch (error) {
        callback(error, new Error("Billing not worked"));
    }
});

export default billing;