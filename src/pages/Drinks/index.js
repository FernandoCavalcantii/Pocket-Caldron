import React, { useEffect, useState } from 'react';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipeCard from '../../components/RecipeCard';
import { getDrinksRecipes } from '../../services/api';

import style from './style.module.css';

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = async () => {
    const res = await getDrinksRecipes();
    setDrinks(res.drinks);
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <>
      <CategoriesFilter />
      <section className={ style.recipesContainer }>
        {drinks?.map((drink, index) => {
          if (index < Number('12')) {
            return (
              <RecipeCard
                testIdIndex={ index }
                key={ drink.strDrink }
                name={ drink.strDrink }
                thumb={ drink.strDrinkThumb }
              />
            );
          }
          return false;
        })}
      </section>
    </>

  );
};

export default Drinks;
