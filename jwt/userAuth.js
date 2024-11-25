import jwt from 'jsonwebtoken';

export const getOwnerAuthToken = (username) => {
    return jwt.sign(username, process.env.USER_SECRET_KEY);
}