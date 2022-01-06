import User from '../../db/models/userModel.js';

export const getUser = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
