import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getDrinkById, getFoodsRecipes } from '../../services/api';

import shareIcon from '../../images/shareIcon.svg';
import whiteIcon from '../../images/whiteHeartIcon.svg';
import blackIcon from '../../images/blackHeartIcon.svg';

import getIngredientsAndMeasures, {
  isRecipeCompleted, isInProgressRecipe, isRecipeFavorited,
  toggleFavoriteRecipe } from '../../helpers';

import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const Details = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [IngredientsdAndMeasures, setIngredientsAndMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isCompleted, setIsCompleted] = useState([false]);
  const [isInProgress, setIsInProgress] = useState([false]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
    setIsFavorited(isRecipeFavorited(pathname.split('/')[2]));
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
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                navigator.clipboard.writeText(
                  'http://localhost:3000/drinks/'.concat(drink.idDrink),
                );
                setShowLinkCopied(true);
                setTimeout(() => {
                  setShowLinkCopied(false);
                }, [Number('1000')]);
              } }
            >
              {showLinkCopied && (
                <p
                  style={ { position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    margin: 'auto' } }
                >
                  Link copied!
                </p>
              )}
              <img src={ shareIcon } alt="share" />
            </button>
            <button
              type="button"
              onClick={ () => {
                console.log(drink.alcoholicOrNot);
                toggleFavoriteRecipe(isFavorited, {
                  id: drink.idDrink,
                  type: 'drink',
                  nationality: '',
                  category: drink.strCategory,
                  alcoholicOrNot: drink.strAlcoholic,
                  name: drink.strDrink,
                  image: drink.strDrinkThumb,
                });
                setIsFavorited(!isFavorited);
              } }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorited ? blackIcon : whiteIcon }
                alt="favorite"
              />
            </button>
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
              onClick={ () => history
                .push('/drinks/'.concat(drink.idDrink, '/in-progress')) }

            >
              {isInProgress ? 'Continue Recipe' : 'Start recipe'}
            </button>
          )}
        </main>
        <Footer />
      </section>
    ))
  );
};

export default Details;
