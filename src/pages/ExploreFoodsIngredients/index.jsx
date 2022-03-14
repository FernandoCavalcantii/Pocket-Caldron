import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getIngredientsImage, getIngredientsName } from '../../services/api';

const ExploreIngredients = () => {
  const [ingredientsName, setIngredientsName] = useState([]);
  const [ingredientsImages, setIngredientsImages] = useState([]);

  const getImages = (arr) => {
    arr.forEach(({ strIngredient }) => {
      const response = getIngredientsImage('themealdb', strIngredient);
      setIngredientsImages((state) => [...state, response]);
    });
  };

  const getIngredients = async () => {
    const response = await getIngredientsName('themealdb');
    const newArr = response.meals.slice(0, Number('12'));
    setIngredientsName(newArr);
    getImages(newArr);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" />
      {ingredientsName.map(({ strIngredient }, index) => (
        <Link
          to="/foods"
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
            {strIngredient}
          </span>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

// ExploreIngredients.propTypes = {
//   name: PropTypes.string,
// }.isRequired;

export default ExploreIngredients;
