const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const mongoose = require('mongoose');

const dataModals = require('../modals/dataModals');
const warNoteModel = dataModals.warNoteModel;
const asyApplicationModel = dataModals.asyApplicationModel;

const isProduction = false;
const dbPassword = isProduction ? 'production' : 'will';
mongoose.connect('mongodb://' + dbPassword + ':'+ dbPassword +'@ds145118.mlab.com:45118/refugee-flow');
const db = mongoose.connection;
db.on('error', console.log.bind(console,'connectinon error') );

// load data
const asylumApplicationData = JSON.parse( fs.readFileSync(path.join(__dirname,'../data/asy_application_all.json')) );
const route_death  = JSON.parse( fs.readFileSync(path.join(__dirname,'../data/route_death.json')) );
const route_IBC_country_list  = JSON.parse( fs.readFileSync(path.join(__dirname,'../data/country_route_list.json')) );
const route_IBC = JSON.parse( fs.readFileSync(path.join(__dirname,'../data/IBC_all.json')) );
const warDataAll = JSON.parse( fs.readFileSync(path.join(__dirname,'../data/war_all.json')), function(key, value){

	if (key == "lat" || key == "lng") return reduceGeoPercision(value, 2);
  else return value;
});
const warDataReduced = warDataAll.map(year => {

  let yearlyQuarters = Object.values(year.value);

  yearlyQuarters = yearlyQuarters.map(q => {
    const sortedQuarter = q.sort((a, b) => b.fat - a.fat);
    return lodash.uniqBy(sortedQuarter, (i) => i.lat && i.lng)
  })

  return {
    Year: year.Year,
    value: {
      q1: yearlyQuarters[0],
      q2: yearlyQuarters[1],
      q3: yearlyQuarters[2],
      q4: yearlyQuarters[3]
    }
  }
})


const findWarNote = function(query){
  return new Promise((resolve, reject) => {

    console.log("clientSide Clicked!");

    warNoteModel.find({'id': query}, function(err,data){

      if(err) {
        console.log("error happened on query war note.");
        console.log(err);
        reject(err);
      } else {
        console.log("data successfully retrived from database");
        console.log("____________");
        resolve(data)
      }
    })
  })
}

const findWarAll = function (){
  return new Promise((resolve, reject) => {
    resolve(warDataAll);
  })
}

const findReducedWar = function (){

  return new Promise((resolve, reject) => {
    resolve(warDataReduced);
  })
}

const findAsyApplicationAll = function(){

  return new Promise((resolve, reject) => {
    resolve([asylumApplicationData]);

  })
}

const find_route_death = function(){
  return new Promise((resolve, reject) => {
    resolve(route_death);
  })
}

const find_route_IBC_country_list = function(){
  return new Promise((resolve, reject) => {
    resolve(route_IBC_country_list);
  })
}

const find_route_IBC = function(){
  return new Promise((resolve, reject) => {
    resolve(route_IBC);
  })
}

function reduceGeoPercision(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
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
