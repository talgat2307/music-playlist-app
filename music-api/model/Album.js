const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  released_date: {
    type: Number,
    required: true,
  },
  image: String,
  published: false
});

AlbumSchema.plugin(idValidator);

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
