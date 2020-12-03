const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const Album = require('../model/Album');

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
  let query;
  if (req.query.artist) query = { artist: req.query.artist };
  try {
    const album = await Album.find(query).
      sort({ released_date: 'desc' }).
      populate('artist');
    res.send(album);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Album.findById(req.params.id).populate('artist');
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, permit('admin', 'user') ,upload.single('image')], async (req, res) => {
  const album = new Album(req.body);
  if (req.file) {
    album.image = req.file.filename;
  }

  try {
    await album.save();
    res.send(album);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.send({message: 'Success'});
  } catch (e) {
    res.status(403).send(e);
  }
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    await Album.updateOne({ _id: req.params.id },
      {
        $set: {
          published: true,
        },
      },
    );
    res.send({message: 'Success'})
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;