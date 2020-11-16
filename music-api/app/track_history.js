const router = require('express').Router();
const TrackHistory = require('../model/TrackHistory');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
  try {
    const track_history = await TrackHistory.find({user: req.user._id}).sort({datetime: 'desc'}).populate('track');
    res.send(track_history);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const trackHistory = new TrackHistory({
      ...req.body,
      user: req.user._id,
    });
    if (req.body.track) {
      await trackHistory.save();
      res.send(trackHistory);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;