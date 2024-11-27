import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loggers } from '../utils/winston/index.js';


export const writeData = (data) => {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data provided for writing');
        }
        const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json');
        const jsonData = JSON.stringify(data, null, 2);
        loggers.info(jsonData); 
        fs.writeFileSync(dbPath, jsonData, 'utf-8');
        loggers.info('Data written successfully');
    } catch (error) {
        loggers.error(error);
    }
}
