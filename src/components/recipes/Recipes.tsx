import { useLocation, useParams } from 'react-router-dom';
import Meals from '../Meals/Meals';
import Drinks from '../drinks/Drinks';
import MealRecipe from '../mealRecipe/MealRecipe';

function Recipes() {
  const location = useLocation();
  const { idMeal } = useParams<{ idMeal: string }>();
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
  }
}

export default Recipes;
