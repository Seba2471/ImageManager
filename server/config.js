import dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;
const database = process.env.DATABASE;
const accessKey = process.env.ACCESS_KEY;
const refreshKey = process.env.REFRESH_KEY;
const __dirname = dirname(fileURLToPath(import.meta.url));
const UrlLengthLimit = 1600;

export { port, database, __dirname, accessKey, refreshKey, UrlLengthLimit };
