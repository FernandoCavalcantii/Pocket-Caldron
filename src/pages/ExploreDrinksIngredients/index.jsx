import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getIngredientsImage, getIngredientsName } from '../../services/api';

import style from './style.module.scss';

const ExploreIngredients = () => {
  const [ingredientsName, setIngredientsName] = useState([]);
  const [ingredientsImages, setIngredientsImages] = useState([]);

  const getImages = (arr) => {
    arr.forEach((name) => {
      const response = getIngredientsImage('thecocktaildb', name.strIngredient1);
      setIngredientsImages((state) => [...state, response]);
    });
  };

  const getIngredients = useCallback(
    async () => {
      const response = await getIngredientsName('thecocktaildb');
      const newArr = response.drinks.slice(0, Number('12'));
      setIngredientsName(newArr);
      getImages(newArr);
    }, [],
  );

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <>
      <Header pageName="Explore Ingredients" />
      <div className={ style.container }>
        {ingredientsName.map((name, index) => (
          <Link
            to="/drinks"
            key={ Math.random() }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ ingredientsImages[index] }
              alt="foto"
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { name.strIngredient1 }
            </span>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
};

// ExploreIngredients.propTypes = {
//   name: PropTypes.string,
// }.isRequired;

export default ExploreIngredients;
