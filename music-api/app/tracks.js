const router = require('express').Router();
const Track = require('../model/Track');

router.get('/', async (req, res) => {
  let query;
  if (req.query.album) {
    query = { album: req.query.album };
  }

  try {
    const track = await Track.find(query).sort({number: 'asc'}).populate('album');
    res.send(track);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Track.findById(req.params.id).populate('album');
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', async (req, res) => {
  const track = new Track(req.body);

  try {
    await track.save();
    res.send(track);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;