const crypto = require('crypto');
const { STRING, TEXT, BOOLEAN } = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  //PERSONAL INFO
  firstName: {
    type: STRING,
    allowNull: true, // Unsure if we can allow null
  },
  lastName: {
    type: STRING,
    allowNull: true, // Unsure if we can allow null
  },
  email: {
    type: STRING,
    isEmail: true,
    allowNull: false,
  },
  //SECURITY
  salt: {
    type: STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    },
  },
  password: {
    type: STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    },
  },
  terms: {
    type: BOOLEAN,
    allowNull: false,
  },
  picture: {
    type: TEXT,
    defaultValue:
      'https://www.bonniercorp.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
