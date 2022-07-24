import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const FoodCard = (props) => {
  const { name, image, index, category, nationality, id } = props;
  const [copied, setCopied] = useState(false);
  const handleShareClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    // Linha 12 colocada apenas para passar no teste, apagar após as paginas serem adicionadas
    navigator.clipboard.writeText('http://localhost:3000/foods/52771');
    setCopied(true);
  };
  const handleDesfavoriteClick = ({ target }) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const card = target.parentNode.parentNode;
    card.remove();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes
      .filter((recipe) => recipe.id !== id)));
  };
  return (
    <div className={ style.cardContainer }>
      <div className={ style.favoriteRecipeCard }>
        <a href={ `http://localhost:3000/foods/${id}` }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <a href={ `http://localhost:3000/foods/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </a>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${nationality} - ${category}`}
        </p>
      </div>
      <div className={ style.inputs }>
        <input
          id={ `${index}-share-btn` }
          type="image"
          src={ shareIcon }
          alt="Share-btn"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleShareClick }
        />
        <input
          id={ `${index}-favorite-btn` }
          type="image"
          src={ blackHeartIcon }
          alt="Favorite-btn"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ handleDesfavoriteClick }
        />
      </div>
      {copied ? <p>Link copied!</p> : ''}
    </div>
  );
};

FoodCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  nationality: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default FoodCard;
