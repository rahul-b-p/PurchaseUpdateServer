import { billing, purchase, record } from '../events/index.js';
import { loggers } from '../utils/winston/index.js';

export const purchaseController = async (req, res) => {
    try {
        const { item, quanity } = req.body;
        const username = req.payload

        billing.emit("billing", item, quanity, (err, result) => {
            if (err) {
                if (result == 400) {
                    loggers.error(err);
                    res.status(404).json({ error: err.message })
                } else {
                    res.status(500).json({ error: err.message });
                }
            }
            else {
                const bill = result;

                setTimeout(()=>{
                    record.emit("purchase recording", username, bill, (err, result) => {
                        if (err) {
                            loggers.error(err);
                            res.status(500).json(err.message);
                        }
                    });
                },1000);

                setTimeout(()=>{
                    record.emit("sale recording", username, bill, (err, result) => {
                        if (err) {
                            loggers.error(err);
                            res.status(500).json(err.message);
                        }
                    });
                },1000);

                setTimeout(()=>{
                    purchase.emit("purchase", item, quanity, (result, err) => {
                        if (err) {
                            if (result == 400) {
                                res.status(400).json({ error: err.message })
                            } else {
                                res.status(500).json(err.message);
                            }
                        }
                    });
                },1000);

                res.statusMessage = "Billed Successfully";
                res.status(200).json({ bill: result });
            }
        });


    } catch (error) {
        loggers.error(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
}