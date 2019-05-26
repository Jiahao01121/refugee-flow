const fs = require('fs');
const path = require('path');
const { uniqBy, round } = require('lodash');

const dataLoader = (filePath, cb = null) => JSON.parse(fs.readFileSync(path.join(__dirname, '../datasets', filePath)), cb);

const reduceGeoPercision = (num, percision) => round(num, percision);


const warReducer = warDataAll => warDataAll.map((year) => {
  const yearlyQuarters = Object.values(year.value).map((quarter) => {
    const sortedQuarter = quarter.sort((a, b) => b.fat - a.fat);
    return uniqBy(sortedQuarter, i => i.lat && i.lng);
  });
  return {
    Year: year.Year,
    value: {
      q1: yearlyQuarters[0],
      q2: yearlyQuarters[1],
      q3: yearlyQuarters[2],
      q4: yearlyQuarters[3],
    },
  };
});

module.exports = {
  dataLoader,
  reduceGeoPercision,
  warReducer,
};
