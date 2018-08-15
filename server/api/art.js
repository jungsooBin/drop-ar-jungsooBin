'use strict';
const router = require('express').Router();
const { Art } = require('../../database/');

router.get('/', async (req, res, next) => {
  try {
    const allArt = await Art.findAll();
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

router.post('/add', async (req, res, next) => {
  try {
    console.log(req.body);
    const CreatedArt = await Art.create(req.body);
    res.json(CreatedArt);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
