import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import MealRecipe from './MealRecipe';

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
