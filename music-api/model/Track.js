const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  length: Number,
  number: Number
});

TrackSchema.plugin(idValidator);

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;