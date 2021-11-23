import dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;
const database = process.env.DATABASE;
const __dirname = dirname(fileURLToPath(import.meta.url));

export { port, database, __dirname };
