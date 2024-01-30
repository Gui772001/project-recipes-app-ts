// export const fetchFood = async (filter: string) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}`);
//   const data = await response.json();
//   console.log(data);
//   return (data.meals);
// };

// export const fetchDrinks = async (filter: string) => {
//   const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}`);
//   const data = await response.json();
//   return (data.drinks);
// };

export const fetchFoodForButtons = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return (data.meals);
};

export const fetchDrinksForButtons = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return (data.drinks);
};
