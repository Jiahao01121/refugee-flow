const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  // id: Number,
  // name: String,
  // desc: String,
  // difficulty: String
})

const Model = mongoose.model('ProblemModel',Schema)

module.exports = Model;
