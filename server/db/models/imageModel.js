import mongoose from 'mongoose';

const { Schema } = mongoose;

const imageSchema = new Schema({
  orignal_name: {
    type: String,
    required: true,
  },
  last_modifity: {
    type: Date,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  albums: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Album',
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
