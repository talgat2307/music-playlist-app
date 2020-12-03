const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Artist = require('./model/Artist');
const Album = require('./model/Album');
const Track = require('./model/Track');
const User = require('./model/User');

mongoose.connect('mongodb://localhost/playlist',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (e) {
    console.log('Collection were not presented, skipping drop...');
  }

  const [artistEminem, artistImagineDragons, artistEdSheeran] = await Artist.create(
    {
      name: 'Eminem',
      information: 'Marshall Bruce Mathers III, known professionally as Eminem is an American rapper, songwriter, and record producer',
      image: 'eminem.jpg',
      published: false
    }, {
      name: 'Imagine Dragons',
      information: 'Imagine Dragons is an American pop rock band from Las Vegas, Nevada',
      image: 'imagine_dragons.jpg',
      published: false
    }, {
      name: 'Ed Sheeran',
      information: 'Edward Christopher Sheeran MBE  is an English singer, songwriter, musician, record producer, and actor',
      image: 'ed_sheeran.jpg',
      published: false
    });

  const [albumOrigins, albumKamikaze, albumX] = await Album.create({
    name: 'Origins',
    artist: artistImagineDragons._id,
    released_date: 2018,
    image: 'origins.jpg',
    published: false
  }, {
    name: 'Kamikaze',
    artist: artistEminem._id,
    released_date: 2018,
    image: 'kamikaze.jpg',
    published: false
  }, {
    name: 'X',
    artist: artistEdSheeran._id,
    released_date: 2014,
    image: 'x.jpg',
    published: false
  });

  await Track.create({
    album: albumKamikaze._id,
    name: 'Kamikaze',
    length: 3.36,
    number: 1,
    published: false
  }, {
    album: albumKamikaze._id,
    name: 'Venom',
    length: 4.29,
    number: 2,
    published: false
  }, {
    album: albumOrigins._id,
    name: 'Birds',
    length: 3.39,
    number: 1,
  }, {
    album: albumOrigins._id,
    name: 'Bad Lier',
    length: 4.02,
    number: 2,
    published: false
  }, {
    album: albumX._id,
    name: 'Photograph',
    length: 4.18,
    number: 1,
    published: false
  }, {
    album: albumX._id,
    name: 'Thinking Out Loud',
    length: 4.21,
    number: 2,
    published: false
  });

  await User.create({
    username: 'user',
    displayName: 'user',
    email: 'user@gmail.com',
    password: '001',
    avatarImage: 'user.jpg',
    token: nanoid(),
    role: 'user'
  }, {
    username: 'admin',
    displayName: 'admin',
    email: 'admin@gmail.com',
    avatarImage: 'admin.png',
    password: '001',
    token: nanoid(),
    role: 'admin'
  });

  db.close();
});