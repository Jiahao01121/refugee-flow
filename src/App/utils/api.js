const axios = require('axios');

module.exports = {
  fetchData: function () {
    // let encodedURI = window.encodeURI('http://' + window.location.hostname + ':2700' + '/data/war_all');
    const url = 'http://' + window.location.hostname + ':2700' + '/data/war_all';


    // console.console.log(encodedURI);

    return axios.get(url)
      .then(d => {
        console.log(d)
      });
  }
}
