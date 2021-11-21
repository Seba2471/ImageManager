import express from 'express';
import apiRouter from './routers/apiRouter.js';
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
app.use(apiRouter);

export default app;
