import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const DrinkCard = (props) => {
  const { name, image, index, alcoholicOrNot, id } = props;
  const [copied, setCopied] = useState(false);
  const handleShareClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
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
    <>
      <div className={ style.favoriteRecipeCard }>
        <a href={ `http://localhost:3000/drinks/${id}` }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <a href={ `http://localhost:3000/drinks/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </a>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {alcoholicOrNot}
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
    </>
  );
};

DrinkCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  alcoholicOrNot: PropTypes.string,
}.isRequired;

export default DrinkCard;
