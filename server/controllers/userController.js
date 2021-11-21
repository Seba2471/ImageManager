import User from '../db/models/userModel.js';

class userController {
  async list(req, res) {
    const users = await User.find();
    res.json(users);
  }

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
      res.sendStatus(200);
      console.log('Zalogowy!');
    } catch (e) {
      res.status(404).send('Email or password is wrong');
    }
  }
}

export default new userController();
