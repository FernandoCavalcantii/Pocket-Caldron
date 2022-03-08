import React, { useEffect, useState } from 'react';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getFoodsCategories, getFoodsRecipes } from '../../services/api';

import style from './style.module.css';

const Foods = () => {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    const res = await getFoodsRecipes();
    setFoods(res.meals);
  };

  const setCategory = (category) => {
    if (category === 'all') {
      console.log('hoi');
    }
  };

  useEffect(() => {
    fetchFoods();
    getFoodsCategories();
  }, []);

  return (
    <>
      <CategoriesFilter setCategory={ setCategory } />
      <section className={ style.recipesContainer }>
        {foods?.map((food, index) => {
          if (index < Number('12')) {
            return (
              <RecipeCard
                testIdIndex={ index }
                key={ food.strMeal }
                name={ food.strMeal }
                thumb={ food.strMealThumb }
              />
            );
          }
          return false;
        })}
      </section>
    </>
  );
};

export default Foods;
