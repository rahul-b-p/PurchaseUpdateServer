import { getUsers } from '../utils/promises/index.js';
import { loggers } from '../utils/winston/index.js';



export const getUsersController = async (req, res) => {
    try {
        const users = await getUsers;
        loggers.info(users)
        res.status(200).json({users})
    } catch (error) {
        loggers.error(error);
        res.status(400).json("Something went wrong at server side")
    }
}