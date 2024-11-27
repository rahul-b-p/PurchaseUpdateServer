import { loggers } from "../utils/winston/index.js";
import { getUsers, setUsers, getOwners, setOwners } from "../utils/promises/index.js";
import { EventEmitter } from 'events';
import billing from "./eventBilling.js";
import e from "express";

const record = new EventEmitter();


record.on("error",(err)=>{
    err(new Error("Something went wrong while recording the data"));
})

record.on("purchase recording", async (username, itemName, quantity, callback) => {
    try {
        billing.emit("billing", itemName, quantity, async(bill, err) => {
            if(err) callback(err);
            const users = await getUsers();
            const index = users.findIndex(item => item.username == username);
            if (index == -1) {
                callback( new Error('User Not Found'));
            }
            else {
                if (!Array.isArray(users[index].purchase)) {
                    users[index].purchase = [];
                }
                users[index].purchase.push(bill);
                await setUsers(users);
                loggers.info("Purchase Bill Recorded");
                callback('Purchase bill recorded on users');
            }
        });
        
    } catch (error) {
        record.emit("error",(err)=>{
            callback(err,error);
        })
    }
});

record.on("sale recording", async (username, itemName, quantity, callback) => {
    try {
        billing.emit("billing", itemName, quantity,async(bill,err)=>{
            if (err) callback(err);
            const owner = await getOwners();
            bill.client = username;
            owner.sales.push(bill);
            await setOwners(owner);
            loggers.info("Sale record updated");
            callback("Sale Record Updated");
        });
    } catch (error) {
        record.emit("error",(err)=>{
            callback(err,error);
        })
    }
});

export default record;