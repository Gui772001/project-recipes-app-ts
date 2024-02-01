import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<any>('');
  const [drinkRecipe, setDrinkRecipe] = useState<any>('');
  const currentPath = window.location.pathname;

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

  const handleCheckbox = (e: any) => {
    if (e.target.checked) {
      e.target.parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      e.target.parentNode.style.textDecoration = 'none';
    }
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
              {Object.keys(mealRecipe).map((key, index) => {
                if (key.includes('Ingredient') && mealRecipe[key]) {
                  return (
                    <li key={ key }>
                      <label
                        htmlFor={ key }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          onChange={ handleCheckbox }
                        />
                        {mealRecipe[key]}
                      </label>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <p data-testid="instructions">{mealRecipe.strInstructions}</p>
            <button data-testid="favorite-btn">Favoritar</button>
            <button data-testid="share-btn">Compartilhar</button>
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
              {Object.keys(drinkRecipe).map((key, index) => {
                if (key.includes('Ingredient') && drinkRecipe[key]) {
                  return (
                    <li key={ key }>
                      <label
                        htmlFor={ key }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          onChange={ handleCheckbox }
                        />
                        {drinkRecipe[key]}
                      </label>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
            <button data-testid="favorite-btn">Favoritar</button>
            <button data-testid="share-btn">Compartilhar</button>
            <button data-testid="finish-recipe-btn">Finalizar Receita</button>
          </div>
        )}
    </div>
  );
}

export default RecipeInProgress;
