import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InitialFilterType } from '../../services/types';

function useFetch(filter: InitialFilterType) {
  const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const DRINK_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const INGREDIENT = `filter.php?i=${filter.input}`;
  const NAME = `search.php?s=${filter.input}`;
  const FIRST_LETTER = `search.php?f=${filter.input}`;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;
  const MEALS = currentPath === '/meals';

  useEffect(() => {
    const fetchData = async () => {
      let apiURL = '';
      switch (filter.radio) {
        case 'ingredient':
          apiURL = `${MEALS ? FOOD_API_URL : DRINK_API_URL}${INGREDIENT}`;
          break;
        case 'name':
          apiURL = `${MEALS ? FOOD_API_URL : DRINK_API_URL}${NAME}`;
          break;
        case 'first-letter':
          apiURL = `${MEALS ? FOOD_API_URL : DRINK_API_URL}${FIRST_LETTER}`;
          break;
        default:
          break;
      }
      const response = await fetch(apiURL);
      const result = await response.json();
      if (result === null) {
        window.alert("Sorry, we haven't found any recipes for these filters");
      }
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  return { data, loading };
}

export default useFetch;
