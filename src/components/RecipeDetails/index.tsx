import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Meal, FavRecipesType, Drink } from '../../services/types';
import Context from '../../helpers/context/Context';
import { copyClipboard } from '../../services/functions';
import RenderDetails from '../RenderDetails';

function RecipeDetails() {
  const { data, btnRecipeText, setBtnRecipeText } = useContext(Context);
  const [meal, setMeal] = useState<Meal>();
  const [drink, setDrink] = useState<Drink>();
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavRecipesType[]>([]);
  const [recipeType, setRecipeType] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];
  const navigate = useNavigate();

  useEffect(() => {
    setRecipeType(category);
  }, [category]);

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

  useEffect(() => {
    const startBtnStateString = localStorage.getItem('inProgressRecipes');
    if (startBtnStateString !== null) {
      const startBtnState = JSON.parse(startBtnStateString);
      console.log(startBtnState);
      const keys = Object.keys(category === 'meal'
        ? startBtnState.meals : startBtnState.drinks);
      const resultBtn = keys.includes(urlId);
      if (resultBtn) {
        setBtnRecipeText('Continue Recipes');
      } else {
        setBtnRecipeText('Start Recipe');
      }
    } else {
      setBtnRecipeText('Start Recipe');
    }
    if (category === 'meal') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((drinkData) => setDrink(drinkData.drinks));
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((mealData) => setMeal(mealData.meals));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const categoryFix = category === 'drink' ? 'cocktail' : 'meal';
      const apiURL = `https://www.the${categoryFix}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
      const response = await fetch(apiURL);
      const result = await response.json();
      if (category === 'meal') {
        setMeal(result.meals[0]);
      } else if (category === 'drink') {
        setDrink(result.drinks[0]);
      }
    };

    if ((data.length === 0 || currentPath
      .includes(`/${category}s/${urlId}`)) && recipeType) {
      fetchData();
    }
  }, [data, currentPath, recipeType, urlId]);

  if (!meal || !drink) {
    return <div>Loading...</div>;
  }

  const getIngredients = (catData: any) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      const ingredient = catData[`strIngredient${i}`];
      const measure = catData[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const ingredients = category === 'meal' ? getIngredients(meal) : getIngredients(drink);

  const getYoutubeEmbedUrl = (youtubeUrl: string) => {
    const videoId = youtubeUrl.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const youtubeEmbedUrl = meal && meal.strYoutube
    ? getYoutubeEmbedUrl(meal.strYoutube) : '';

  const handleButtonStart = () => {
    const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesString
      ? JSON.parse(inProgressRecipesString)
      : { drinks: {}, meals: {} };
    if (recipeType === 'meal') {
      if (!inProgressRecipes.meals[urlId]) {
        inProgressRecipes.meals[urlId] = [];
      }
      navigate(`/meals/${urlId}/in-progress`);
    } else if (recipeType === 'drink') {
      if (!inProgressRecipes.drinks[urlId]) {
        inProgressRecipes.drinks[urlId] = [];
      }
      navigate(`/drinks/${urlId}/in-progress`);
    }
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
    if (inProgressRecipesString?.includes(urlId)) {
      setBtnRecipeText('Continue Recipes');
    }
  };

  const handleMealFavorite = () => {
    setFavorite((prevFavorite) => {
      const newFavoriteStatus = !prevFavorite;
      if (newFavoriteStatus) {
        setFavoriteRecipes((prevFavorites: FavRecipesType[]) => [
          ...prevFavorites,
          {
            id: meal.idMeal,
            type: 'meal',
            nationality: meal.strArea,
            category: meal.strCategory,
            alcoholicOrNot: meal.strAlcoholic || '',
            name: meal.strMeal,
            image: meal.strMealThumb,
          },
        ]);
      } else {
        setFavoriteRecipes((prevFavorites) => prevFavorites
          .filter((recipe) => recipe.id !== meal.idMeal));
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
            id: drink.idDrink,
            type: 'drink',
            nationality: drink.strArea || '',
            category: drink.strCategory,
            alcoholicOrNot: drink.strAlcoholic || '',
            name: drink.strDrink,
            image: drink.strDrinkThumb,
          },
        ]);
      } else {
        setFavoriteRecipes((prevFavorites) => prevFavorites
          .filter((recipe) => recipe.id !== drink.idDrink));
      }
      return newFavoriteStatus;
    });
  };
  return (
    <RenderDetails
      meal={ meal }
      drink={ drink }
      type={ category }
      favorite={ favorite }
      location={ location }
      setCopyLink={ setCopyLink }
      recipe={ category === 'meal' ? meal : drink }
      ingredients={ ingredients }
      handleButtonStart={ handleButtonStart }
      copyClipboard={ copyClipboard }
      handleMealFavorite={ handleMealFavorite }
      handleDrinkFavorite={ handleDrinkFavorite }
      copyLink={ copyLink }
      btnRecipeText={ btnRecipeText }
      youtubeEmbedUrl={ youtubeEmbedUrl }
    />
  );
}

export default RecipeDetails;
