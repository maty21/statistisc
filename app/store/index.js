import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from 'reducers/root.reducer';
// import { graphMiddleware } from 'middlewares/graph';
// import { tabsMiddleware } from 'middlewares/tabs';
// import Immutable from 'seamless-immutable';

/* eslint-disable */
const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */
const middleware = [];
if ($_ENVIRONMENT === 'development') {
  middleware.unshift(createLogger({ collapsed: true }));
}
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);
export const store = createStore(rootReducer, enhancer);
if ($_ENVIRONMENT === 'development') {
  window.store = store;
}
export default store;



// WEBPACK FOOTER //
// ./store/index.js


// WEBPACK FOOTER //
// ./store/index.js


// WEBPACK FOOTER //
// ./store/index.js


// WEBPACK FOOTER //
// ./store/index.js