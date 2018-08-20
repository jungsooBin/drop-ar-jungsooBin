'use strict';
const router = require('express').Router();
const { Art, User } = require('../../database');

router.get('/', async (req, res, next) => {
  try {
    const allArt = await Art.findAll({
      include: [
        { model: User, as: 'artist' },
        { model: User, as: 'likedBy', attributes: ['id'] },
      ],
    });
    res.json(allArt);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleArt = await Art.findById(req.params.id);
    res.json(singleArt);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const singleArt = await Art.update(req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
      
    )
    res.json(singleArt)
  } catch (error) {
    console.error(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const CreatedArt = await Art.create(req.body);
    res.json(CreatedArt);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/user/:id', async (req, res, next) => {
  try {
    const usersArt = await Art.findAll({
      where: {
        artistId: req.params.id,
      },
      include: [{ model: User, as: 'likedBy', attributes: ['id'] }],
    });
    res.json(usersArt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
