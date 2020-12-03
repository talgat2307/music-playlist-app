const router = require('express').Router();
const axios = require('axios');
const { nanoid } = require('nanoid');
const multer = require('multer');
const path = require('path');
const User = require('../model/User');
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.send(500).status(e);
  }
});

router.post('/', upload.single('avatarImage'), async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password,
    });

    if (req.file) {
      user.avatarImage = req.file.filename
    }

    user.generateToken();
    await user.save();
    res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({ error: 'Username not found' });
  }
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({ error: 'Password is wrong' });
  }

  user.generateToken();
  await user.save({ validateBeforeSave: false });

  res.send({ user });
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = { message: 'Success' };

  if (!token) return res.send(success);
  const user = await User.findOne({ token });

  if (!user) return res.send(success);

  user.generateToken();
  user.save({ validateBeforeSave: false });

  return res.send(success);
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.fb.appId + '|' + config.fb.appSecret;
  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);
    if (response.data.data.error) {
      return res.status(401).send({ message: 'Facebook token incorrect' });
    }
    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({ message: 'Wrong user ID' });
    }

    let user = await User.findOne({ facebookId: req.body.id });

    if (!user) {
      user = new User({
        username: req.body.email,
        password: nanoid(),
        email: req.body.email,
        facebookId: req.body.id,
        displayName: req.body.name,
        avatarImage: req.body.picture.data.url
      });
    }


    user.generateToken();
    await user.save({ validateBeforeSave: false });
    res.send(user);
  } catch (e) {
    res.status(401).send({ message: 'Facebook token incorrect' });
  }
});

module.exports = router;