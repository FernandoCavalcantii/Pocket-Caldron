import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getDrinksByCategory, getDrinksRecipes } from '../../services/api';
import Footer from '../../components/Footer';

import style from './style.module.scss';
import Header from '../../components/Header';
import setDrinks from '../../Redux/actions/drinksActions';

const Drinks = () => {
  const history = useHistory();
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDrinks = useCallback(
    async () => {
      const res = await getDrinksRecipes();
      dispatch(setDrinks(res.drinks));
    }, [dispatch],
  );

  const setCategory = async (category) => {
    if (category === 'all' || selectedCategory === category) {
      fetchDrinks();
    } else {
      const res = await getDrinksByCategory(category);
      setDrinks(res.drinks);
      setSelectedCategory(category);
    }
  };

  const historyPush = () => {
    const copy = [...drinks];
    const id = copy[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return (
    <>
      <Header searchEnable pageName="Drinks" />
      <CategoriesFilter setCategory={ setCategory } />
      <section className={ style.recipesContainer }>
        { drinks && drinks.length === 1 && historyPush() }
        { drinks?.map((drink, index) => {
          if (index < Number('12')) {
            return (
              <RecipeCard
                testIdIndex={ index }
                key={ drink.strDrink }
                name={ drink.strDrink }
                thumb={ drink.strDrinkThumb }
                recipeId={ drink.idDrink }
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

export default Drinks;
