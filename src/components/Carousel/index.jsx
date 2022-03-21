import React from 'react';

import PropTypes from 'prop-types';

import style from './style.module.scss';

const Carousel = ({ recomendation, drinkOrMeal }) => (
  <div className={ style.recomendationsContainer }>
    <ul className={ style.recommendationHolder }>
      {recomendation.slice(0, Number('6')).map((recommend, index) => (
        <li
          key={ Math.random() }
          data-testid={
            `${index}-recomendation-card`
          }
        >
          <img src={ recommend[`str${drinkOrMeal}Thumb`] } alt="" />
          <span>{recommend.strCategory}</span>
          <span data-testid={ `${index}-recomendation-title` }>
            {recommend[`str${drinkOrMeal}`]}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

Carousel.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default Carousel;
