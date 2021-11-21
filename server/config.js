import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const database = process.env.DATABASE;

export { port, database };
