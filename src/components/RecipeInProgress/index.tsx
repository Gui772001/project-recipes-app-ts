import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FavRecipesType } from '../../services/types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<any>('');
  const [drinkRecipe, setDrinkRecipe] = useState<any>('');
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavRecipesType[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const urlId = pathSegments[2];
  const [inProgressRecipes, setInProgressRecipes] = useState<{
    drinks: { [key: string]: string[] };
    meals: { [key: string]: string[] };
  }>({
    drinks: {},
    meals: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const apiURL = currentPath.includes('/meals/')
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(apiURL);
      const result = await response.json();

      if (currentPath.includes('/meals/')) {
        setMealRecipe(result.meals[0]);
      } else if (currentPath.includes('/drinks/')) {
        setDrinkRecipe(result.drinks[0]);
      }
    };

    fetchData();
  }, [id, currentPath]);

  useEffect(() => {
    const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesString) {
      const savedInProgressRecipes = JSON.parse(inProgressRecipesString);
      setInProgressRecipes(savedInProgressRecipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    const favoriteRecipesString = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesString) {
      const favoriteRecipesList = JSON.parse(favoriteRecipesString);
      setFavoriteRecipes(favoriteRecipesList);
      const isFavorite = favoriteRecipesList.some(
        (recipe: FavRecipesType) => recipe.id === urlId,
      );
      setFavorite(isFavorite);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleCheckbox = (e: any, ingredient: string) => {
    const updatedRecipes = { ...inProgressRecipes };
    const currentIngredients = updatedRecipes[currentPath
      .includes('/meals/') ? 'meals' : 'drinks'][urlId] || [];

    if (e.target.checked) {
      e.target.parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      updatedRecipes[currentPath
        .includes('/meals/') ? 'meals' : 'drinks'][urlId] = currentIngredients
        .includes(ingredient)
        ? currentIngredients.filter((item) => item !== ingredient)
        : [...currentIngredients, ingredient];
    } else {
      e.target.parentNode.style.textDecoration = 'none';
      updatedRecipes[currentPath
        .includes('/meals/') ? 'meals' : 'drinks'][urlId] = currentIngredients
        .filter((item) => item !== ingredient);
    }
    const totalIngredients = ingredients.length;
    const checkedIngredients = inProgressRecipes[currentPath
      .includes('/meals/') ? 'meals' : 'drinks'][urlId] || [];
    const checkedIngredientsCount = checkedIngredients.length;
    const allIngredientsChecked = totalIngredients === checkedIngredientsCount;

    setAllChecked(allIngredientsChecked);
    setInProgressRecipes(updatedRecipes);
  };

  const handleFavorite = (recipe: any) => {
    setFavorite((prevFavorite) => {
      const newFavoriteStatus = !prevFavorite;
      const type = recipe.idMeal ? 'meal' : 'drink';
      if (newFavoriteStatus) {
        setFavoriteRecipes((prevFavorites: FavRecipesType[]) => [
          ...prevFavorites,
          {
            id: recipe.idMeal || recipe.idDrink,
            type,
            nationality: recipe.strArea || '',
            category: recipe.strCategory,
            alcoholicOrNot: recipe.strAlcoholic || '',
            name: recipe.strMeal || recipe.strDrink,
            image: recipe.strMealThumb || recipe.strDrinkThumb,
          },
        ]);
      } else {
        setFavoriteRecipes((prevFavorites) => prevFavorites
          .filter((favRecipe) => favRecipe.id !== recipe.id));
      }
      return newFavoriteStatus;
    });
  };

  const copyToClipboard = async (recipe: any) => {
    const recipeType = recipe.idMeal ? 'meal' : 'drink';
    const recipeLink = `${window.location
      .origin}/${recipeType}s/${recipeType === 'meal' ? recipe.idMeal : recipe.idDrink}`;
    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopyLink(true);
    } catch (error) {
      console.log('Failed to copy link to clipboard:', error);
    }
  };

  const recipe = currentPath.includes('/meals/') ? mealRecipe : drinkRecipe;
  const ingredients = Object.keys(recipe).filter(
    (key) => key.includes('Ingredient') && recipe[key],
  );

  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    doneRecipes.push({
      id: mealRecipe.idMeal || drinkRecipe.idDrink,
      type: currentPath.includes('/meals/') ? 'meal' : 'drink',
      category: mealRecipe.strCategory || drinkRecipe.strCategory,
      alcoholicOrNot: mealRecipe.strAlcoholic || drinkRecipe.strAlcoholic || '',
      name: mealRecipe.strMeal || drinkRecipe.strDrink,
      image: mealRecipe.strMealThumb || drinkRecipe.strDrinkThumb,
      doneDate: new Date(),
      tags: mealRecipe.strTags ? mealRecipe.strTags.split(',') : [],
      nationality: mealRecipe.strArea || '',
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    navigate('/done-recipes');
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
        style={ { maxWidth: '350px' } }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <ul>
        {ingredients.map((key, index) => (
          <li key={ key }>
            <label htmlFor={ key } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                checked={
                  (inProgressRecipes[currentPath
                    .includes('/meals/') ? 'meals' : 'drinks'][
                    urlId
                  ] || []
                  ).includes(key)
                }
                onChange={ (e) => handleCheckbox(e, key) }
              />
              {recipe[key]}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button onClick={ () => handleFavorite(recipe) }>
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt={ favorite ? 'black-heart' : 'white-heart' }
        />
      </button>
      <button
        data-testid="share-btn"
        onClick={ () => copyToClipboard(recipe) }
      >
        {copyLink ? 'Link copied!' : 'Share recipe'}
      </button>
      <button
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
