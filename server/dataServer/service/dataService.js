//mongoose 操作interface

// const WarModel = require('../model/warmodel');
// const NoteModel = require('../model/notemodel');
// const globalWarModel = require('../model/global_warmodel');

const fs = require('fs');
const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json') );

const findWar = function(query){
  return new Promise((resolve, reject) => {

    WarModel.find(query, function(err,data){
      if(err) {
        console.err(err);
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}

const fetch_global = function(query){
  return new Promise((resolve, reject) => {

    globalWarModel.find(query,function(err,data){
      if(err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data)
      }

    })

  })

}

const war_all = function (){
  return war_all_data;
}

module.exports = {
  findWar,
  fetch_global,
  war_all,
}
