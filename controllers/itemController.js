import { getItems, setItems } from "../promises/index.js"
import { loggers } from "../winston/index.js";




export const getItemController = async (req, res) => {
    try {
        const items = await getItems;
        res.status(200).json({ items })
    } catch (error) {
        loggers.error(error);
        res.status(200).json("Something went wrong")
    }
}


export const addItemController = async (req, res) => {
    try {
        const newItem = req.body;
        const items = await getItems;
        items.push(newItem);
        loggers.info(items)
        await setItems(items);
        res.statusMessage = "Item added Successfully"
        res.status(200).json("Item added Successfully into your list")
    } catch (error) {
        loggers.error(error);
        res.status(400).json('something went wrong');
    }
}


export const edtItemController = async (req, res) => {

}


export const deleteItemController = async(req, res) => {

}