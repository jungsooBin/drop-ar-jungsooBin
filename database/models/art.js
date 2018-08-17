const {
  STRING,
  TEXT,
  BOOLEAN,
  JSONB,
  ARRAY,
  DECIMAL,
  INTEGER,
} = require('sequelize');
const db = require('../database');

const Art = db.define('art', {
  artPiece: {
    type: JSONB,
    allowNull: false,
  },
  location: {
    type: ARRAY(DECIMAL),
    allowNull: false,
  },
  description: {
    type: STRING,
  },
  title: {
    type: STRING,
  },
  coverPhoto: {
    type: TEXT,
    defaultValue:
      'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png',
  },
});

module.exports = Art;
