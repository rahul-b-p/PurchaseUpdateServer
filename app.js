import express from 'express';
import { loggers } from './winston/index.js';
import { ownerRouter, userRouter } from './routers/index.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/admin', ownerRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    loggers.info(`Server Running at http://localhost:${port}`);
})



