import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
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
  const { data } = useContext(Context);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [drinks, setDrinks] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];

  useEffect(() => {
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
        console.log(result.meals[0]);
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
      </div>
    </div>
  );
}

export default MealRecipe;
