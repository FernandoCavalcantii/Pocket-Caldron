import React from 'react';
import PropTypes from 'prop-types';

import { Link, useLocation } from 'react-router-dom';
import style from './style.module.scss';

function RecipeCard(props) {
  const { name, thumb, testIdIndex, recipeId, locale } = props;
  const location = useLocation();
  return (
    <Link to={ locale ? `/foods/${recipeId}` : `${location.pathname}/${recipeId}` }>
      <div
        className={ style.recipeCard }
        data-testid={ `${testIdIndex}-recipe-card` }
      >
        <img
          src={ thumb }
          alt={ name }
          data-testid={ `${testIdIndex}-card-img` }
        />
        <span
          data-testid={ `${testIdIndex}-card-name` }
        >
          {name}
        </span>
      </div>
    </Link>

  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  testIdIndex: PropTypes.number,
}.isRequired;

export default RecipeCard;
