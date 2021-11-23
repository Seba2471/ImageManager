import mongoose from 'mongoose';

const { Schema } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;