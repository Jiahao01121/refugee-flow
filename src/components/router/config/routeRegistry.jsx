import React from 'react';

import * as MobileDetect from 'mobile-detect';

import Navbar from '../../Navbar';
import DesktopLanding from '../../landing/DesktopLanding';
import MobileLanding from '../../landing/MobileLanding';
import Conflict from '../../Conflict';
import RefugeeRoute from '../../RefugeeRoute';
import About from '../../about/About';

const routeRegistry = [
  {
    isExclusive: false,
    component: Navbar,
    path: '/',
    children: ({ location }) => location.pathname !== '/landing' && <Navbar />,
  },
  {
    isExclusive: true,
    path: '/landing',
    exact: true,
    render: props => (
      new MobileDetect(window.navigator.userAgent).mobile() === null
        ? <DesktopLanding {...props} />
        : <MobileLanding {...props} />
    ),
  },
  {
    isExclusive: true,
    component: Conflict,
    path: '/conflict',
    exact: false,
  },
  {
    isExclusive: true,
    component: RefugeeRoute,
    path: '/route/:arg',
    exact: false,
  },
  {
    isExclusive: true,
    component: About,
    path: '/about',
    exact: true,
  },

];

export default routeRegistry;
