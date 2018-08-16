const Art = require('./models/art');
const User = require('./models/user');
const db = require('./database');

// One to Many Association

Art.belongsTo(User);
User.hasMany(Art);

User.belongsToMany(Art, { through: 'likes' });
Art.belongsToMany(User, { through: 'likes' });

module.exports = {
  db,
  Art,
  User,
};
