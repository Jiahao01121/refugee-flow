import { createStore } from 'redux';
import reducer from './reducers/reducer';
/* eslint-disable no-underscore-dangle */
export default createStore(
  reducer,
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__)
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
