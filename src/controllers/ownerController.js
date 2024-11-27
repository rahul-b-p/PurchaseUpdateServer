import { getOwnerAuthToken } from "../config/jwt/index.js";
import { getOwners, setOwners } from "../utils/promises/index.js";
import { loggers } from "../utils/winston/index.js";

export const ownerLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const owner = await getOwners();
        if (owner.username==username) {
            if (owner.password == password) {
                const authToken = getOwnerAuthToken(username);
                res.statusMessage = "Login Successful";
                res.status(200).json({ authToken });
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
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
};


export const editOwnerController = async (req, res) => {
    try {
        const { username, password, newUname, newPass } = req.body;
        const owner = await getOwners();
        if (owner.username == username && owner.password == password) {
            owner.username = newUname;
            owner.password = newPass;
            await setOwners(owner);
            res.status(200).json({Messege:'Edited Successfully',body:{owner}});
        }
        else {
            res.statusMessage = "existing credntials not match"
            res.status(404).json("Existing credntials not match wih the serverside")
        }
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}

