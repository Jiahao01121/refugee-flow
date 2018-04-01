const express = require('express');
const router = express.Router();
const WarService = require("../service/dataService");
const _ = require('underscore');
const d3 = require('d3');
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// const nodeRestClient = require('node-rest-client').Client;
// const restClient = new nodeRestClient();

var year = [2010,2011,2012,2013,2014,2015,2016,2017,2018];

year.forEach((d) =>{
  router.get('/'+ d, function(req, res, next) {
    console.log('get '+ d);
    console.time('D '+ d);
      WarService.findWar({year:d}).then( _d=>{
        console.timeEnd('D '+ d);
        console.log("fetched");
        console.log(_d.length);
        res.json(_d);
      });
  });
})

router.get('/all', function(req, res, next) {

  console.log("get all called");

  WarService.findWar({}).then(d =>{

    // operation take around 24000 ms

    console.time('post-process');
    const data = _.groupBy(d,'year'); // operation take 115 ms
    var output = [];

    for (let key in data) {
      let arr = data[key];
      let temp = [];
      let max = d3.max(arr,(_d) => _d.fatalities);
      let min = d3.min(arr,(_d) => _d.fatalities);
      let map = d3.scaleLinear().domain([min,max]).range([0,1]);

      arr.forEach((_d,_i)=>{
        temp.push(
          _d.latitude,
          _d.longitude,
          map(_d.fatalities),
          {
            'event_type': _d.event_type,
            'interaction': _d.interaction,
            'id': _d.id
          }
        )
      });

      output.push([key, temp])

    }

    console.timeEnd('post-process');
    res.json(output);
  })

});

module.exports = router;
