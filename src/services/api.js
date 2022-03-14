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

export const getFoodsByIngredients = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const getFoodsByName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const getFoodsByFirstLetter = async (letter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const getDrinksByIngredients = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const getDrinksByName = async (name) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const getDrinksByFirstLetter = async (letter) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const res = await fetch(URL);
  const data = await res.json();
  return data;
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

export const getRandomRecipe = async (apiName) => {
  const URL = `https://www.${apiName}.com/api/json/v1/1/random.php`;
  const res = await fetch(URL);
  const recipe = await res.json();
  return recipe;
};

export const getIngredientsName = async (apiName) => {
  const URL = `https://www.${apiName}.com/api/json/v1/1/list.php?i=list`;
  const res = await fetch(URL);
  const recipe = await res.json();
  return recipe;
};

export const getIngredientsImage = (apiName, ingredient) => {
  const URL = `https://www.${apiName}.com/images/ingredients/${ingredient}-Small.png`;
  return URL;
};

export const getNationalitiesLsit = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const res = await fetch(URL);
  const list = await res.json();
  return list;
};

export const getFoodsByNation = async (nation) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`;
  const res = await fetch(URL);
  const foods = await res.json();
  return foods;
};
