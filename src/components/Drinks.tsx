import { useContext } from 'react';
import Context from '../context/Context';
import Footer from './Footer';

function Drinks() {
  const { drinkData } = useContext(Context);
  console.log(drinkData);

  if (drinkData.length > 1) {
    return (
      <div>
        {drinkData.map((meal: any) => (
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
