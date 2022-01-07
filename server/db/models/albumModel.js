import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required'],
  },
  images: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Owner is required'],
    ref: 'User',
  },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
