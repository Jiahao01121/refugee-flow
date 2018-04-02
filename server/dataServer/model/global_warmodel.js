const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  'year': Number,
  'value': Array
})

const Model = mongoose.model('war-global',Schema);

module.exports = Model;
