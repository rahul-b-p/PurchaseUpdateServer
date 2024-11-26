import { getUsers, setUsers } from '../utils/promises/index.js';
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

export const removeUserController =async(req,res)=>{
    try {
        const {index} = req.params;
        const users = await getUsers;
        if (index < 0 || index >= users.length) {
            loggers.info(index)
            res.statusMessage = "User not found";
            res.status(404).json('Not found any user with given index');
        } else {
            users.splice(index, 1);
            await setUsers(users);
            res.status(200).json("User Removed successfully");
        }
    } catch (error) {
        loggers.error(error);
        res.status(400).json("Something went wrong");
    }
}