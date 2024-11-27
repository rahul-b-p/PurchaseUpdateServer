import { loggers } from "../utils/winston/index.js";
import { getUsers, setUsers, getOwners, setOwners } from "../utils/promises/index.js";
import { EventEmitter } from 'events';


const record = new EventEmitter();


record.on("error",(err)=>{
    err(new Error("Something went wrong while recording the data"));
})

record.on("purchase recording", async (username, bill, callback) => {
    try {
        const users = await getUsers();
        const index = users.findIndex(item => item.username == username);
        if (index == -1) {
            callback(new Error('User Not Found'));
        }
        else {
            if (!Array.isArray(users[index].purchase)) {
                users[index].purchase = [];
            }
            users[index].purchase.push(bill);
            await setUsers(users);
            loggers.info("Purchase Bill Recorded");
            callback(null, 'Purchase bill recorded on users');
        }
        
    } catch (error) {
        record.emit("error",(err)=>{
            callback(err.message,error);
        })
    }
});

record.on("sale recording", async (username, bill, callback) => {
    try {
        const owner = await getOwners();
        bill.client = username;
        owner.sales.push(bill);
        await setOwners(owner);
        loggers.info("Sale record updated");
        callback(null, "Sale Record Updated");
    } catch (error) {
        record.emit("error",(err)=>{
            callback(err.message,error);
        })
    }
});

export default record;