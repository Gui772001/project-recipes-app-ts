import React, { useContext } from 'react';
import Context from '../context/Context';
import Footer from './Footer';

function Meals() {
  const { foodData } = useContext(Context);

  if (foodData.meals.length >= 1) {
    return (
      <div>
        {foodData.meals.map((meal: any) => (
          <div key={ meal.idMeal }>
            <h2>{meal.strMeal}</h2>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              style={ { width: '350px' } }
            />
          </div>
        ))}
        <Footer />
      </div>
    );
  }
  return (
    <Footer />
  );
}
export default Meals;
