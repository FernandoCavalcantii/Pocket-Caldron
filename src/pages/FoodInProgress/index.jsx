import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getFoodById } from '../../services/api';
import getIngredientsAndMeasures, { toggleFavoriteRecipe,
  isRecipeFavorited } from '../../helpers';
import shareIcon from '../../images/shareIcon.svg';
import whiteIcon from '../../images/whiteHeartIcon.svg';
import blackIcon from '../../images/blackHeartIcon.svg';

const FoodInProgress = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [btnState, setBtnState] = useState(true);
  const [IngredientsdAndMeasures, setIngredientsAndMeasures] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
    const { idMeal } = recipe[0];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const someIngredient = inProgressRecipe.meals[idMeal].some((e) => e === id);
    if (someIngredient) {
      const filterIngredients = inProgressRecipe.meals[idMeal].filter((e) => e !== id);
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        meals: { ...inProgressRecipe.meals,
          [idMeal]: filterIngredients },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    } else {
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        meals: { ...inProgressRecipe.meals,
          [idMeal]: [...inProgressRecipe.meals[idMeal], id] },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    }
  };

  const setNewRecipe = () => {
    const { idMeal } = recipe[0];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progressRecipeKeys = Object.keys(inProgressRecipe.meals);
    const hasIt = progressRecipeKeys.some((e) => e === idMeal);
    if (!hasIt) {
      const storageProgress = JSON.stringify({
        ...inProgressRecipe,
        meals: { ...inProgressRecipe.meals, [idMeal]: [] },
      });
      localStorage.setItem('inProgressRecipes', storageProgress);
    }
  };

  const setLine = ({ target }) => {
    const { id } = target;
    setNewIngredient(id);
    const idMeal = pathname.split('/')[2];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsLength = inProgressRecipe.meals[idMeal].length;
    if (ingredientsLength === IngredientsdAndMeasures.length) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };

  const isItDone = (id) => {
    const idMeal = pathname.split('/')[2];
    const converted = id.toString();
    setNewRecipe();
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const someIngredient = inProgressRecipe.meals[idMeal].some((e) => e === converted);
    if (someIngredient) {
      return true;
    }
    if (!someIngredient) {
      return false;
    }
  };

  const handleClick = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe[0];
    const structure = {
      id: idMeal,
      type: 'food',
      nationality: strArea || '',
      category: strCategory || '',
      name: strMeal,
      image: strMealThumb,
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
    const idMeal = pathname.split('/')[2];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsLength = inProgressRecipe.meals[idMeal]
      ? inProgressRecipe.meals[idMeal].length : 0;
    if (ingredientsLength !== 0 && ingredientsLength === IngredientsdAndMeasures.length) {
      setBtnState(false);
    }
  }, [IngredientsdAndMeasures, pathname]);

  useEffect(() => {
    getFood();
    setIsFavorited(isRecipeFavorited(pathname.split('/')[2]));
  }, [getFood, pathname]);

  return (
    recipe?.map((food) => (
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
            <button
              type="button"
              onClick={ () => {
                navigator.clipboard.writeText('http://localhost:3000/foods/'.concat(food.idMeal));
                setShowLinkCopied(true);
                setTimeout(() => {
                  setShowLinkCopied(false);
                }, [Number('1000')]);
              } }
            >
              <img src={ shareIcon } alt="share" data-testid="share-btn" />
            </button>
            {showLinkCopied && (
              <p> Link copied! </p>
            )}
            <button
              type="button"
              onClick={ () => {
                toggleFavoriteRecipe(isFavorited, {
                  id: food.idMeal,
                  type: 'food',
                  nationality: food.strArea,
                  category: food.strCategory,
                  alcoholicOrNot: '',
                  name: food.strMeal,
                  image: food.strMealThumb,
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
                  -
                  {value.measure}
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
              {food.strInstructions}
            </p>
          </div>
          <iframe
            data-testid="video"
            title={ food.strMeal }
            src={ food.strYoutube }
            frameBorder="0"
          />
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
export default FoodInProgress;
