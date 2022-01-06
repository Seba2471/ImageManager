import User from '../db/models/userModel.js';
import { getAccessToken, getRefreshToken, compareRefreshToken, deleteRefreshTokens } from '../services/auth/jwtService.js';
import { getUser } from '../services/auth/userService.js';

class userController {
  async create(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      isActive: true,
    });
    try {
      await user.save();
      res.status(201).send('User ' + req.body.email + ' created');
    } catch (e) {
      res.status(403).json({
        emailError: e.errors.email?.message,
        passwordError: e.errors.password?.message,
      });
    }
  }
  async refreshToken(req, res) {
    const user = compareRefreshToken(req.body.refreshToken);
    res.json({ accessToken: getAccessToken(user) });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error('Password not valid');
      }
      res.json({ email: user.email, accessToken: getAccessToken(user), refreshToken: getRefreshToken(user) });
    } catch (e) {
      res.status(401).send('Email or password is wrong');
    }
  }

  async changePassword(req, res) {
    try {
      const user = await getUser(req.user.email);
      if (!req.body.oldPassword || !req.body.newPassword) {
        res.status(401).send('Old password and new password is required');
      }
      const isValidPassword = user.comparePassword(req.body.oldPassword);
      if (!isValidPassword) {
        res.status(401).send('Old password is wrong');
        throw new Error('Password not valid');
      }
      user.password = req.body.newPassword;
      await user.save();
      res.send('Password changed');
    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res) {
    try {
      await deleteRefreshTokens(req.user.id);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new userController();
