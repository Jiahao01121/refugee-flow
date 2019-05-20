const express = require('express');
const router = express.Router();
const {
  findWarNote,
  findWarAll,
  findReducedWar,
  findAsyApplicationAll,
  find_route_death,
  find_route_IBC_country_list,
  find_route_IBC,
} = require("../controllers/api/data/dataController");
const connection = require('../database/connection');

router.get('/note/:id',function(req,res){
  connection.then(() => {
    findWarNote( +req.params.id ).then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})
router.get('/war_all',(req,res,next) =>{
  connection.then(() => {
    findWarAll().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})
router.get('/reduced_war_data',(req,res,next) =>{
  connection.then(() => {
    findReducedWar().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})

router.get('/asy_application_all',(req,res,next) =>{
  connection.then(() => {
    findAsyApplicationAll().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})

router.get('/route_death',(req,res,next) =>{
  connection.then(() => {
    find_route_death().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})

router.get('/route_IBC_country_list',(req,res,next) =>{
  connection.then(() => {
    find_route_IBC_country_list().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})

router.get('/route_IBC',(req,res,next) =>{
  connection.then(() => {
    find_route_IBC().then(d => res.json(d) );
  }).catch(err => {
    res.json(null);
  });
})

module.exports = router;
