import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    {/* <Route exact path="/foods:id" component={ Foods } />
    <Route exact path="/drinks:id" component={ Drinks } /> */}
  </Switch>
);

export default Routes;
