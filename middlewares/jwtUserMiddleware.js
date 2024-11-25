import jwt from 'jsonwebtoken';
import { logger } from '../winston/winstonLoggers.js';

export const jwtVerfyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1];
        logger.info(authToken);
        const jwtResponse = jwt.verify(authToken, process.env.USER_SECRET_KEY);
        // logger.info(jwtResponse)
        req.payload =jwtResponse;
        next();

    } catch (error) {
        res.statusMessage = 'Authorization Failed'
        res.status(401).json('Authorization Failed')
        logger.error(error);
    }
}