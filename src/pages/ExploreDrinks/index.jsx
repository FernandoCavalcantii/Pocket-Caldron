import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRandomRecipe } from '../../services/api';

const ExploreDrinks = () => {
  const history = useHistory();
  const [surprise, setSurprise] = useState('');

  const surpriseMe = async () => {
    const recipe = await getRandomRecipe('thecocktaildb');
    setSurprise(recipe.drinks[0]);
  };

  useEffect(() => {
    surpriseMe();
  }, []);

  return (
    <div>
      <Header pageName="Explore Foods" />
      <div className="container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/drinks/${surprise.idDrink}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
