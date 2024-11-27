import { loggers } from "../utils/winston/index.js";
import { getUsers, setUsers, getOwners, setOwners } from "../utils/promises/index.js";
import { EventEmitter } from 'events';
import billing from "./eventBilling.js";

const record = new EventEmitter();




record.on("purchase recording", async (username, itemName, quantity) => {
    try {
        billing.emit("billing", itemName, quantity, async(bill, err) => {
            if(err) throw err;
            const users = await getUsers;
            const index = users.findIndex(item => item.username == username);
            if (index == -1) {
                throw new Error('User Not Found');
            }
            else {
                if (Array.isArray(users[index].purchase)) {
                    users[index].purchase = [];
                }
                users[index].purchase.push(bill);
                await setUsers(users);
                loggers.info("Purchase Bill Recorded");
            }
        });
        
    } catch (error) {
        throw error;
    }
});

record.on("sale recording", async (username, itemName, quantity) => {
    try {
        billing.emit("billing", itemName, quantity,async(bill,err)=>{
            if (err) throw err
            const owner = await getOwners;
            bill.client = username;
            owner.sales.push(bill);
            await setOwners(owner);
            loggers.info("Sale record updated");
        });
    } catch (error) {
        throw error;
    }
});

export default record;