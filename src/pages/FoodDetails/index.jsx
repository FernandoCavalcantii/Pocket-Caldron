import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getFoodById, getDrinksRecipes } from '../../services/api';

import shareIcon from '../../images/shareIcon.svg';
import whiteIcon from '../../images/whiteHeartIcon.svg';
import getIngredientsAndMeasures, {
  isRecipeCompleted, isInProgressRecipe } from '../../helpers';

import Carousel from '../../components/Carousel';

const Details = () => {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [IngredientsdAndMeasures, setIngredientsAndMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isCompleted, setIsCompleted] = useState([false]);
  const [isInProgress, setIsInProgress] = useState([false]);

  const getFood = useCallback(
    async () => {
      const food = await getFoodById(pathname.split('/')[2]);
      setRecipe(food.meals);
      setIngredientsAndMeasures(
        getIngredientsAndMeasures(Object.entries(food.meals[0])),
      );
    },
    [pathname],
  );

  const getRecomendation = useCallback(async () => {
    const res = await getDrinksRecipes();
    setRecomendation(res.drinks);
  }, []);

  useEffect(() => {
    getFood();
    getRecomendation();
    setIsCompleted(isRecipeCompleted(pathname.split('/')[2]));
    setIsInProgress(isInProgressRecipe(pathname.split('/')[2], 'meals'));
  }, [getFood, getRecomendation, pathname]);

  return (
    recipe.map((food) => (
      <section key={ food.idMeal }>
        <img
          src={ food.strMealThumb }
          alt={ food.strMealThumb }
          data-testid="recipe-photo"
        />
        <div className="recipeHeader">
          <aside>
            <h1 data-testid="recipe-title">{food.strMeal}</h1>
            <span data-testid="recipe-category">{food.strCategory}</span>
          </aside>
          <div>
            <img src={ shareIcon } alt="share" data-testid="share-btn" />
            <img src={ whiteIcon } alt="favorite" data-testid="favorite-btn" />
          </div>
        </div>
        <main>
          <h3>Ingredients</h3>
          <ul>
            {IngredientsdAndMeasures.map((value, index) => (
              <li
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {value.ingredient}
                -
                {value.measure}
              </li>
            ))}
          </ul>
          <div>
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {food.strInstructions}
            </p>
          </div>
          <iframe
            data-testid="video"
            title={ food.strMeal }
            src={ food.strYoutube }
            frameBorder="0"
          />
          <Carousel recomendation={ recomendation } drinkOrMeal="Drink" />
          {!isCompleted && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: 0 } }
            >
              {isInProgress ? 'Continue Recipe' : 'Start recipe'}
            </button>
          )}
        </main>
      </section>
    ))
  );
};

export default Details;
