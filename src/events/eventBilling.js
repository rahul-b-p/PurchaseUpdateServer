import { getItems } from "../utils/promises/index.js";
import { EventEmitter } from 'events';

const billing = new EventEmitter();



billing.on("billing", async (itemName, quantity, callback) => {
    try {
        const items = await getItems;
        const price = items.find(item => item.name == itemName).price;
        
        const bill = {
            price,
            quantity, 
            totalPrice:price*quantity, 
            SGST:(price*quantity)*9/100, 
            CGST: (price*quantity) * 9 / 100, 
            totalGST:(price*quantity)*18/100,
            amountPayable:price*quantity+(price*quantity)*18/100, 
            timestamp:Date.now()
        };
        callback(bill);
    } catch (error) {
        callback(error, new Error("Billing not worked"));
    }
});

export default billing;