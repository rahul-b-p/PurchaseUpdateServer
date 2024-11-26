import jwt from 'jsonwebtoken';
import { loggers } from '../utils/winston/index.js';

export const jwtVerfyOwner = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1];
        loggers.info(authToken);
        const jwtResponse = jwt.verify(authToken, process.env.OWNER_SECRET_KEY);
        req.payload =jwtResponse;
        next();

    } catch (error) {
        res.statusMessage = 'Authorization Failed'
        res.status(401).json('Authorization Failed')
        loggers.error(error);
    }
}