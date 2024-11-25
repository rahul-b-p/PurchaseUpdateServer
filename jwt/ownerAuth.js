import jwt from 'jsonwebtoken';

export const getOwnerAuthToken = (username) => {
    return jwt.sign(username, process.env.OWNER_SECRET_KEY);
}