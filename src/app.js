import express from 'express';
import dotenv from 'dotenv';
import { loggers } from './utils/winston/index.js'
import { ownerRouter, userRouter } from './routers/index.js';

dotenv.config();

const app = express();
const port = 3000 || process.env.port

app.use(express.json());

app.use('/admin', ownerRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    loggers.info(`Server Running at http://localhost:${port}`);
})



