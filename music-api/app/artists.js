const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Artist = require('../model/Artist');

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
    const artist = await Artist.find();
    res.send(artist);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Artist.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', upload.single("image"), async (req, res) => {
  const artist = new Artist(req.body);
  if (req.file) {
    artist.image = req.file.filename;
  }

  try {
    await artist.save();
    res.send(artist);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;