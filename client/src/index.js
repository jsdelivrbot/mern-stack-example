import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import App from './components/app';
import reducers from './reducers'
import { AUTH_USER } from './actions/types';

const history = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history))(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in;
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
