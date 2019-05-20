const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

const dataLoader = (filePath, cb = null) => JSON.parse(fs.readFileSync(path.join(__dirname, '../datasets', filePath)), cb);

const reduceGeoPercision = (num, fixed) => {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

const warReducer =(warDataAll) => warDataAll.map(year => {
  const yearlyQuarters = Object.values(year.value).map(q => {
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
});

module.exports = {
  dataLoader,
  reduceGeoPercision,
  warReducer
}
