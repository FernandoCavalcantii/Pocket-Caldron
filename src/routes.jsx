import React from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import FavoritesRecipes from './pages/FavoritesRecipes';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/foods/:id" component={ FoodDetails } />
    <Route exact path="/drinks/:id" component={ DrinkDetails } />
    <Route exact path="/foods:id" component={ Foods } />
    <Route exact path="/drinks:id" component={ Drinks } />
    <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
    <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
    <Route exact path="/explore" component={ Explore } />
    <Route exact path="/explore/foods" component={ ExploreFoods } />
    <Route exact path="/explore/drinks" component={ ExploreDrinks } />
    <Route
      exact
      path="/explore/foods/ingredients"
      component={ ExploreFoodsIngredients }
    />
    <Route
      exact
      path="/explore/drinks/ingredients"
      component={ ExploreDrinksIngredients }
    />
    <Route
      exact
      path="/explore/foods/nationalities"
      component={ ExploreFoodsNationalities }
    />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/done-recipes" component={ DoneRecipes } />
    <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
    <Route exact path="*" render={ () => <h1>Not Found</h1> } />
  </Switch>
);

export default Routes;
