const mongoose = require('mongoose');
const { database } = require('../../config.js');

mongoose.connect(database.connection, { useNewUrlParser: true });
const db = mongoose.connection;

const connection = new Promise((resolve, reject) => {
  db.on('error', (err) => {
    console.warn('err', err);
    reject(err);
  });

  db.once('open', () => {
    console.info('connected w/ db');
    resolve();
  });
});

module.exports = connection;
