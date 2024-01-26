import React, { useContext } from 'react';
import Context from '../context/Context';

function Meals() {
  const { foodData } = useContext(Context);

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
        </div>
      ))}
    </div>
  );
}

export default Meals;
