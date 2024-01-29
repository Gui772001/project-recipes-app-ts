function buildURL(filter: any, pathname: any) {
  const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const DRINK_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const INGREDIENT = `filter.php?i=${filter.input}`;
  const NAME = `search.php?s=${filter.input}`;
  const FIRST_LETTER = `search.php?f=${filter.input}`;
  const SEARCH_DEFAULT = 'search.php?s=';

  const MEALS = pathname === '/meals';

  let apiURL = '';
  console.log(filter.radio);
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
      apiURL = `${MEALS ? FOOD_API_URL : DRINK_API_URL}${SEARCH_DEFAULT}`;
      break;
  }

  return apiURL;
}

export default buildURL;
