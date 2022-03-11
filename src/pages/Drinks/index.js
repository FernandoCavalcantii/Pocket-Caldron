import React, { useEffect, useState } from 'react';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getDrinksByCategory, getDrinksRecipes } from '../../services/api';
import Footer from '../../components/Footer';

import style from './style.module.css';
import Header from '../../components/Header';

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDrinks = async () => {
    const res = await getDrinksRecipes();
    setDrinks(res.drinks);
  };

  const setCategory = async (category) => {
    if (category === 'all' || selectedCategory === category) {
      fetchDrinks();
    } else {
      const res = await getDrinksByCategory(category);
      setDrinks(res.drinks);
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <>
      <Header searchEnable pageName="Drinks" />
      <CategoriesFilter setCategory={ setCategory } />
      <section className={ style.recipesContainer }>
        {drinks?.map((drink, index) => {
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
