const express = require('express');
const router = express.Router();
const DataService = require("../service/dataService");

// var year = [2010,2011,2012,2013,2014,2015,2016,2017,2018];
//   [
//     [ 'Cameroon', 'Middle Africa' ],
//     [ 'Angola', 'Middle Africa' ],
//     [ 'Bangladesh', 'Southern Asia' ],
//     [ 'Ghana', 'Western Africa' ],
//     [ 'Libya', 'Northern Africa' ],
//     [ 'Mali', 'Western Africa' ],
//     [ 'Sudan', 'Northern Africa' ],
//     [ 'Uganda', 'Eastern Africa' ],
//     [ 'Egypt', 'Northern Africa' ],
//     [ 'Iran', 'Middle East' ],
//     [ 'Israel', 'Middle East' ],
//     [ 'Palestine', 'Middle East' ],
//     [ 'Yemen', 'Middle East' ],
//     [ 'Afghanistan', 'Southern Asia' ],
//     [ 'Turkey', 'Middle East' ],
//     [ 'Iraq', 'Middle East' ],
//     [ 'Syria', 'Middle East' ],
//     [ 'Central African Republic', 'Middle Africa' ],
//     [ 'Kenya', 'Eastern Africa' ],
//     [ 'Nigeria', 'Western Africa' ],
//     [ 'Rwanda', 'Eastern Africa' ],
//     [ 'Somalia', 'Eastern Africa' ],
//     [ 'Pakistan', 'Southern Asia' ],
//     [ 'Democratic Republic of Congo', 'Middle Africa' ],
//     [ 'Benin', 'Western Africa' ],
//     [ 'Nepal', 'Southern Asia' ],
//     [ 'Indonesia', 'South-Eastern Asia' ],
//     [ 'Ethiopia', 'Eastern Africa' ],
//     [ 'Zimbabwe', 'Southern Africa' ],
//     [ 'South Sudan', 'Eastern Africa' ],
//     [ 'Iraq ', 'Middle East' ],
//     [ 'Chad', 'Middle Africa' ],
//     [ 'Bahrain', 'Middle East' ],
//     [ 'Sri Lanka', 'Southern Asia' ],
//     [ 'Mozambique', 'Eastern Africa' ],
//     [ 'South Africa', 'Southern Africa' ],
//     [ 'Saudi Arabia', 'Middle East' ],
//     [ 'Algeria', 'Northern Africa' ],
//     [ 'Mauritania', 'Western Africa' ],
//     [ 'Tunisia', 'Northern Africa' ],
//     [ 'Guinea', 'Western Africa' ],
//     [ 'Liberia', 'Western Africa' ],
//     [ 'Madagascar', 'Eastern Africa' ],
//     [ 'Senegal', 'Western Africa' ],
//     [ 'Tanzania', 'Eastern Africa' ],
//     [ 'Zambia', 'Southern Africa' ],
//     [ 'Lebanon', 'Middle East' ],
//     [ 'Morocco', 'Northern Africa' ],
//     [ 'Guinea-Bissau', 'Western Africa' ],
//     [ 'Jordan', 'Middle East' ],
//     [ 'Burundi', 'Eastern Africa' ],
//     [ 'Ivory Coast', 'Western Africa' ],
//     [ 'Burkina Faso', 'Western Africa' ],
//     [ 'Niger', 'Western Africa' ],
//     [ 'Equatorial Guinea', 'Middle Africa' ],
//     [ 'Gambia', 'Western Africa' ],
//     [ 'Gabon', 'Middle Africa' ],
//     [ 'Togo', 'Western Africa' ],
//     [ 'Namibia', 'Southern Africa' ],
//     [ 'Malawi', 'Eastern Africa' ],
//     [ 'Swaziland', 'Southern Africa' ],
//     [ 'Oman', 'Middle East' ],
//     [ 'Vietnam', 'South-Eastern Asia' ],
//     [ 'Cambodia', 'South-Eastern Asia' ],
//     [ 'Kuwait', 'Middle East' ],
//     [ 'Republic of Congo', 'Middle Africa' ],
//     [ 'Sierra Leone', 'Western Africa' ],
//     [ 'Eritrea', 'Eastern Africa' ],
//     [ 'Djibouti', 'Eastern Africa' ],
//     [ 'Lesotho', 'Southern Africa' ],
//     [ 'Laos', 'South-Eastern Asia' ],
//     [ 'United Arab Emirates', 'Middle East' ],
//     [ 'Qatar', 'Middle East' ],
//     [ 'Botswana', 'Southern Africa' ],
//     [ 'Pakistan ', 'Southern Asia' ]
//   ].forEach(d =>{
//   // each country
//   router.get('/'+d[1].toLowerCase().replace(/ /g,'')+"/"+d[0].toLowerCase().replace(/ /g,''), (req,res,next) =>{
//
//         console.log(d[1].toLowerCase().replace(/ /g,'')+"/"+d[0].toLowerCase().replace(/ /g,''));
//
//         DataService.findWar({country:d}).then( _d=>{
//           // console.timeEnd('D '+ d);
//           console.log("fetched");
//           console.log(_d.length);
//           res.json(_d);
//         });
//
//   })
// })
router.get('/note/:id',function(req,res){
  DataService.find_war_note( +req.params.id ).then(d => res.json(d) );
})
router.get('/war_all',(req,res,next) =>{
  DataService.find_war_all().then(d => res.json(d) );
})

router.get('/asy_application_all',(req,res,next) =>{
  DataService.find_asy_application_all().then(d => res.json(d) );
})

// abendoned
// router.get('/all', function(req, res, next) {
//
//   console.log("get all called");
//
//   DataService.findWar({}).then(d =>{
//
//
//     // operation take around 24000 ms
//
//     console.time('post-process');
//     const data = _.groupBy(d,'year'); // operation take 115 ms
//     var output = [];
//
//     for (let key in data) {
//       let arr = data[key];
//       let temp = [];
//       let max = d3.max(arr,(_d) => _d.fatalities);
//       let min = d3.min(arr,(_d) => _d.fatalities);
//       let map = d3.scaleLinear().domain([min,max]).range([0,1]);
//
//       arr.forEach((_d,_i)=>{
//         temp.push(
//           _d.latitude,
//           _d.longitude,
//           map(_d.fatalities),
//           {
//             'event_type': _d.event_type,
//             'interaction': _d.interaction,
//             'id': _d.id
//           }
//         )
//       });
//
//       output.push([key, temp])
//
//     }
//
//     console.timeEnd('post-process');
//     res.json(output);
//   })
//
// });

//global_war => taliored data for visualization -- global
// router.get('/global_war', function(req, res, next) {
//   console.log("get global_war called");
//   console.time('global_war');
//   DataService.fetch_global({}).then(d =>{
//     console.timeEnd('global_war');
//     res.json(d);
//   })
//
// });



module.exports = router;
