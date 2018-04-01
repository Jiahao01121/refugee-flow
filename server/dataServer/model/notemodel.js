const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  id: Number,
  source : String,
  notes : String,
})

const Model = mongoose.model('Note',Schema);

module.exports = Model;
