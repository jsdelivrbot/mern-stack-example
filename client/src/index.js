import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk'

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import App from './components/app';
import reducers from './reducers'

let createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={createBrowserHistory()}>
      <App>
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
