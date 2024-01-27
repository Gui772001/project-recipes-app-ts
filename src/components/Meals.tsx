import React, { useContext } from 'react';
import Context from '../context/Context';
import Footer from './Footer';

function Meals() {
  const { foodData } = useContext(Context);
  // console.log(foodData);
  // console.log(foodData.length);

  if (foodData.length >= 1) {
    // console.log('teste');
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
        <Footer />
      </div>
    );
  }
  return (
    <Footer />
  );
}
export default Meals;
