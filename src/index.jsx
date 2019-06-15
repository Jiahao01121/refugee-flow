import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// import './styles/main.scss';
import './styles/fonts.css';
import './styles/reset.scss';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

import Router from './components/router/Router';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);
