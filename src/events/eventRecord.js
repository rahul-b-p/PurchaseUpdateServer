import { loggers } from "../utils/winston/index.js";
import { getSales, setSales } from "../utils/promises/index.js";
import { EventEmitter } from 'events';


const record = new EventEmitter();


record.on("error",(err)=>{
    err(new Error("Something went wrong while recording the data"));
})

record.on("sale recording", async (username, bill, callback) => {
    try {
        const sales = await getSales();
        bill.client = username;
        sales.push(bill);
        await setSales(sales);
        loggers.info("Sale record updated");
        callback(null, "Sale Record Updated");
    } catch (error) {
        record.emit("error",(err)=>{
            callback(err.message,error);
        })
    }
});

export default record;