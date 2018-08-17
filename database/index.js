const Art = require('./models/art');
const User = require('./models/user');
const db = require('./database');

// One to Many Association
Art.belongsToMany(User, { as: 'likedBy', through: 'likes' });
User.belongsToMany(Art, { through: 'likes' });

Art.belongsTo(User, { as: 'artist' });
User.hasMany(Art);

module.exports = {
  db,
  Art,
  User,
};
