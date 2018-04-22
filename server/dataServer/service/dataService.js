//mongoose interface
const mongoose = require('mongoose');
const fs = require('fs');

const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json') );

mongoose.connect('mongodb://will:will@ds145118.mlab.com:45118/refugee-flow');
const db = mongoose.connection;
db.on('error', console.log.bind(console,'connectinon eerroor') );

const Model = mongoose.model(
  'war_all_note',
  mongoose.Schema({
    'id': Number,
    'notes' : String,
    'source': String,
  })
)


const findNote = function(query){
  return new Promise((resolve, reject) => {

    Model.find({'id': query}, function(err,data){
      if(err) {
        console.err(err);
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}

// const fetch_global = function(query){
//   return new Promise((resolve, reject) => {
//
//     globalWarModel.find(query,function(err,data){
//       if(err) {
//         console.error(err);
//         reject(err);
//       } else {
//         resolve(data)
//       }
//
//     })
//
//   })
//
// }

const war_all = function (){
  return war_all_data;
}

module.exports = {
  // findWar,
  findNote,
  // fetch_global,
  war_all,
}
