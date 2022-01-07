import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validateEmail } from './validators.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [4, 'Email is too short. Minimal length is 4 chars'],
    validate: [validateEmail, 'Email nie prawidłowy'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Hasło jest za krótkie. Minimal length is 4 chars'],
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imagesCount: {
    type: Number,
    default: 0,
  },
});

userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

userSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    error.errors = { email: { message: 'Email already taken' } };
  }
  next(error);
});

const User = mongoose.model('User', userSchema);
export default User;
