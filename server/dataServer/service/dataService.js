//mongoose interface
const mongoose = require('mongoose');
const fs = require('fs');

const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json') );
const asy_all_data = JSON.parse( fs.readFileSync('./data/asy_application_all.json') );

mongoose.connect('mongodb://will:will@ds145118.mlab.com:45118/refugee-flow');
const db = mongoose.connection;
db.on('error', console.log.bind(console,'connectinon eerroor') );

const war_note_model = mongoose.model(
  'war_all_note',
  mongoose.Schema({
    'id': Number,
    'notes' : String,
    'source': String,
  })
)

const asy_application_model = mongoose.model(
  'asy_application_all',
  mongoose.Schema({
    'year' : String,
    'value' : mongoose.Schema.Types.Mixed
  })
)

const find_war_note = function(query){
  return new Promise((resolve, reject) => {

    war_note_model.find({'id': query}, function(err,data){
      if(err) {
        console.err(err);
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}

const find_war_all = function (){
  return new Promise((resolve, reject) => {
    resolve(war_all_data);
  })
}

const find_asy_application_all = function(){

  return new Promise((resolve, reject) => {
      resolve([asy_all_data]);
    /**************
    *
    * fetching data from MongoDB hosted on mlab
    *
    ****************/
    // asy_application_model.find({}, function(err,data){
    //
    //   if(err) {
    //     console.log(err);
    //     reject(err);
    //   } else {
    //     console.log(data);
    //     resolve(data)
    //   }
    // })
  })
}

module.exports = {
  find_war_note,
  find_war_all,
  find_asy_application_all,
}
