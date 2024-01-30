import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../helpers/context/Context';

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
};

function DrinkRecipe() {
  const { data } = useContext(Context);
  const [drink, setDrink] = useState<Drink | null>(null);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (data.length === 0 && currentPath !== '/meals' && currentPath !== '/drinks') {
      const fetchData = async () => {
        const pathSegments = currentPath.split('/');
        let category = pathSegments[1].slice(0, -1);
        const urlId = pathSegments[2];
        if (category === 'drink') {
          category = 'cocktail';
        }
        const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
        console.log(apiURL);
        const response = await fetch(apiURL);
        const result = await response.json();
        console.log(result);
        setDrink(result.drinks[0]);
      };
      fetchData();
    } else {
      setDrink(data.drinks[0]);
    }
  }, [data]);

  if (!drink) {
    return <div>Loading...</div>;
  }

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
