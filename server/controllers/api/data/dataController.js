const { warNoteModel, asyApplicationModel } = require('../../../database/Models');
const { reduceGeoPercision, warReducer, dataLoader } = require('./helpers/dataProcessors.js');

const findWarNote = function(query) {
  return new Promise((resolve, reject) => {
    warNoteModel.find({'id': query}, (err,data) => resolve(data));
  })
}

const warDataAll = dataLoader('war_all.json', (key, value) => key == "lat" || key == "lng" ? reduceGeoPercision(value, 2) : value);
const findWarAll = function () {
  return new Promise((resolve, reject) => {
    resolve(warDataAll);
  })
}
const findReducedWar = function () {
  return new Promise((resolve, reject) => {
    resolve(warReducer(warDataAll));
  })
}

const findAsyApplicationAll = function() {
  return new Promise((resolve, reject) => {
    resolve([dataLoader('asy_application_all.json')]);
  })
}

const find_route_death = function() {
  return new Promise((resolve, reject) => {
    resolve(dataLoader('route_death.json'));
  })
}

const find_route_IBC_country_list = function() {
  return new Promise((resolve, reject) => {
    resolve(dataLoader('country_route_list.json'));
  })
}

const find_route_IBC = function() {
  return new Promise((resolve, reject) => {
    resolve(dataLoader('IBC_all.json'));
  })
}

module.exports = {
  findWarNote,
  findWarAll,
  findAsyApplicationAll,
  findReducedWar,
  find_route_death,
  find_route_IBC_country_list,
  find_route_IBC
}
