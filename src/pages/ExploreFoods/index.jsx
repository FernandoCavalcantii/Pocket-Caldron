import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRandomRecipe } from '../../services/api';

const ExploreFoods = () => {
  const history = useHistory();
  const [surprise, setSurprise] = useState('');

  const surpriseMe = async () => {
    const recipe = await getRandomRecipe('themealdb');
    setSurprise(recipe.meals[0]);
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
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/foods/${surprise.idMeal}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
