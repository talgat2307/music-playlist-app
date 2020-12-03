const router = require('express').Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
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

router.post('/', [auth, permit('admin', 'user')], async (req, res) => {
  const track = new Track(req.body);

  try {
    await track.save();
    res.send(track);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    await Track.findByIdAndDelete(req.params.id);
    res.send({message: 'Success'});
  } catch (e) {
    res.status(403).send(e);
  }
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    await Track.updateOne({ _id: req.params.id },
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