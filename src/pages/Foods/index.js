import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import Footer from '../../components/Footer';
import { getFoodsCategories, getFoodsRecipes,
  getFoodsByCategory } from '../../services/api';

import style from './style.module.css';
import Header from '../../components/Header';
import setFoods from '../../Redux/actions/foodsActions';

const Foods = () => {
  const history = useHistory();
  const foods = useSelector((state) => state.foodsReducer.foods);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchFoods = useCallback(
    async () => {
      const res = await getFoodsRecipes();
      dispatch(setFoods(res.meals));
    }, [dispatch],
  );

  const setCategory = async (category) => {
    if (category === 'all' || selectedCategory === category) {
      fetchFoods();
    } else {
      const res = await getFoodsByCategory(category);
      dispatch(setFoods(res.meals));
      setSelectedCategory(category);
    }
  };

  const historyPush = () => {
    const copy = [...foods];
    const id = copy[0].idMeal;
    history.push(`/foods/${id}`);
  };

  useEffect(() => {
    getFoodsCategories();
    fetchFoods();
  }, [fetchFoods]);
  return (
    <>
      <Header searchEnable pageName="Foods" />
      <CategoriesFilter setCategory={ setCategory } />
      <section className={ style.recipesContainer }>
        { foods && foods.length === 1 && historyPush() }
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
      <Footer />
    </>
  );
};

export default Foods;
