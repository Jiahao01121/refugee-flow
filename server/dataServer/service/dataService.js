//mongoose 操作interface
const WarModel = require('../model/warmodel');
const NoteModel = require('../model/notemodel');
const globalWarModel = require('../model/global_warmodel');

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

module.exports = {
  findWar,
  fetch_global,
}
