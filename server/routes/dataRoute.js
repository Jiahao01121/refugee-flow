const express = require('express');

const router = express.Router();
const {
  findWarNote,
  findReducedWar,
  findAsyApplicationAll,
  findRouteDeath,
  findRouteIbcCountryList,
  findRouteIbc,
} = require('../controllers/api/data/dataController');
const connection = require('../database/connection');

router.get('/note/:id', (req, res) => {
  connection.then(() => {
    findWarNote(+req.params.id).then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

router.get('/reduced_war_data', (req, res) => {
  connection.then(() => {
    findReducedWar().then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

router.get('/asy_application_all', (req, res) => {
  connection.then(() => {
    findAsyApplicationAll().then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

router.get('/route_death', (req, res) => {
  connection.then(() => {
    findRouteDeath().then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

router.get('/route_IBC_country_list', (req, res) => {
  connection.then(() => {
    findRouteIbcCountryList().then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

router.get('/route_IBC', (req, res) => {
  connection.then(() => {
    findRouteIbc().then(d => res.json(d));
  }).catch(err => res.json({ error: err }));
});

module.exports = router;
