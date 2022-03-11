export const getFoodsRecipes = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const foods = await response.json();
  return foods;
};

export const getDrinksRecipes = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const drinks = await response.json();
  return drinks;
};

export const getFoodsCategories = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const foodCategories = await response.json();
  return foodCategories;
};

export const getDrinksCategories = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const drinkCategories = await response.json();
  return drinkCategories;
};

export const getFoodsByCategory = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const res = await fetch(URL);
  const foods = await res.json();
  return foods;
};

export const getDrinksByCategory = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const res = await fetch(URL);
  const drink = await res.json();
  return drink;
};

export const getFoodById = async (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(URL);
  const food = await res.json();
  return food;
};

export const getDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(URL);
  const drink = await res.json();
  return drink;
};
