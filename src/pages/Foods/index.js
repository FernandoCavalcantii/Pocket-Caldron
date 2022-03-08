import React, { useEffect, useState } from 'react';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getFoodsCategories, getFoodsRecipes,
  getFoodsByCategory } from '../../services/api';

import style from './style.module.css';
import Header from '../../components/Header';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchFoods = async () => {
    const res = await getFoodsRecipes();
    setFoods(res.meals);
  };

  const setCategory = async (category) => {
    if (category === 'all' || selectedCategory === category) {
      fetchFoods();
    } else {
      const res = await getFoodsByCategory(category);
      setFoods(res.meals);
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    fetchFoods();
    getFoodsCategories();
  }, []);

  return (
    <>
      <Header searchEnable pageName="Foods" />
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
                recipeId={ food.idMeal }
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
