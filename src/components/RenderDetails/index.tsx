import React, { useEffect, useState } from 'react';
import { Drink, Meal, RecipeDetailsProps } from '../../services/types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RenderDetails({ type, recipe, ingredients,
  handleButtonStart, copyClipboard, handleMealFavorite, handleDrinkFavorite,
  copyLink, btnRecipeText, favorite, location, setCopyLink,
  youtubeEmbedUrl }: RecipeDetailsProps) {
  const [mealData, setMealData] = useState<Meal[]>([]);
  const [drinkData, setDrinkData] = useState<Drink[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setMealData(data.meals));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinkData(data.drinks));
  });

  const recommendedItems = type === 'meal' ? drinkData : mealData;

  return (
    <div>
      <div key={ type === 'meal' ? (recipe as Meal).idMeal : (recipe as Drink).idDrink }>
        <h2 data-testid="recipe-title">
          {type === 'meal'
            ? (recipe as Meal).strMeal : (recipe as Drink).strDrink}
        </h2>
        <h3>Category:</h3>
        <p data-testid="recipe-category">
          {type === 'meal'
            ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        <img
          src={ type === 'meal' ? (recipe as Meal).strMealThumb
            : (recipe as Drink).strDrinkThumb }
          alt={ type === 'meal' ? (recipe as Meal).strMeal
            : (recipe as Drink).strDrink }
          style={ { width: '350px' } }
          data-testid="recipe-photo"
        />
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient: any, index: any) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p data-testid="instructions">
          {type === 'meal'
            ? recipe.strInstructions : recipe.strInstructions}
        </p>
        {youtubeEmbedUrl && (
          <iframe
            data-testid="video"
            title="YouTube Video Player"
            src={ youtubeEmbedUrl }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
             encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyClipboard(location, setCopyLink) }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {copyLink && <p>Link copied!</p>}
        <button
          type="button"
          onClick={ type === 'meal'
            ? handleMealFavorite : handleDrinkFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt={ favorite ? 'black-heart' : 'white-heart' }
          />
        </button>
        <h3>{type === 'meal' ? 'Recommended Drinks:' : 'Recommended Meals:'}</h3>
        <div
          style={ { display: 'flex', overflowX: 'auto' } }
        >
          {recommendedItems.slice(0, 6).map((item: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <h4 data-testid={ `${index}-recommendation-title` }>
                {type === 'meal' ? item.strDrink : item.strMeal}
              </h4>
              <img
                src={ type === 'meal' ? item.strDrinkThumb : item.strMealThumb }
                alt={ type === 'meal' ? item.strDrink : item.strMeal }
                style={ { width: '250px' } }
                data-testid={ `${index}-recommendation-image` }
              />
            </div>
          ))}
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
    </div>
  );
}

export default RenderDetails;
