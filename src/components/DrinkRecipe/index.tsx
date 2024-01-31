import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../../helpers/context/Context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strAlcoholic: string;
};

function DrinkRecipe() {
  const { data, btnRecipeText, setBtnRecipeText } = useContext(Context);
  const [drink, setDrink] = useState<Drink | null>(null);
  const [meals, setMeals] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  let category = pathSegments[1].slice(0, -1);
  const urlId = pathSegments[2];
  if (category === 'drink') {
    category = 'cocktail';
  }

  useEffect(() => {
    const startBtnStateString = localStorage.getItem('inProgressRecipes');
    // Verifica se há um valor existente e faz o parsing
    if (startBtnStateString !== null) {
      const startBtnState = JSON.parse(startBtnStateString);
      const keys = Object.keys(startBtnState.drinks);
      const resultBtn = keys.includes(urlId);
      if (resultBtn) {
        setBtnRecipeText('Continue Recipes');
      }
    }

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

  const handleButtonStart = () => {
    // Recupera o valor atual no localStorage
    const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
    // Verifica se há um valor existente e faz o parsing
    const inProgressRecipes = inProgressRecipesString
      ? JSON.parse(inProgressRecipesString)
      : { drinks: {}, meals: {} };
    // inProgressRecipes[/* tipo-da-receita */][/* id-da-receita */] = [/* lista-de-ingredientes-utilizados */];
    inProgressRecipes.drinks[urlId] = ['dwaipjsad', '21313', 'dkwlw'];
    // Salva o objeto atualizado no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setBtnRecipeText('Continue Recipes');

    navigate(`/drinks/${urlId}/in-progress`);
  };

  const handleClick = () => {
    setFavorite((prevFavorite) => !prevFavorite);
  };

  const copyClipboard = async () => {
    const recipeLink = `${window.location.origin}/drinks/${drink.idDrink}`;
    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopyLink(true);
    } catch (error) {
      console.log('Failed to copy link to clipboard:', error);
    }
  };

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
        <button
          type="button"
          data-testid="share-btn"
          // style={ { position: 'fixed', bottom: '10', left: '20', width: '100%' } }
          onClick={ copyClipboard }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        { copyLink && (<p>Link copied!</p>)}
        <button
          type="button"
          data-testid="favorite-btn"
          // style={ { position: 'fixed', bottom: '20', left: '0', width: '100%' } }
          onClick={ handleClick }
        >
          <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="white-heart" />
        </button>
        <h3>Recomended Meals:</h3>
        <div
          style={ {
            display: 'flex',
            overflowX: 'auto' } }
        >
          {meals.slice(0, 6).map((meal: any, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {meal.strMeal}
              </h2>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
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
        onClick={ handleButtonStart }
        value={ btnRecipeText }
      >
        {`${btnRecipeText}`}
      </button>
    </div>
  );
}

export default DrinkRecipe;
