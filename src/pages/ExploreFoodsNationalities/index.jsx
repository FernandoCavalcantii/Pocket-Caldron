import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import setFoods from '../../Redux/actions/foodsActions';
import { getFoodsByNation,
  getFoodsRecipes, getNationalitiesLsit } from '../../services/api';

const ExploreFoodsNationalities = () => {
  const [nationList, setNationList] = useState([]);
  const foods = useSelector((state) => state.foodsReducer.foods);
  const dispatch = useDispatch();

  const getListNames = async () => {
    const res = await getNationalitiesLsit();
    setNationList(res.meals);
  };

  const fetchFoods = useCallback(
    async () => {
      const res = await getFoodsRecipes();
      dispatch(setFoods(res.meals));
    }, [dispatch],
  );

  const changeFoods = async ({ target: { value } }) => {
    if (value !== 'all') {
      const res = await getFoodsByNation(value);
      dispatch(setFoods(res.meals));
    } else {
      fetchFoods();
    }
  };

  useEffect(() => {
    getListNames();
    fetchFoods();
  }, [fetchFoods]);

  return (
    <div>
      <Header pageName="Explore Nationalities" searchEnable />
      <div className="container">
        <select
          name="nationsList"
          data-testid="explore-by-nationality-dropdown"
          onChange={ changeFoods }
        >
          <option
            data-testid="All-option"
            value="all"
          >
            All
          </option>
          {nationList.length >= 1 && nationList.map((nation) => (
            <option
              key={ Math.random() }
              data-testid={ `${nation.strArea}-option` }
              value={ nation.strArea }
            >
              {nation.strArea}
            </option>
          ))}
        </select>
      </div>
      <div className="recipeContainer">
        {foods?.map((food, index) => {
          if (index < Number('12')) {
            return (
              <RecipeCard
                testIdIndex={ index }
                locale
                key={ food.strMeal }
                name={ food.strMeal }
                thumb={ food.strMealThumb }
                recipeId={ food.idMeal }
              />
            );
          }
          return false;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoodsNationalities;
