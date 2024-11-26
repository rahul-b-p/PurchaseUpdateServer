import { getItems, setItems } from "../utils/promises/index.js";
import { loggers } from "../utils/winston/index.js";




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
    try {
        const { index } = req.params;
        const editedItem = req.body;
        const items = await getItems;
        if(index>=0 && index<items.length){
            items[index] = editedItem;
            await setItems(items);
            res.statusMessage="Item Edited successfully"
            res.status(200).json({editedItem:items[index]})
        }
        else{
            loggers(index);
            res.statusMessage ="Item not found";
            res.status(404).json('Not found item with given index');
        }
    } catch (error) {
        loggers.error(error);
        res.status(400).json('Something went wrong')
    }
}


export const deleteItemController = async (req, res) => {

}