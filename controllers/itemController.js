import { getItems } from "../promises/index.js"
import { loggers } from "../winston/index.js";




export const getItemController = async (req,res) => {
    try {
        const items = await getItems;
        res.status(200).json({items})
    } catch (error) {
        loggers.error(error);
        res.status(200).json("Something went wrong")
    }
}