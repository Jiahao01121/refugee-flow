let cached_routeDeath = null;
let cached_routeCountryList = null;
let cached_routeIBC = null;
let cashed_routeCrossingCount = require('../data/IBC_crossingCountByCountry.json')

const baseUrl = `${window.location.protocol}//${window.location.host}`;
function get_routeDeath() {
  let url = `${baseUrl}/data/route_death`;
  const request = new Request( url,  {
    method: 'GET',
    cache: 'force-cache'
  });
  return new Promise((res) => {
    if(cached_routeDeath === null) {
      cached_routeDeath = fetch(request).then(res => res.json());
    }
    return res(cached_routeDeath);
  })

}

function get_routeCountryList() {
  let url = `${baseUrl}/data/route_IBC_country_list`;
  const request = new Request( url,  {
    method: 'GET',
    cache: 'force-cache'
  });
  return new Promise((res) => {
    if(cached_routeCountryList === null) {
      cached_routeCountryList = fetch(request).then(res => res.json());
    }
    return res(cached_routeCountryList);
  })

}

function get_routeIBC() {
  let url = `${baseUrl}/data/route_IBC`;
  const request = new Request( url,  {
    method: 'GET',
    cache: 'force-cache'
  });
  return new Promise((res) => {
    if(cached_routeIBC === null) {
      cached_routeIBC = fetch(request).then(res => res.json());
    }
    return res(cached_routeIBC);
  })

}

function get_routeCrossingCount(){
  return new Promise(res => res(cashed_routeCrossingCount) )
}
export {
  get_routeDeath,
  get_routeCountryList,
  get_routeIBC,
  get_routeCrossingCount,
}
