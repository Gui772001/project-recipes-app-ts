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

export const handleLocalStorage = (
  key: string,
  setter: React.Dispatch<React.SetStateAction<any>>,
) => {
  const item = localStorage.getItem(key);
  if (item) {
    const parsedItem = JSON.parse(item);
    setter(parsedItem);
  }
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const copyClipboard = async (location: any, setCopyLink: any) => {
  const urlType = location.pathname.split('/')[1].slice(0, -1);
  const recipeId = location.pathname.split('/')[2];
  const recipeLink = `${window.location.origin}/${urlType}s/${recipeId}`;
  try {
    await navigator.clipboard.writeText(recipeLink);
    setCopyLink(true);
  } catch (error) {
    console.log('Failed to copy link to clipboard:', error);
  }
};
