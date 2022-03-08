import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksCategories, getFoodsCategories } from '../../services/api';

function CategoriesFilter({setCategory}) {
  const [categories, setCategories] = useState();
  const { pathname } = useLocation();

  const setDrinksCategories = async () => {
    const res = await getDrinksCategories();
    setCategories(res.drinks);
  };

  const setFoodsCategories = async () => {
    const res = await getFoodsCategories();
    setCategories(res.meals);
  };

  useEffect(() => {
    if (pathname === '/foods') {
      setFoodsCategories();
    }
    if (pathname === '/drinks') {
      setDrinksCategories();
    }
  }, [pathname]);

  return (
    <div>
      <button type="button"
        onClick={() => setCategory("all")}
      >
        All
      </button>
      {categories?.map((category, index) => (
        index < Number('5') && (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={() => setCategory(category.strCategory)}
          >
            {category.strCategory}
          </button>
        )
      ))}
    </div>
  );
}

export default CategoriesFilter;
