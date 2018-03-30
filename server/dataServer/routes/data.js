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


const data_2010 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2010.json','utf8')
)
const data_2011 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2011.json','utf8')
)
const data_2012 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2012.json','utf8')
)
const data_2013 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2013.json','utf8')
)
const data_2014 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2014.json','utf8')
)
const data_2015 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2015.json','utf8')
)
const data_2016 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2016.json','utf8')
)
const data_2017 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2017.json','utf8')
)
const data_2018 = JSON.parse(
  fs.readFileSync(__dirname + '/data/global_2018.json','utf8')
)

router.get('/2010', function(req, res, next) {

  res.json(data_2010)
});

router.get('/2011', function(req, res, next) {

  res.json(data_2011)
});
router.get('/2012', function(req, res, next) {

  res.json(data_2012)
});
router.get('/2013', function(req, res, next) {

  res.json(data_2013)
});
router.get('/2014', function(req, res, next) {

  res.json(data_2014)
});
router.get('/2015', function(req, res, next) {

  res.json(data_2015)
});
router.get('/2016', function(req, res, next) {

  res.json(data_2016)
});
router.get('/2017', function(req, res, next) {

  res.json(data_2017)
});
router.get('/2018', function(req, res, next) {

  res.json(data_2018)
});

module.exports = router;
