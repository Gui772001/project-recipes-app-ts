import React, { useContext } from 'react';
import Context from '../context/Context';

function MealRecipe() {
  const { foodData } = useContext(Context);
  if (foodData.length === 1) {
    return (
      <div>
        {foodData.map((meal: any) => (
          <div key={ meal.idMeal }>
            <h2>{meal.strMeal}</h2>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              style={ { width: '350px' } }
            />
            <p>{meal.strInstructions}</p>
          </div>
        ))}
        ;
      </div>
    );
  }
}

export default MealRecipe;
