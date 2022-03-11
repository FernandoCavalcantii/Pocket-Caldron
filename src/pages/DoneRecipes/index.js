import React, { useEffect, useState } from 'react';
import doneRecipesMock from './doneRecipesMock';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import style from './style.module.css';
// após páginas concluidas, apagar import mock linha 2

const DoneRecipes = () => {
  // const { doneRecipes } = JSON.parse(localStorage.getItem('doneRecipes')).doneRecipes;
  const [doneRecipes, setDoneRecipes] = useState([]);
  const getMock = () => {
    const mock = doneRecipesMock();
    setDoneRecipes(mock);
  };
  useEffect(
    () => {
      getMock();
    }, [],
  );
  // doneRecipes correto, linha 8. Após as páginas anteriores estarem concluidas, apagar linha 10 até 18
  const handleClick = ({ target }) => {
    const mock = doneRecipesMock();
    switch (target.innerText) {
    case 'All':
      // Apagar linha 25, correta é a 26
      setDoneRecipes(mock);
      // setDoneRecipes(doneRecipes);
      break;
    case 'Food':
      // Apagar linha 30, correta é a 31
      setDoneRecipes(mock.filter((recipe) => recipe.type === 'comida'));
      // setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'comida'));
      break;
    default:
      // Apagar linha 35, correta é a 36
      setDoneRecipes(mock.filter((recipe) => recipe.type === 'bebida'));
      // setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  };
  return (
    <>
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
