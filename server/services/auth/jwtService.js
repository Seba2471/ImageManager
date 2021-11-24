import { accessKey, refreshKey } from '../../config.js';
import jwt from 'jsonwebtoken';
import RefreshToken from '../../db/models/refreshTokenModel.js';

export const getAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    imagesCount: user.imagesCount,
  };
  return jwt.sign(payload, accessKey, { expiresIn: '10h' });
};

export const getRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    imagesCount: user.imagesCount,
  };

  const token = jwt.sign(payload, refreshKey);

  try {
    saveRefreshToken(user.id, token);
    return token;
  } catch (e) {
    console.log(e);
  }
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
