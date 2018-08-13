const router = require('express').Router()
const User = require('../db/models/user')


router.post('/', async (req, res, next) => {
  try{
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.password
      
    })
    res.send(201).send(newUser)
  } catch(err) {
     next(err)
  }
})

module.exports = router