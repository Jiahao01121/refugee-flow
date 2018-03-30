//mongoose 操作interface
const ProblemModel = require('../models/problemModel')


const getProblems = function(){
  return new Promise( (resolve, reject) => {
      ProblemModel.find({}, function(err, data){
        if(err){
          reject(err);
        } else {
          resolve(data);
        }
      })
  });
}


const getProblem = function(idNum){
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({id: idNum}, function(err,data){
      if(err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}


const addProblem = function(newProblem){
  return new Promise((resolve, reject) =>{
    //check
    ProblemModel.findOne({ name: newProblem.name },function(err,data){
      if(data){
          reject("problem already exists")
      } else {
        //get lengh of database
        ProblemModel.count({},function(err,count){
          newProblem.id = count + 1;
          //这一步是为了创建mongodb的OBJ ID
          const mongoProblem = new ProblemModel(newProblem);
          mongoProblem.save();
          resolve(mongoProblem)
        })
      }//if else

    })
  })

}
module.exports = {
  getProblems,
  getProblem,
  addProblem
}
