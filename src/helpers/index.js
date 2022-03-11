const getIngredientsAndMeasures = (recipe) => {
  let ingredients = [];
  let measures = [];
  let results = [];

  recipe.forEach((teste) => {
    if (teste[0].includes('strIngredient')) {
      ingredients = [...ingredients, teste];
    }
    if (teste[0].includes('strMeasure')) {
      measures = [...measures, teste];
    }
  });

  ingredients.forEach((teste, index) => {
    results = [
      ...results, {
        ingredient: ingredients[index][1],
        measure: measures[index][1],
      }];
  });

  return results.filter((value) => value.ingredient !== '' && value.ingredient !== null);
};

export default getIngredientsAndMeasures;

export const isRecipeCompleted = (id) => {
  const completedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (completedRecipes) {
    return completedRecipes.some((recipe) => recipe === id);
  }
  return false;
};

export const isInProgressRecipe = (id, type) => {
  const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipe && inProgressRecipe[type][id]) {
    return true;
  }
  return false;
};

export const isRecipeFavorited = (id) => {
  const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (recipe) {
    return recipe.some((acc) => acc.id === id);
  }
  return false;
};

export const toggleFavoriteRecipe = (isFavorited, {
  id, type, nationality, category, alcoholicOrNot, name, image }) => {
  const favoriteds = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteds) {
    const newFavoriteds = [{
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteds));
    return false;
  }
  if (isFavorited) {
    const newFavoriteds = favoriteds.filter((acc) => acc.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteds));
  } else {
    const newFavoriteds = [...favoriteds, {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteds));
  }
};
