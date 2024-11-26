import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loggers } from '../utils/winston/index.js';


export const readData = () => {
    try {
        const dbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json');
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        loggers.info('Data Readed Successfully');
        return data;
    } catch (error) {
        loggers.error(error);
    }
}
