import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

function RecipeCard(props) {
  const { name, thumb, testIdIndex } = props;
  return (
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
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  testIdIndex: PropTypes.number,
}.isRequired;

export default RecipeCard;
