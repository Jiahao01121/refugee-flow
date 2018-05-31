//mongoose interface
const mongoose = require('mongoose');
const fs = require('fs');
const lodash = require('lodash');

// const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json') );
const asy_all_data = JSON.parse( fs.readFileSync('./data/asy_application_all.json') );

//Truncate function
function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

//Parse JSON
const war_all_data = JSON.parse( fs.readFileSync('./data/war_all.json'), function(key, value){
	if (key == "lat" || key == "lng") {
		return toFixed(value, 2);
  }else {
  	return value;
  }
});

const reducedWarData = war_all_data.map(year => {
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

mongoose.connect('mongodb://will:will@ds145118.mlab.com:45118/refugee-flow');
const db = mongoose.connection;
db.on('error', console.log.bind(console,'connectinon error') );

const war_note_model = mongoose.model(
  'war_all_note',
  mongoose.Schema({
    'id': Number,
    'notes' : String,
    'source': String,
  })
)

const asy_application_model = mongoose.model(
  'asy_application_all',
  mongoose.Schema({
    'year' : String,
    'value' : mongoose.Schema.Types.Mixed
  })
)

const find_war_note = function(query){
  return new Promise((resolve, reject) => {

    console.log("clientSide Clicked!");
    war_note_model.find({'id': query}, function(err,data){

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

const find_war_all = function (){
  return new Promise((resolve, reject) => {
    resolve(war_all_data);
  })
}

const find_asy_application_all = function(){

  return new Promise((resolve, reject) => {
      resolve([asy_all_data]);
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

module.exports = {
  find_war_note,
  find_war_all,
  find_asy_application_all,
}
