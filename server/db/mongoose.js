import mongoose from 'mongoose';
import { database } from '../config.js';

export default () => {
  mongoose
    .connect(database, { serverSelectionTimeoutMS: 5000 })
    .then(console.log(`Connection from ${database}`))
    .catch((err) => {
      console.log('DB Error!', err);
    });
};
