export const fetchData = (url, setter, setLoader) => fetch(new Request(
  url,
  {
    method: 'GET',
    cache: 'force-cache',
  },
))
  .then(res => res.json())
  .then(data => setter(data))
  .finally(() => setLoader(false));
