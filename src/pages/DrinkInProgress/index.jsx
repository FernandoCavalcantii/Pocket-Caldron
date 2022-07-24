import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getDrinkById } from '../../services/api';
import getIngredientsAndMeasures, { toggleFavoriteRecipe,
  isRecipeFavorited } from '../../helpers';
import shareIcon from '../../images/shareIcon.svg';
import whiteIcon from '../../images/whiteHeartIcon.svg';
import blackIcon from '../../images/blackHeartIcon.svg';

import style from './style.module.scss';

const DrinkInProgress = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [btnState, setBtnState] = useState(true);
  const [IngredientsdAndMeasures, setIngredientsAndMeasures] = useState([]);
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

  const setLocalStorage = () => {
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipe) {
      const storageProgress = JSON.stringify({
        cocktails: {},
        meals: {},
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    }
  };

  const setNewIngredient = (id) => {
    const { idDrink } = recipe[0];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const someIngredient = inProgressRecipe.cocktails[idDrink].some((e) => e === id);
    if (someIngredient) {
      const filter = inProgressRecipe.cocktails[idDrink].filter((e) => e !== id);
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        cocktails: { ...inProgressRecipe.cocktails,
          [idDrink]: filter },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    } else {
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        cocktails: { ...inProgressRecipe.cocktails,
          [idDrink]: [...inProgressRecipe.cocktails[idDrink], id] },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    }
  };

  const setNewRecipe = () => {
    const { idDrink } = recipe[0];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progressRecipeKeys = Object.keys(inProgressRecipe.cocktails);
    const hasIt = progressRecipeKeys.some((e) => e === idDrink);
    if (!hasIt) {
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        cocktails: { ...inProgressRecipe.cocktails, [idDrink]: [] },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    }
  };

  const setLine = ({ target }) => {
    const { id } = target;
    setNewIngredient(id);
    const idDrink = pathname.split('/')[2];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsLength = inProgressRecipe.cocktails[idDrink].length;
    if (ingredientsLength === IngredientsdAndMeasures.length) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };

  const isItDone = (id) => {
    const idDrink = pathname.split('/')[2];
    const converted = id.toString();
    setNewRecipe();
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const someI = inProgressRecipe.cocktails[idDrink].some((e) => e === converted);
    if (someI) {
      return true;
    }
    if (!someI) {
      return false;
    }
  };

  const handleClick = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb,
      strTags } = recipe[0];
    const structure = {
      id: idDrink,
      type: 'drink',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date(),
      tags: [strTags] || [],
    };
    if (!doneRecipes) {
      const storage = JSON.stringify([structure]);
      localStorage.setItem('doneRecipes', storage);
    }
    if (doneRecipes) {
      const storage = JSON.stringify([...doneRecipes, structure]);
      localStorage.setItem('doneRecipes', storage);
    }
    history.push('/done-recipes');
  };

  useEffect(() => {
    setLocalStorage();
    const idDrink = pathname.split('/')[2];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsLength = inProgressRecipe.cocktails[idDrink]
      ? inProgressRecipe.cocktails[idDrink].length : 0;
    if (ingredientsLength !== 0 && ingredientsLength === IngredientsdAndMeasures.length) {
      setBtnState(false);
    }
  }, [IngredientsdAndMeasures, pathname]);

  useEffect(() => {
    getDrink();
    setIsFavorited(isRecipeFavorited(pathname.split('/')[2]));
  }, [getDrink, pathname]);

  return (
    recipe?.map((drink) => (
      <section className={ style.container } key={ drink.idDrink }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrinkThumb }
          data-testid="recipe-photo"
        />
        <div className={ style.recipeHeader }>
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
                <p>Link copied!</p>
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
                data-testid={ String(index).concat('-ingredient-step') }
              >
                <label htmlFor={ index }>
                  {value.ingredient}
                  {value.measure && (
                    <>
                      -
                      {value.measure}
                    </>
                  )}
                  <input
                    defaultChecked={ isItDone(index) }
                    onClick={ setLine }
                    id={ index }
                    type="checkbox"
                  />
                </label>
              </li>
            ))}
          </ul>
          <div>
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {drink.strInstructions}
            </p>
          </div>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ btnState }
            onClick={ handleClick }
          >
            Finish Recipe
          </button>
        </main>
      </section>
    ))
  );
};
export default DrinkInProgress;
