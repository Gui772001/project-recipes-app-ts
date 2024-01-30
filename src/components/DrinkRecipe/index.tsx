import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../helpers/context/Context';

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strAlcoholic: string;
};

function DrinkRecipe() {
  const { data } = useContext(Context);
  const [drink, setDrink] = useState<Drink | null>(null);
  const [meals, setMeals] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  let category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];
  if (category === 'drink') {
    category = 'cocktail';
  }

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((mealData) => setMeals(mealData.meals));
  }, []);

  useEffect(() => {
    if (data.length === 0 || currentPath.includes(`/drinks/${urlId}`)) {
      const fetchData = async () => {
        const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
        const response = await fetch(apiURL);
        const result = await response.json();
        console.log(result);
        setDrink(result.drinks[0]);
      };
      fetchData();
    } else {
      setDrink(data.drinks[0]);
    }
  }, [data, currentPath]);

  if (!drink) {
    return <div>Loading...</div>;
  }

  const getIngredients = (drinks: any) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i += 1) {
      const ingredient = drinks[`strIngredient${i}`];
      const measure = drinks[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const ingredients = drink ? getIngredients(drink) : [];

  return (
    <div>
      <div key={ drink.idDrink }>
        <h2
          data-testid="recipe-title"
        >
          {drink.strDrink}
        </h2>
        <h3>Category:</h3>
        <p
          data-testid="recipe-category"
        >
          {drink.strAlcoholic}
        </p>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
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
          {drink.strInstructions}
        </p>
      </div>
    </div>
  );
}

export default DrinkRecipe;
