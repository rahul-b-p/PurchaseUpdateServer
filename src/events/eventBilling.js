import { loggers } from "../utils/winston/index.js";
import { getItems } from "../utils/promises/index.js";
import { EventEmitter } from 'events';

const billing = new EventEmitter();



billing.on("billing", async (itemName, quantity, callback) => {
    try {
        const items = await getItems();
        if (items.findIndex(item => item.name == itemName) != -1) {
            const price = items.find(item => item.name == itemName).price;
            const bill = {
                price,
                quantity,
                totalPrice: price * quantity,
                SGST: (price * quantity) * 9 / 100,
                CGST: (price * quantity) * 9 / 100,
                totalGST: (price * quantity) * 18 / 100,
                amountPayable: price * quantity + (price * quantity) * 18 / 100,
                timestamp: Date.now()
            };
            callback(null, bill);
        }
        else{
            callback(new Error('item not found'),400);
        }
        
    } catch (error) {
        loggers.error(error)
        callback(error);
    }
});

export default billing;