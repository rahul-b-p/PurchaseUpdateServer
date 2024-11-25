import jwt from 'jsonwebtoken';

export const getUserAuthToken = (username) => {
    return jwt.sign(username, process.env.OWNER_SECRET_KEY);
}