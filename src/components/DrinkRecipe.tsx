import React, { useContext } from 'react';
import Context from '../context/Context';

function DrinkRecipe() {
  const { foodDataDrinks } = useContext(Context);
  if (foodDataDrinks.length === 1) {
    return (
      <div>
        {foodDataDrinks.map((drink: any) => (
          <div key={ drink.idcocktail }>
            <h2>{drink.strcocktail}</h2>
            <img
              src={ drink.strcocktailThumb }
              alt={ drink.strcocktail }
              style={ { width: '350px' } }
            />
            <p>{drink.strInstructions}</p>
          </div>
        ))}
        ;
      </div>
    );
  }
}

export default DrinkRecipe;
