export const fetchFood = async (filter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}`);
  const data = await response.json();
  return (data.meals);
};

export const fetchDrinks = async (filter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}`);
  const data = await response.json();
  return (data.drinks);
};
