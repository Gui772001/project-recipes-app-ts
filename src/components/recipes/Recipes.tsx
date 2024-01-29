import { useLocation, useParams } from 'react-router-dom';
import Meals from '../Meals/Meals';
import Drinks from '../drinks/Drinks';
import MealRecipe from '../mealRecipe/MealRecipe';
import DrinkRecipe from '../drinkRecipe/DrinkRecipe';

function Recipes() {
  const location = useLocation();
  const { idMeal, idDrink } = useParams<{ idMeal: string, idDrink: string, }>();
  if (location.pathname === '/meals') {
    return (
      <Meals />
    );
  } if (location.pathname === '/drinks') {
    return (
      <Drinks />
    );
  } if (location.pathname === `/meals/${idMeal}`) {
    return (
      <MealRecipe />
    );
  } if (location.pathname === `/drinks/${idDrink}`) {
    return (
      <DrinkRecipe />
    );
  }
}

export default Recipes;
