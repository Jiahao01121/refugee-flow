let cachedRoutes = null;

export function getRoutes() {
  let url = 'http://' + window.location.hostname + ':2700' + '/data/note/1';
  const request = new Request( url,  {
    method: 'GET',
    cache: 'force-cache'
  });
  return new Promise((res) => {
    if(cachedRoutes === null) {
      cachedRoutes = fetch(request).then(res => res.json());
    }
    return res(cachedRoutes);
  })

}
