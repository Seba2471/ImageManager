import jwt from 'jsonwebtoken';
import { accessKey } from '../config.js';

export const isAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token not valid');
  }

  jwt.verify(token, accessKey, (err, data) => {
    if (err) {
      return res.status(401).send('Token not valid');
    }
    req.user = data;
    next();
  });
};
