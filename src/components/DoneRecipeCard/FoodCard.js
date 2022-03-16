import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import shareIcon from '../../images/shareIcon.svg';

const FoodCard = (props) => {
  const { name, image, index, category, doneDate, tags, nationality, id } = props;
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied(true);
  };
  return (
    <div>
      <div className={ style.doneRecipeCard }>
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
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        {tags.map((tag) => (
          <span
            key={ `${name} ${tag}` }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {`#${tag} `}
          </span>
        ))}
      </div>
      <br />
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

FoodCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  nationality: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default FoodCard;
