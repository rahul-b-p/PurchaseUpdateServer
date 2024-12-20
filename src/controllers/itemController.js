import { getItems, setItems } from "../utils/promises/index.js";
import { loggers } from "../utils/winston/index.js";




export const getItemController = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json({ items });
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const addItemController = async (req, res) => {
    try {
        const newItem = req.body;
        const items = await getItems();
        items.push(newItem);
        loggers.info(items)
        await setItems(items);
        res.statusMessage = "Item added Successfully"
        res.status(200).json("Item added Successfully into your list")
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const edtItemController = async (req, res) => {
    try {
        const { index } = req.params;
        const editedItem = req.body;
        const items = await getItems();
        if (index < 0 || index >= items.length) {
            loggers.info(index);
            res.statusMessage = "Item not found";
            res.status(404).json('Not found item with given index');
        }
        else {
            items[index] = editedItem;
            await setItems(items);
            res.statusMessage = "Item Edited successfully"
            res.status(200).json({ editedItem: items[index] })
        }
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const deleteItemController = async (req, res) => {
    try {
        const { index } = req.params;
        const items = await getItems();
        if (index < 0 || index >= items.length) {
            loggers.info(index);
            res.statusMessage = "Item not found";
            res.status(404).json('Not found item with given index');
        } else {
            items.splice(index, 1);
            await setItems(items);
            res.status(200).json("Item Removed successfully");
        }
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }

}