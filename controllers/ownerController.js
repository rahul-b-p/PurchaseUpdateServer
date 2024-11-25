import { getOwnerAuthToken } from "../jwt/ownerAuth.js";
import { getOwners, setOwners } from "../promises/index.js";
import { loggers } from "../winston/index.js";

export const ownerLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const owners = await getOwners;
        if (owners.find((item) => item.username == username)) {
            if (owners.find(item => item.password == password)) {
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
        res.status(400).json('Something went wrong');
        loggers.error(error);
    }
};


export const editOwnerController = async (req, res) => {
    try {
        const { username, password, newUname, newPass } = req.body;
        const owners = await getOwners;
        const index = owners.findIndex(item => item.username == username && item.password == password)
        if(index !==-1){
            owners[index].username=newUname;
            owners[index].password =newPass;
            loggers.info(owners[index]);
            await setOwners(owners);
            res.status(200).json('Edited Successfully');
        }
        else{
            res.statusMessage = "existing credntials not match"
            res.status(404).json("Existing credntials not match wih the serverside")
        }
    } catch (error) {
        loggers.error(error)
        res.status(400).json('Something went wrong')
    }
}