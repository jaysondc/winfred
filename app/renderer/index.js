// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import configureStore from './store';

// ipc
import ipc from './ipc';
import { IPC_RELOAD_WEB_CONTENT } from '../const/ipc';

// containers
import DevTools from './containers/DevTools';
import AppContainer from './containers/AppContainer';

// actions
import { resetQuery, resetResults } from './actions';

// Create a redux store
const store = configureStore();

// Retrieve the root element
const rootElement = document.getElementById('app');

// load the dev tools if necessary
let devTools = '';
if (process.env.NODE_ENV === 'development') {
  devTools = <DevTools />;
}

// Render the App
ReactDOM.render(
  <Provider store={store}>
    <div>
      <AppContainer />
      {devTools}
    </div>
  </Provider>,
  rootElement
);

// start registering listeners
ipc.on(IPC_RELOAD_WEB_CONTENT, () => {
  store.dispatch(resetQuery());
  store.dispatch(resetResults());
});
