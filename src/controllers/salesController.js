import { getSales } from '../utils/promises/index.js'


export const getAllSaleController = async (req, res) => {
    try {
        const sales = await getSales();
        res.status(200).json({ messege: 'Complete Sales Data', body: sales });
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}

export const getUserSaleController = async (req, res) => {
    try {
        const username = req.payload;
        const sales = await getSales();
        const responseData = sales.filter(item => item.client == username);
        res.status(200).json({ messege: 'Sales history of the user', body: responseData });
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}