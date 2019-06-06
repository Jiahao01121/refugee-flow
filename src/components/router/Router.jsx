import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { compact } from 'lodash';

import routeRegistry from './config/routeRegistry';

const exclusiveRoutes = compact(routeRegistry.map(
  (route, index) => route.isExclusive && <Route {...route} key={index} />,
));

const inclusiveRoutes = compact(routeRegistry.map(
  (route, index) => !route.isExclusive && <Route {...route} key={index} />,
));

const Router = () => (
  <BrowserRouter>
    <>
      {inclusiveRoutes}
      <Switch>
        {exclusiveRoutes}
        <Redirect to="/landing" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Router;
