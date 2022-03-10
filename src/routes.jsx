import React from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/profile" component={ Profile } />
    <Route path="/foods/:id" component={ FoodDetails } />
    <Route path="/drinks/:id" component={ DrinkDetails } />
  </Switch>
);

export default Routes;
