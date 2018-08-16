const router = require('express').Router();
const { User, Art } = require('../../database');

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const currentUser = await User.findById(req.body.userId);
    const currentArt = await Art.findById(req.body.artId);
    const dislikedArt = await currentArt.removeUser(currentUser, {
      through: 'likes',
    });
    res.status(201).json(dislikedArt);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const currentArt = await Art.findById(req.body.artId);
    const likedArt = await currentArt.addUser(currentUser, {
      through: 'likes',
    });
    res.status(201).json(likedArt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
