const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${process.env.DB_LOGIN}:${process.env.DB_LOGIN}@ds145118.mlab.com:45118/refugee-flow`,
  { useNewUrlParser: true },
);
const db = mongoose.connection;

const connection = new Promise((resolve, reject) => {
  db.on('error', (err) => {
    console.log('err',err);
    reject(err);
  });

  db.once('open', () => {
    console.log('connected w/ db');
    resolve();
  });
});

module.exports = connection;
