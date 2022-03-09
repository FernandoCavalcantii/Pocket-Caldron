import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFoodsByName,
  getFoodsByIngredients, getFoodsByFirstLetter } from '../../services/api';
import setFoods from '../../Redux/actions/foodsActions';

export default function SearchInput() {
  const [radio, setRadio] = useState('');
  const [textInput, setTextInput] = useState('');
  const dispatch = useDispatch();
  const handleRadioChange = ({ target }) => {
    setRadio(target.parentNode.innerText);
  };
  const handleTextChange = ({ target }) => {
    setTextInput(target.value);
  };

  const handleClick = async () => {
    const foodsByName = await getFoodsByName(textInput);
    let foodsByLetter = '';
    if (textInput.length === 1) {
      foodsByLetter = await getFoodsByFirstLetter(textInput);
    }
    const foodsByIngredients = await getFoodsByIngredients(textInput);
    switch (radio) {
    case 'Ingredients':
      dispatch(setFoods(foodsByIngredients.meals));
      break;
    case 'Name':
      dispatch(setFoods(foodsByName.meals));
      break;
    default:
      if (textInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        dispatch(setFoods(foodsByLetter.meals));
      }
    }
  };
  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleTextChange }
        />
      </label>
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
