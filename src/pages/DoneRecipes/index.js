import React, { useEffect, useState } from 'react';
import doneRecipesMock from './doneRecipesMock';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import style from './style.module.css';
import Header from '../../components/Header';
// após páginas concluidas, apagar import mock linha 2

const DoneRecipes = () => {
  // const { doneRecipes } = JSON.parse(localStorage.getItem('doneRecipes')).doneRecipes;
  const [renderDoneRecipes, setRenderDoneRecipes] = useState([]);
  const getMock = () => {
    const mock = doneRecipesMock();
    setRenderDoneRecipes(mock);
  };
  useEffect(
    () => {
      getMock();
    }, [],
  );
  // doneRecipes correto, linha 8. Após as páginas anteriores estarem concluidas, apagar linha 10 até 18 e 22
  const handleClick = ({ target }) => {
    const mock = doneRecipesMock();
    switch (target.innerText) {
    case 'All':
      // Apagar linha 25, correta é a 26
      setRenderDoneRecipes(mock);
      // setRenderDoneRecipes(doneRecipes);
      break;
    case 'Food':
      // Apagar linha 30, correta é a 31
      setRenderDoneRecipes(mock.filter((recipe) => recipe.type === 'comida'));
      // setRenderDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'comida'));
      break;
    default:
      // Apagar linha 35, correta é a 36
      setRenderDoneRecipes(mock.filter((recipe) => recipe.type === 'bebida'));
      // setRenderDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  };
  return (
    <>
      <Header pageName="Done Recipes" />
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
        {renderDoneRecipes?.map((recipe, index) => (
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
