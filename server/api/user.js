const router = require('express').Router();
const { User } = require('../../database');



router.get('/:email', async (req, res, next) => {
  try{
    console.log('REQBODY',req.params.email)
    const userExists = await User.findAll({where: {
      email: req.params.email
    }})
    res.status(200).send(userExists)
  } catch(err){
      next(err)
  }
})



router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// router.put('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     }
//   } catch (err) {
//     next(err)
//   }
// });


router.put('/login', async (req, res, next) => {
  // console.log('req.login',req.login)
  try {
    const currentUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (currentUser === null) {
      res.status(401).send("Wrong username");
    } else if (!currentUser.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    } else {
    res.json(currentUser);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
