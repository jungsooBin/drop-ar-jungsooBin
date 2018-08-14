const { db } = require('./index');
const Art = require('./models/art');
const User = require('./models/user');

const newArt = [];

const newUsers = [];

const seed = () =>
  
  Promise.all(newUsers.map(user => User.create(user))).then(() =>
    Promise.all(newArt.map(art => Art.create(art)))
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
