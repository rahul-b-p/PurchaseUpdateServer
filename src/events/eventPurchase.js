import { loggers } from '../utils/winston/index.js';
import { getItems, setItems } from '../utils/promises/index.js';
import { EventEmitter } from 'events';

const purchase = new EventEmitter();




purchase.on("purchase", async (itemName, quantity,callback) => {
    try {
        const items = await getItems;
        const index = items.findIndex(item => item.name == itemName);
        if (index !== -1) {
            items[index].quantity -= quantity;
            await setItems(items);
            loggers.info('Item Count Updated');
            callback("Item Count Updated");
        }
        else {
            callback(new Error('not an Existing Item'));
        }
    } catch (error) {
        callback(error, new Error("Purchase not worked"));
    }
});

export default purchase;