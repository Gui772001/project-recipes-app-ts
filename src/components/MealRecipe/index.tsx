import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { Meal, FavRecipesType } from '../../services/types';
import Context from '../../helpers/context/Context';

function MealRecipe() {
  const { data, btnRecipeText, setBtnRecipeText,
    clipboard, setClipboard } = useContext(Context);

  const [meal, setMeal] = useState<Meal>({} as Meal);
  const [drinks, setDrinks] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavRecipesType[]>([]);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];
  const navigate = useNavigate();

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
      const keys = Object.keys(startBtnState.meals);
      const resultBtn = keys.includes(urlId);
      if (resultBtn) {
        setBtnRecipeText('Continue Recipes');
      }
    }

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((drinkData) => setDrinks(drinkData.drinks));
  }, []);

  useEffect(() => {
    if (data.length === 0 || currentPath.includes(`/meals/${urlId}`)) {
      const fetchData = async () => {
        const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
        const response = await fetch(apiURL);
        const result = await response.json();
        setMeal(result.meals[0]);
      };
      fetchData();
    } else {
      setMeal(data.meals[0]);
    }
  }, [data, currentPath]);

  const getIngredients = (meals: any) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      const ingredient = meals[`strIngredient${i}`];
      const measure = meals[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const ingredients = meal ? getIngredients(meal) : [];

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
    inProgressRecipes.meals[urlId] = ['dwaipjsad', '21313', 'dkwlw'];
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
    setBtnRecipeText('Continue Recipes');
    navigate(`/meals/${urlId}/in-progress`);
  };

  const handleFavorite = () => {
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

  const copyClipboard = async () => {
    const recipeLink = `${window.location.origin}/meals/${meal.idMeal}`;
    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopyLink(true);
    } catch (error) {
      console.log('Failed to copy link to clipboard:', error);
    }
  };

  return (
    <div>
      <div key={ meal.idMeal }>
        <h2 data-testid="recipe-title">{meal.strMeal}</h2>
        <h3>Category:</h3>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          style={ { width: '350px' } }
          data-testid="recipe-photo"
        />
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p data-testid="instructions">{meal.strInstructions}</p>
        <button type="button" data-testid="share-btn" onClick={ copyClipboard }>
          <img src={ shareIcon } alt="share" />
        </button>
        {copyLink && <p>Link copied!</p>}
        <button type="button" onClick={ handleFavorite }>
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt={ favorite ? 'black-heart' : 'white-heart' }
          />
        </button>
        {youtubeEmbedUrl && (
          <iframe
            width="560"
            height="315"
            src={ youtubeEmbedUrl }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
        )}
        <h3>Recommended Drinks:</h3>
        <div style={ { display: 'flex', overflowX: 'auto' } }>
          {drinks.slice(0, 6).map((drink: any, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <h2 data-testid={ `${index}-recommendation-title` }>
                {drink.strDrink}
              </h2>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                style={ { width: '250px' } }
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0', left: '0', width: '100%' } }
        value={ btnRecipeText }
        onClick={ handleButtonStart }
      >
        {`${btnRecipeText}`}
      </button>
    </div>
  );
}

export default MealRecipe;
