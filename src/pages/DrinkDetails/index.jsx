import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinkById, getFoodsRecipes } from '../../services/api';

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

  const getDrink = useCallback(
    async () => {
      const drink = await getDrinkById(pathname.split('/')[2]);
      setRecipe(drink.drinks);
      setIngredientsAndMeasures(
        getIngredientsAndMeasures(Object.entries(drink.drinks[0])),
      );
    },
    [pathname],
  );

  const getRecomendation = useCallback(async () => {
    const res = await getFoodsRecipes();
    setRecomendation(res.meals);
  }, []);

  useEffect(() => {
    getDrink();
    getRecomendation();
    setIsCompleted(isRecipeCompleted(pathname.split('/')[2]));
    setIsInProgress(isInProgressRecipe(pathname.split('/')[2], 'cocktails'));
  }, [getDrink, getRecomendation, pathname]);

  return (
    recipe?.map((drink) => (
      <section key={ drink.idDrink }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrinkThumb }
          data-testid="recipe-photo"
        />
        <div className="recipeHeader">
          <aside>
            <h1 data-testid="recipe-title">{drink.strDrink}</h1>
            <span data-testid="recipe-category">{drink.strAlcoholic}</span>
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
                data-testid={ String(index).concat('-ingredient-name-and-measure') }
              >
                {value.ingredient}
                {value.measure && (
                  <>
                    -
                    {value.measure}
                  </>
                )}
              </li>
            ))}
          </ul>
          <div>
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {drink.strInstructions}
            </p>
          </div>
          <Carousel recomendation={ recomendation } drinkOrMeal="Meal" />
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
