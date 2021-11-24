import User from '../db/models/userModel.js';
import { getAccessToken, getRefreshToken, deleteRefreshTokens } from '../services/auth/jwtService.js';

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
      res.json({ accessToken: getAccessToken(user), refreshToken: getRefreshToken(user) });
    } catch (e) {
      console.log(e);
      res.status(401).send('Email or password is wrong');
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
