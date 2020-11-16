const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const track_history = require('./app/track_history')
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/playlist',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  app.use('/artists', artists);
  app.use('/albums', albums);
  app.use('/tracks', tracks);
  app.use('/users', users);
  app.use('/track_history', track_history);

  console.log('Connected to MongoDB');
  app.listen(port, () => console.log('Server started'));
};

run().catch(console.error);