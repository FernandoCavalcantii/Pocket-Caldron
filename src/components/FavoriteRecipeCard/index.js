import React from 'react';
import PropTypes from 'prop-types';
import FoodCard from './FoodCard';
import DrinkCard from './DrinkCards';

const FavoriteRecipeCard = (props) => {
  const { name,
    image,
    index, category, type, alcoholicOrNot, nationality, id } = props;
  return (
    type === 'food' ? <FoodCard
      id={ id }
      name={ name }
      image={ image }
      index={ index }
      nationality={ nationality }
      category={ category }
    /> : <DrinkCard
      id={ id }
      name={ name }
      image={ image }
      index={ index }
      alcoholicOrNot={ alcoholicOrNot }
    />
  );
};

FavoriteRecipeCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  nationality: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default FavoriteRecipeCard;
