const { warNoteModel } = require('../../../database/Models');
const { reduceGeoPercision, warReducer, dataLoader } = require('./helpers/dataProcessors.js');

const warDataAll = dataLoader(
  'war_all.json',
  (key, value) => (key === 'lat' || key === 'lng' ? reduceGeoPercision(value, 2) : value),
);

const findWarNote = query => new Promise(
  resolve => warNoteModel.find({ id: query }, (err, data) => resolve(data)),
);
const findReducedWar = () => new Promise(resolve => resolve(warReducer(warDataAll)));
const findAsyApplicationAll = () => new Promise(resolve => resolve([dataLoader('asy_application_all.json')]));

// route module data
const findRouteDeath = () => new Promise(resolve => resolve(dataLoader('route_death.json')));
const findRouteIbcCountryList = () => new Promise(resolve => resolve(dataLoader('country_route_list.json')));
const findRouteIbc = () => new Promise(resolve => resolve(dataLoader('IBC_all.json')));

module.exports = {
  findWarNote,
  findReducedWar,
  findAsyApplicationAll,
  findRouteDeath,
  findRouteIbcCountryList,
  findRouteIbc,
};
