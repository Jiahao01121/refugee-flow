const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  id: Number,
  year: Number,
  event_type: Number,
  interaction: Number,
  country: Array,
  latitude : Number,
  longitude : Number,
  fatalities : Number,
  timestamp : Number,
  source : String,
  notes : String,
})

const Model = mongoose.model('War',Schema);

module.exports = Model;
