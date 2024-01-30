import React, { useContext } from 'react';

import Context from '../../helpers/context/Context';

function MealRecipe() {
  const { data } = useContext(Context);

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
