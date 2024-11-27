import { getUserAuthToken } from '../config/jwt/index.js';
import { getUsers, setUsers } from '../utils/promises/index.js';
import { loggers } from '../utils/winston/index.js';



export const getUsersController = async (req, res) => {
    try {
        const users = await getUsers;
        loggers.info(users)
        res.status(200).json({ users })
    } catch (error) {
        loggers.error(error);
        res.status(400).json("Something went wrong at server side")
    }
}

export const removeUserController = async (req, res) => {
    try {
        const { index } = req.params;
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

export const signupUserController = async (req, res) => {
    try {
        const newUser = req.body;
        const users = await getUsers;
        users.push(newUser);
        await setUsers(users);
        res.status(200).json("User registered successfully")
    } catch (error) {
        loggers.error(error);
        res.status(400).json({ messege: 'Something went wrong', error })
    }


}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await getUsers;
        if (users.find((item) => item.email == email)) {
            if (users.find(item => item.password == password)) {
                const { username } = users.find(item => item.email == email && item.password == password);
                const authToken = getUserAuthToken(username);
                res.statusMessage = "Login Successful";
                res.status(200).json({ messege: `logined by user:${username}`, body: { username, authToken } });
            }
            else {
                res.statusMessage = 'Incorrect Password';
                res.status(401).json("The entered password isn't match with the user, please check");
            }
        }
        else {
            res.statusMessage = 'User Not found';
            res.status(404).json("The enterd username isn't valid, please check!");
        }
    } catch (error) {
        res.status(400).json('Something went wrong');
        loggers.error(error);
    }
}

export const editUserController = async (req, res) => {
    try {
        const { email, password, newUname, newPass, newMail } = req.body;
        const users = await getUsers;
        const index = users.findIndex(item => item.email == email && item.password == password)
        if (index !== -1) {
            users[index].username = newUname;
            users[index].password = newPass;
            users[index].email = newMail;
            loggers.info(users[index]);
            await setUsers(users);
            res.status(200).json({ messege: 'Edited Successfully', editedUserData: users[index] });
        }
        else {
            res.statusMessage = "existing credntials not match"
            res.status(404).json("Existing credntials not match wih the serverside")
        }
    } catch (error) {
        loggers.error(error)
        res.status(400).json('Something went wrong')
    }
}

