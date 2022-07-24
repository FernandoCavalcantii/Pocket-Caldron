import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getFoodsByName,
  getFoodsByIngredients,
  getFoodsByFirstLetter,
  getDrinksByName,
  getDrinksByFirstLetter,
  getDrinksByIngredients,
} from '../../services/api';
import setFoods from '../../Redux/actions/foodsActions';
import setDrinks from '../../Redux/actions/drinksActions';

import style from './style.module.scss';

export default function SearchInput() {
  const ERROR = 'Sorry, we haven\'t found any recipes for these filters.';
  const { pathname } = useLocation();
  const [radio, setRadio] = useState('');
  const [textInput, setTextInput] = useState('');
  const dispatch = useDispatch();
  const handleRadioChange = ({ target }) => {
    setRadio(target.parentNode.innerText);
  };
  const handleTextChange = ({ target }) => {
    setTextInput(target.value);
  };

  const getByIngredients = async () => {
    if (pathname === '/foods') {
      const foodsI = await getFoodsByIngredients(textInput);
      if (foodsI.meals === null) {
        global.alert(ERROR);
      }
      dispatch(setFoods(foodsI.meals));
    }
    if (pathname === '/drinks') {
      try {
        const drinksI = await getDrinksByIngredients(textInput);
        dispatch(setDrinks(drinksI.drinks));
      } catch {
        global.alert(ERROR);
      }
    }
  };

  const getByName = async () => {
    if (pathname === '/foods') {
      const foodsI = await getFoodsByName(textInput);
      if (foodsI.meals === null) {
        global.alert(ERROR);
      }
      dispatch(setFoods(foodsI.meals));
    }
    if (pathname === '/drinks') {
      const drinksI = await getDrinksByName(textInput);
      if (drinksI.drinks === null) {
        global.alert(ERROR);
      }
      dispatch(setDrinks(drinksI.drinks));
    }
  };

  const getByFirstLetter = async () => {
    if (pathname === '/foods') {
      const foodsI = await getFoodsByFirstLetter(textInput);
      if (foodsI.meals === null) {
        global.alert(ERROR);
      }
      dispatch(setFoods(foodsI.meals));
    }
    if (pathname === '/drinks') {
      const drinksI = await getDrinksByFirstLetter(textInput);
      if (drinksI.drinks === null) {
        global.alert(ERROR);
      }
      dispatch(setDrinks(drinksI.drinks));
    }
  };

  const handleClick = async () => {
    if (radio === 'Ingredients') {
      getByIngredients();
    }
    if (radio === 'Name') {
      getByName();
    }
    if (radio === 'First Letter') {
      if (textInput.length === 1) {
        getByFirstLetter();
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  return (
    <form className={ style.searchContainer }>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleTextChange }
          placeholder="search"
        />
      </label>
      <fieldset>
        <label htmlFor="ingredient-search-radio">
          Ingredients
          <input
            name="header-radios"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            name="header-radios"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First Letter
          <input
            type="radio"
            name="header-radios"
            data-testid="first-letter-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
      </fieldset>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </form>
  );
}
