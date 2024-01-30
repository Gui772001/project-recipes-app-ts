import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import Context from '../../helpers/context/Context';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

function MealRecipe() {
  const { data } = useContext(Context);
  const [meal, setMeal] = useState<Meal | null>(null);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (data.length === 0 && currentPath !== '/meals' && currentPath !== '/drinks') {
      const fetchData = async () => {
        const pathSegments = currentPath.split('/');
        const category = pathSegments[1].slice(0, -1);
        const urlId = pathSegments[2];
        const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
        console.log(apiURL);
        const response = await fetch(apiURL);
        const result = await response.json();
        console.log(result);
        setMeal(result.meals[0]);
      };
      fetchData();
    } else {
      setMeal(data.meals[0]);
    }
  }, [data]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div key={ meal.idMeal }>
        <h2>{meal.strMeal}</h2>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          style={ { width: '350px' } }
        />
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
}

export default MealRecipe;
