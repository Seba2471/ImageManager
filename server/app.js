import express from 'express';
import webRouter from './routers/web_router.js';
import db from './db/mongoose.js';
import cors from 'cors';

const app = express();

//db
db();

//cors
app.use(cors());

//body parser application-json
app.use(express.json());

//mount routers
app.use(webRouter);

export default app;
