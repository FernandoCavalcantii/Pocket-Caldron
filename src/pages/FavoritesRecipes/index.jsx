import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';
import style from './style.module.scss';

const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

const FavoritesRecipes = () => {
  const [renderFavoriteRecipes, setRenderFavoriteRecipes] = useState([]);
  useEffect(() => {
    setRenderFavoriteRecipes(favoriteRecipes);
  }, []);

  const handleClick = ({ target }) => {
    switch (target.innerText) {
    case 'All':
      setRenderFavoriteRecipes(favoriteRecipes);
      break;
    case 'Food':
      setRenderFavoriteRecipes(favoriteRecipes
        .filter((recipe) => recipe.type === 'food'));
      break;
    default:
      setRenderFavoriteRecipes(favoriteRecipes
        .filter((recipe) => recipe.type === 'drink'));
    }
  };

  return (
    <>
      <Header pageName="Favorite Recipes" />
      <div className={ style.buttons }>
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
      </div>
      <section className={ style.favoriteRecipesContainer }>
        {renderFavoriteRecipes?.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.name }
            index={ index }
            id={ recipe.id }
            name={ recipe.name }
            type={ recipe.type }
            image={ recipe.image }
            nationality={ recipe.nationality }
            category={ recipe.category }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        ))}
      </section>
    </>
  );
};

export default FavoritesRecipes;
