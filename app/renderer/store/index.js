import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const getDebugSessionKey = () => {
  if (typeof window !== 'undefined') {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
  }
  return null;
};

// compose a store enhancer with the DevTools
const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

export default function configureStore(initialState) {
  // create a redux store
  const store = createStore(rootReducer, initialState, enhancer);
  // enable webpack HMR
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
