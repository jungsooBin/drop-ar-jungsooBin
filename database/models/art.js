const Sequelize = require('sequelize');
const db = require('../database');

const Art = db.define('art', {
  artPiece: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  likes: {
    type: Sequelize.INTEGER,
  },
  coverPhoto: {
    type: TEXT,
    defaultValue:
      'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png',
  },
});

module.exports = Art;
