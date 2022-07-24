import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinksCategories, getFoodsCategories } from '../../services/api';

import style from './style.module.scss';

function CategoriesFilter({ setCategory }) {
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
    <div className={ style.container }>
      <button
        type="button"
        onClick={ () => setCategory('all') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categories?.map(({ strCategory }, index) => (
        index < Number('5') && (
          <button
            key={ index }
            type="button"
            data-testid={ strCategory.concat('-category-filter') }
            onClick={ () => setCategory(strCategory) }
          >
            {strCategory}
          </button>
        )
      ))}
    </div>
    // `${strCategory + "-category-filter"}`
  );
}

CategoriesFilter.propTypes = {
  setCategory: PropTypes.func,
}.isRequired;

export default CategoriesFilter;
