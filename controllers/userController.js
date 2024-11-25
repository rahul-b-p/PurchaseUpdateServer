import { getUsers } from '../promises/index.js';
import { loggers } from '../winston/winstonLoggers.js';



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