import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import shareIcon from '../../images/shareIcon.svg';

const DrinkCard = (props) => {
  const { name, image, index, doneDate, alcoholicOrNot, id } = props;
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied(true);
  };
  return (
    <div>
      <div className={ style.doneRecipeCard }>
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
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      </div>
      <input
        id={ `${index}-share-btn` }
        type="image"
        src={ shareIcon }
        alt="Share-btn"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleClick }
      />
      {copied ? <p>Link copied!</p> : ''}
    </div>
  );
};

DrinkCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  doneDate: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
}.isRequired;

export default DrinkCard;
