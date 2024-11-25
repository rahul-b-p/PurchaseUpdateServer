import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loggers } from '../winston/index.js';


export const writeData = (data) => {
    try {
        const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(data));
        loggers.info('Data Written Successfully');
    } catch (error) {
        loggers.error(error);
    }
}
