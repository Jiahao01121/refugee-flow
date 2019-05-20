const mongoose = require('mongoose');

const warNoteModel = mongoose.model(
  'war_all_note',
  mongoose.Schema({
    'id': Number,
    'notes' : String,
    'source': String,
  })
)

const asyApplicationModel = mongoose.model(
  'asy_application_all',
  mongoose.Schema({
    'year' : String,
    'value' : mongoose.Schema.Types.Mixed
  })
)


module.exports = {
  warNoteModel,
  asyApplicationModel
}
