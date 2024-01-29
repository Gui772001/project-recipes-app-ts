import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';

function DrinkRecipe() {
  const navigate = useNavigate();

  const { data } = useContext(Context);

  if (!data.drinks || data.drinks.length !== 1) {
    navigate('/drinks');
    return null;
  }

  const drink = data.drinks[0];

  return (
    <div>
      <div key={ drink.idDrink }>
        <h2>{drink.strDrink}</h2>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          style={ { width: '350px' } }
        />
        <p>{drink.strInstructions}</p>
      </div>
    </div>
  );
}

export default DrinkRecipe;
