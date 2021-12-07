import jwt from 'jsonwebtoken';
import { accessKey } from '../config.js';

export const isAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, accessKey, (err, data) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = data;
    next();
  });
};
