const express = require('express');
const router = express.Router();
const DataService = require("../service/dataService");

router.get('/note/:id',function(req,res){
  DataService.findWarNote( +req.params.id ).then(d => res.json(d) );
})
router.get('/war_all',(req,res,next) =>{
  DataService.findWarAll().then(d => res.json(d) );
})
router.get('/reduced_war_data',(req,res,next) =>{
  DataService.findReducedWar().then(d => res.json(d) );
})

router.get('/asy_application_all',(req,res,next) =>{
  DataService.findAsyApplicationAll().then(d => res.json(d) );
})

module.exports = router;
