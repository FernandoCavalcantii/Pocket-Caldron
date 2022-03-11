import React from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/profile" component={ Profile } />
    {/* <Route exact path="/foods:id" component={ Foods } />
    <Route exact path="/drinks:id" component={ Drinks } /> */}
    <Route exact path="/done-recipes" component={ DoneRecipes } />
  </Switch>
);

export default Routes;
