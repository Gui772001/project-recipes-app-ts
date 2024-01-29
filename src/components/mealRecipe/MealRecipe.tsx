import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';

function MealRecipe() {
  const navigate = useNavigate();

  const { data } = useContext(Context);

  if (!data.meals || data.meals.length !== 1) {
    navigate('/meals');
    return null;
  }

  const meal = data.meals[0];

  return (
    <div>
      <div key={ meal.idMeal }>
        <h2>{meal.strMeal}</h2>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          style={ { width: '350px' } }
        />
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
}

export default MealRecipe;
