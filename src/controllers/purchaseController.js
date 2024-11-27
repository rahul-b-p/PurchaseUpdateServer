import { billing, purchase, record } from '../events/index.js';
import { loggers } from '../utils/winston/index.js';

export const purchaseController = async (req, res) => {
    try {
        const { item, quanity } = req.body;
        const username = req.payload

        record.emit("purchase recording", username, item, quanity, (result, err) => {
            if (err) {
                loggers.error(err);
                res.status(500).json(err);
            }
        })

        record.emit("sale recording", username, item, quanity, (result, err) => {
            if (err) {
                loggers.error(err);
                res.status(500).json(err);
            }
        });

        billing.emit("billing", item, quanity, (result, err) => {
            if (err) {
                loggers.info(err);
                res.status(500).json(err);
            }
            else {
                purchase.emit("purchase", item, quanity, (result, err) => {
                    if (err) {
                        loggers.error(err);
                        res.status(500).json(err);
                    }
                });
                res.statusMessage = "Billed Successfully";
                res.status(200).json({ bill: result });
            }
        });


    } catch (error) {
        loggers.error(error)
        res.status(400).json({ messege: 'Something went wrong', error });
    }
}