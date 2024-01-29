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
