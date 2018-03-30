const express = require('express');
const router = express.Router();
// const problemService = require("../service/dataserver")
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

const fs = require('fs')
//get problems
// router.get('/problems',function(req, res){
//   problemService.getProblems()
//     .then(problems => {
//       res.json(problems)
//     });
// })

//get problem
// router.get('/problem/:id',(req, res) => {
//   const id = req.params.id;
//   problemService.getProblem(+id)
//     .then( problem => res.json(problem))
// })

// //post problem
// router.post('/problems',jsonParser, (req, res) => {
//   console.log("stuff adding to data base")
//   problemService.addProblem(req.body)
//     .then(problem => {
//       res.json(problem);
//     }, (error) => {
//       res.status(400).send('Problem name already exists!');
//     })
// })

const data = JSON.parse(
  fs.readFileSync('/Users/will_su/Documents/THESIS/dataAnalysis/ACLED-final/global_2015.json','utf8')
)

router.get('/2010', function(req, res, next) {

  res.json(data)
});


module.exports = router;
