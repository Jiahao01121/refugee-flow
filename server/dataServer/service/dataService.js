//mongoose 操作interface
const WarModel = require('../model/warmodel');
const NoteModel = require('../model/notemodel')


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

module.exports = {
  findWar,
}
