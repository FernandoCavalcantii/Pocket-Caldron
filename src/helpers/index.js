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
  if (inProgressRecipe[type]) {
    return true;
  }
  return false;
};
