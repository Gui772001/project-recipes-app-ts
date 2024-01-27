import { useContext } from 'react';
import Context from '../context/Context';
import Footer from './Footer';

function Drinks() {
  const { foodDataDrinks } = useContext(Context);

  if (foodDataDrinks.length > 1) {
    return (
      <div>
        {foodDataDrinks.map((meal: any) => (
          <div key={ meal.idDrinks }>
            <h2>{meal.strDrink}</h2>
            <img
              src={ meal.strDrinkThumb }
              alt={ meal.strDrink }
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
export default Drinks;
