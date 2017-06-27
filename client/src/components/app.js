import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import RequireAuth from './require_authentication';
import Welcome from './welcome'

export default class App extends Component {
  render() {
    return (
        <div>
          <Header />
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={RequireAuth(Signout)} />
            <Route path="/signup" component={Signup} />
            <Route path="/feature" component={RequireAuth(Feature)} />
            <Route path="/" component={Welcome}/>
          </Switch>
        </div>
    );
  }
}
