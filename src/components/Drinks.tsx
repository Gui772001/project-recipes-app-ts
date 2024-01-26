import { useContext } from "react";
import Context from "../context/Context";

function Drinks() {
  const { foodDataDrinks, setFoodDataDrinks } = useContext(Context);
  return (
    <div>
      {foodDataDrinks.map((meal: any) => (
        <div key={ meal.idDrinks }>
          <h2>{meal.strDrink}</h2>
          <img
            src={ meal.strDrinkThumb }
            alt={ meal.strDrink}
          />
        </div>
      ))}
    </div>
  );
}
export default Drinks;
