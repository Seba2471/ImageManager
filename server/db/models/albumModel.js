import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Image',
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
