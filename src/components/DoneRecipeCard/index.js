import React from 'react';
import PropTypes from 'prop-types';
import FoodCard from './FoodCard';
import DrinkCard from './DrinkCards';

const DoneRecipeCard = (props) => {
  const { name,
    image,
    index, category, doneDate, tags, type, alcoholicOrNot, nationality, id } = props;
  return (
    <div>
      {
        type === 'food' ? <FoodCard
          id={ id }
          name={ name }
          image={ image }
          index={ index }
          nationality={ nationality }
          category={ category }
          doneDate={ doneDate }
          tags={ tags }
        /> : <DrinkCard
          id={ id }
          name={ name }
          image={ image }
          index={ index }
          doneDate={ doneDate }
          alcoholicOrNot={ alcoholicOrNot }
        />
      }
    </div>
  );
};

DoneRecipeCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  nationality: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DoneRecipeCard;
