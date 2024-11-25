import express from 'express';
import { loggers } from './winston/index.js';

const app = express();
const port = 3000;

app.listen(port,()=>{
    loggers.info(`Server Running at http://localhost:${port}`)
})



