import React, { useContext, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../../helpers/context/Context';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strYoutube: string;
};

function MealRecipe() {
  const { data, btnRecipeText, setBtnRecipeText } = useContext(Context);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [drinks, setDrinks] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];
  const navigate = useNavigate();

  useEffect(() => {
    const startBtnStateString = localStorage.getItem('inProgressRecipes');

    // Verifica se há um valor existente e faz o parsing
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

  if (!meal) {
    return <div>Loading...</div>;
  }

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

  const youtubeEmbedUrl = meal ? getYoutubeEmbedUrl(meal.strYoutube) : '';

  const handleButtonStart = () => {
    // Recupera o valor atual no localStorage
    const inProgressRecipesString = localStorage.getItem('inProgressRecipes');

    // Verifica se há um valor existente e faz o parsing
    const inProgressRecipes = inProgressRecipesString
      ? JSON.parse(inProgressRecipesString)
      : { drinks: {}, meals: {} };

    // Atualiza ou adiciona a informação desejada
    // inProgressRecipes[/* tipo-da-receita */][/* id-da-receita */] = [/* lista-de-ingredientes-utilizados */];
    inProgressRecipes.meals[urlId] = ['dwaipjsad', '21313', 'dkwlw'];

    // Salva o objeto atualizado no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    setBtnRecipeText('Continue Recipes');
    navigate(`/meals/${urlId}/in-progress`);
  };

  return (
    <div>
      <div key={ meal.idMeal }>
        <h2
          data-testid="recipe-title"
        >
          {meal.strMeal}
        </h2>
        <h3>Category:</h3>
        <p
          data-testid="recipe-category"
        >
          {meal.strCategory}
        </p>
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

        <p
          data-testid="instructions"
        >
          {meal.strInstructions}
        </p>
        <button
          type="button"
          data-testid="share-btn"
          // style={ { position: 'fixed', bottom: '10', left: '20', width: '100%' } }
        >
          Share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          // style={ { position: 'fixed', bottom: '20', left: '0', width: '100%' } }
        >
          Fav
        </button>
        {youtubeEmbedUrl && (
          <iframe
            width="560"
            height="315"
            src={ youtubeEmbedUrl }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
        )}
        <h3>Recomended Drinks:</h3>
        <div
          style={ {
            display: 'flex',
            overflowX: 'auto' } }
        >
          {drinks.slice(0, 6).map((drink: any, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
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
