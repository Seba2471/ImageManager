import { accessKey, refreshKey } from '../../config.js';
import jwt from 'jsonwebtoken';
import RefreshToken from '../../db/models/refreshTokenModel.js';

export const getAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, accessKey, { expiresIn: '10h' });
};

export const getRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, refreshKey);

  try {
    saveRefreshToken(user.id, token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

export const compareRefreshToken = (token) => {
  let userData = {};
  const refreshToken = RefreshToken.findOne({ refreshToken: token });
  if (!refreshToken) {
    throw new Error('Refresh Token Not Exists');
  }
  jwt.verify(token, refreshKey, (err, data) => {
    if (err) {
      console.log(err);
      throw new Error('Refresh Token Incorrect');
    }
    return (userData = {
      id: data.id,
      email: data.email,
    });
  });
  return userData;
};

export const saveRefreshToken = async (owner, refreshToken) => {
  deleteRefreshTokens(owner);

  const token = new RefreshToken({
    refreshToken,
    owner,
  });
  try {
    await token.save();
  } catch (e) {
    console.log(e);
  }
};

export const deleteRefreshTokens = async (owner) => {
  const data = await RefreshToken.find({ owner }).select('refreshToken -_id');
  const existsToken = [];
  data.forEach((token) => existsToken.push(token.refreshToken));
  await RefreshToken.deleteMany({ refreshToken: { $in: existsToken } });
};
