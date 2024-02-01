export const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    case '/search':
      return 'Search';
    default:
      return 'Título';
  }
};

export const fetchById = async (id: string, category: string) => {
  const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(apiURL);
  const result = await response.json();
  return result;
};
