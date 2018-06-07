import {
  refugeeRoute
} from './../refugeeRouteData'

let cachedRoutes = null;

export function getRoutes() {
  return new Promise((res) => {
    if(cachedRoutes === null) {
      cachedRoutes = refugeeRoute
      return setTimeout(() => res(cachedRoutes), 400)
    }
    return res(cachedRoutes)
  })
}
