import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const urlId = pathSegments[2];
  const [inProgressRecipes, setInProgressRecipes] = useState<
  { drinks: { [key: string]: string[] }; meals: { [key: string]: string[] } }>({
    drinks: {},
    meals: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentPath.includes(`/meals/${id}/in-progress`)) {
      const fetchData = async () => {
        const apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(apiURL);
        const result = await response.json();
        setMealRecipe(result.meals[0]);
      };
      fetchData();
    } else if (currentPath.includes(`/drinks/${id}/in-progress`)) {
      const fetchData = async () => {
        const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(apiURL);
        const result = await response.json();
        setDrinkRecipe(result.drinks[0]);
      };
      fetchData();
    }
  }, [id, currentPath]);

  useEffect(() => {
    const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesString) {
      const savedInProgressRecipes = JSON.parse(inProgressRecipesString);
      setInProgressRecipes(savedInProgressRecipes);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    const favoriteRecipesString = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesString) {
      const favoriteRecipesList = (JSON.parse(favoriteRecipesString));
      setFavoriteRecipes(favoriteRecipesList);
      const isFavorite = favoriteRecipesList
        .some((recipe: FavRecipesType) => recipe.id === urlId);
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

    setInProgressRecipes(updatedRecipes);
  };

  if (loading) {
    return <div>Carregando...</div>; // ou qualquer indicador de carregamento que você desejar
  }

  const mealIngredients = Object.keys(mealRecipe)
    .filter((key) => key.includes('Ingredient') && mealRecipe[key]);

  const drinkIngredients = Object.keys(drinkRecipe)
    .filter((key) => key.includes('Ingredient') && drinkRecipe[key]);

  const copyMealClipboard = async () => {
    const recipeLink = `${window.location.origin}/meals/${mealRecipe.idMeal}`;
    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopyLink(true);
    } catch (error) {
      console.log('Failed to copy link to clipboard:', error);
    }
  };

  const copyDrinkClipboard = async () => {
    const recipeLink = `${window.location.origin}/drinks/${drinkRecipe.idDrink}`;
    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopyLink(true);
    } catch (error) {
      console.log('Failed to copy link to clipboard:', error);
    }
  };

  const handleMealFavorite = () => {
    setFavorite((prevFavorite) => {
      const newFavoriteStatus = !prevFavorite;
      if (newFavoriteStatus) {
        setFavoriteRecipes((prevFavorites: FavRecipesType[]) => [
          ...prevFavorites,
          {
            id: mealRecipe.idMeal,
            type: 'meal',
            nationality: mealRecipe.strArea,
            category: mealRecipe.strCategory,
            alcoholicOrNot: mealRecipe.strAlcoholic || '',
            name: mealRecipe.strMeal,
            image: mealRecipe.strMealThumb,
          },
        ]);
      } else {
        setFavoriteRecipes((prevFavorites) => prevFavorites
          .filter((recipe) => recipe.id !== mealRecipe.idMeal));
      }
      return newFavoriteStatus;
    });
  };

  const handleDrinkFavorite = () => {
    setFavorite((prevFavorite) => {
      const newFavoriteStatus = !prevFavorite;
      if (newFavoriteStatus) {
        setFavoriteRecipes((prevFavorites: FavRecipesType[]) => [
          ...prevFavorites,
          {
            id: drinkRecipe.idDrink,
            type: 'drink',
            nationality: drinkRecipe.strArea || '',
            category: drinkRecipe.strCategory,
            alcoholicOrNot: drinkRecipe.strAlcoholic || '',
            name: drinkRecipe.strDrink,
            image: drinkRecipe.strDrinkThumb,
          },
        ]);
      } else {
        setFavoriteRecipes((prevFavorites) => prevFavorites
          .filter((recipe) => recipe.id !== drinkRecipe.idDrink));
      }
      return newFavoriteStatus;
    });
  };

  return (
    <div>
      {(currentPath.includes(`/meals/${id}/in-progress`))
        ? (
          <div>
            <img
              src={ mealRecipe.strMealThumb }
              alt={ mealRecipe.strMeal }
              data-testid="recipe-photo"
              style={ { maxWidth: '350px' } }
            />
            <h1 data-testid="recipe-title">{mealRecipe.strMeal}</h1>
            <p data-testid="recipe-category">{mealRecipe.strCategory}</p>
            <ul>
              {mealIngredients.map((key, index) => (
                <li key={ key }>
                  <label
                    htmlFor={ key }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      checked={ (inProgressRecipes[currentPath
                        .includes('/meals/') ? 'meals' : 'drinks'][urlId] || [])
                        .includes(key) }
                      onChange={ (e) => handleCheckbox(e, key) }
                    />
                    {mealRecipe[key]}
                  </label>
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{mealRecipe.strInstructions}</p>

            <button
              onClick={ handleMealFavorite }
            >
              <img
                data-testid="favorite-btn"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt={ favorite ? 'black-heart' : 'white-heart' }
              />
            </button>
            <button
              data-testid="share-btn"
              onClick={ copyMealClipboard }
            >
              {copyLink ? 'Link copied!' : 'Share recipe'}
            </button>
            <button data-testid="finish-recipe-btn">Finalizar Receita</button>
          </div>
        ) : (
          <div>
            <img
              src={ drinkRecipe.strDrinkThumb }
              alt={ drinkRecipe.strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{drinkRecipe.strDrink}</h1>
            <p data-testid="recipe-category">{drinkRecipe.strCategory}</p>
            <ul>
              {drinkIngredients.map((key, index) => (
                <li key={ key }>
                  <label
                    htmlFor={ key }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      checked={ (inProgressRecipes[currentPath
                        .includes('/meals/') ? 'meals' : 'drinks'][urlId] || [])
                        .includes(key) }
                      onChange={ (e) => handleCheckbox(e, key) }
                    />
                    {drinkRecipe[key]}
                  </label>
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
            <button
              onClick={ handleDrinkFavorite }
            >
              <img
                data-testid="favorite-btn"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt={ favorite ? 'black-heart' : 'white-heart' }
              />
            </button>
            <button
              data-testid="share-btn"
              onClick={ copyDrinkClipboard }
            >
              {copyLink ? 'Link copied!' : 'Share Recipe'}
            </button>
            <button data-testid="finish-recipe-btn">Finalizar Receita</button>
          </div>
        )}
    </div>
  );
}

export default RecipeInProgress;
