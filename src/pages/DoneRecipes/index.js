import React, { useEffect, useState } from 'react';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import style from './style.module.scss';
import Header from '../../components/Header';

const DoneRecipes = () => {
  const allFoods = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(
    () => {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }, [],
  );

  const handleClick = ({ target }) => {
    console.log(target.innerText);
    switch (target.innerText) {
    case 'All':
      setDoneRecipes(allFoods);
      break;
    case 'Food':
      setDoneRecipes(allFoods.filter((recipe) => recipe.type === 'food'));
      break;
    default:
      setDoneRecipes(allFoods.filter((recipe) => recipe.type === 'drink'));
    }
  };
  return (
    <>
      <Header pageName="Done Recipes" />
      <nav className={ style.buttons }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </nav>
      <section className={ style.doneRecipesContainer }>
        {doneRecipes?.map((recipe, index) => (
          <DoneRecipeCard
            key={ recipe.name }
            index={ index }
            id={ recipe.id }
            name={ recipe.name }
            type={ recipe.type }
            image={ recipe.image }
            nationality={ recipe.nationality }
            category={ recipe.category }
            doneDate={ recipe.doneDate }
            tags={ recipe.tags }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        ))}
      </section>
    </>
  );
};

export default DoneRecipes;
