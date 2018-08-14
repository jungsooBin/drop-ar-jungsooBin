const router = require('express').Router()
const { User } = require('../../database')
const Sequelize = require('sequelize');


router.post('/signup', async (req, res, next) => {
  try{
    console.log(req.body)
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch(err) {
     next(err)
  }
})

module.exports = router