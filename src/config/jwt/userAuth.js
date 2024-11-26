import jwt from 'jsonwebtoken';

export const getUserAuthToken = (username) => {
    return jwt.sign(username, process.env.USER_SECRET_KEY);
}