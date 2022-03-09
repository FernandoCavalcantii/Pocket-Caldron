import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getFoodsCategories, getFoodsRecipes,
  getFoodsByCategory } from '../../services/api';

import style from './style.module.css';
import Header from '../../components/Header';
import setFoods from '../../Redux/actions/foodsActions';

const Foods = () => {
  const foods = useSelector((state) => state.foodsReducer.foods);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const setCategory = async (category) => {
    if (category === 'all' || selectedCategory === category) {
      fetchFoods();
    } else {
      const res = await getFoodsByCategory(category);
      dispatch(setFoods(res.meals));
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      const res = await getFoodsRecipes();
      dispatch(setFoods(res.meals));
    };
    fetchFoods();
    getFoodsCategories();
  }, [dispatch]);

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
