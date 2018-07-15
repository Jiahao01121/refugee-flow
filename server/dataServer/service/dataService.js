//mongoose interface
const mongoose = require('mongoose');
const production = 'production';
const dev = 'will';
mongoose.connect('mongodb://' + production + ':'+ production +'@ds145118.mlab.com:45118/refugee-flow');
const fs = require('fs');
const lodash = require('lodash');
// const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json') );
const asyAllData = JSON.parse( fs.readFileSync('./data/asy_application_all.json') );

const route_death  = JSON.parse( fs.readFileSync('./data/route_death.json') );
const route_IBC_country_list  = JSON.parse( fs.readFileSync('./data/country_route_list.json') );
const route_IBC = JSON.parse( fs.readFileSync('./data/IBC_all.json') );


//Truncate function
function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

//Parse JSON
const warAllData = JSON.parse( fs.readFileSync('./data/war_all.json'), function(key, value){
	if (key == "lat" || key == "lng") {
		return toFixed(value, 2);
  }else {
  	return value;
  }
});

const reducedWarData = warAllData.map(year => {
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

const db = mongoose.connection;
db.on('error', console.log.bind(console,'connectinon error') );

const warNoteModel = mongoose.model(
  'war_all_note',
  mongoose.Schema({
    'id': Number,
    'notes' : String,
    'source': String,
  })
)

const asyApplicationModel = mongoose.model(
  'asy_application_all',
  mongoose.Schema({
    'year' : String,
    'value' : mongoose.Schema.Types.Mixed
  })
)

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
    resolve(warAllData);
  })
}

const findReducedWar = function (){
  return new Promise((resolve, reject) => {
    resolve(reducedWarData);
  })
}

const findAsyApplicationAll = function(){

  return new Promise((resolve, reject) => {
      resolve([asyAllData]);
    /**************
    *
    * fetching data from MongoDB hosted on mlab
    *
    ****************/
    // asy_application_model.find({}, function(err,data){
    //
    //   if(err) {
    //     console.log(err);
    //     reject(err);
    //   } else {
    //     console.log(data);
    //     resolve(data)
    //   }
    // })
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

module.exports = {
  findWarNote,
  findWarAll,
  findAsyApplicationAll,
  findReducedWar,
  find_route_death,
  find_route_IBC_country_list,
  find_route_IBC
}
