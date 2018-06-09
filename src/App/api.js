let cached_routeDeath = null;
let cached_routeCountryList = null;
let cached_routeIBC = null;

// route_death
// route_IBC_country_list
// route_IBC

function get_routeDeath() {
  let url = 'http://' + window.location.hostname + ':2700' + '/data/route_death';
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
  let url = 'http://' + window.location.hostname + ':2700' + '/data/route_IBC_country_list';
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
  let url = 'http://' + window.location.hostname + ':2700' + '/data/route_IBC';
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

export {
  get_routeDeath,
  get_routeCountryList,
  get_routeIBC,
}
