'use strict';
const router = require('express').Router();
const { Art } = require('../../database/');

router.post('/add', async (req, res, next) => {
  try {
    console.log('working?')
    const CreatedArt = await Art.create(req.body);
    res.json(CreatedArt)
  } catch (error) {
    console.log('error?')
    // console.log(error);
    res.sendStatus(404);
  }
});

router.get('/', async (req, res, next) => {
  try {
    console.log('REACHED');
    const allArt = await Art.findAll();
    res.json(allArt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
