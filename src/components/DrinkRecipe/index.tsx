// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Context from '../../helpers/context/Context';
// import shareIcon from '../../images/shareIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import { FavRecipesType, Drink } from '../../services/types';

// function DrinkRecipe() {
//   const { data, btnRecipeText, setBtnRecipeText } = useContext(Context);
//   const [drink, setDrink] = useState<Drink>({} as Drink);
//   const [meals, setMeals] = useState([]);
//   const [favorite, setFavorite] = useState(false);
//   const [copyLink, setCopyLink] = useState(false);
//   const [favoriteRecipes, setFavoriteRecipes] = useState<FavRecipesType[]>([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const pathSegments = currentPath.split('/');
//   let category = pathSegments[1].slice(0, -1);
//   const urlId = pathSegments[2];
//   if (category === 'drink') {
//     category = 'cocktail';
//   }

//   useEffect(() => {
//     const favoriteRecipesString = localStorage.getItem('favoriteRecipes');
//     if (favoriteRecipesString) {
//       const favoriteRecipesList = (JSON.parse(favoriteRecipesString));
//       setFavoriteRecipes(favoriteRecipesList);
//       const isFavorite = favoriteRecipesList
//         .some((recipe: FavRecipesType) => recipe.id === urlId);
//       setFavorite(isFavorite);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
//   }, [favoriteRecipes]);

//   useEffect(() => {
//     const startBtnStateString = localStorage.getItem('inProgressRecipes');
//     if (startBtnStateString !== null) {
//       const startBtnState = JSON.parse(startBtnStateString);
//       const keys = Object.keys(startBtnState.drinks);
//       const resultBtn = keys.includes(urlId);
//       if (resultBtn) {
//         setBtnRecipeText('Continue Recipes');
//       }
//     }

//     fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
//       .then((response) => response.json())
//       .then((mealData) => setMeals(mealData.meals));
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiURL = `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${urlId}`;
//       const response = await fetch(apiURL);
//       const result = await response.json();
//       setDrink(result.drinks[0]);
//     };

//     if (data.length === 0 || currentPath.includes(`/drinks/${urlId}`)) {
//       fetchData();
//     } else {
//       setDrink(data.drinks[0]);
//     }
//   }, [data, currentPath]);

//   if (!drink) {
//     return <div>Loading...</div>;
//   }

//   const getIngredients = (drinks: any) => {
//     const ingredients = [];
//     for (let i = 1; i <= 15; i += 1) {
//       const ingredient = drinks[`strIngredient${i}`];
//       const measure = drinks[`strMeasure${i}`];
//       if (ingredient) {
//         ingredients.push(`${ingredient} - ${measure}`);
//       }
//     }
//     return ingredients;
//   };

//   const ingredients = getIngredients(drink);

//   const handleButtonStart = () => {
//     const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
//     const inProgressRecipes = inProgressRecipesString
//       ? JSON.parse(inProgressRecipesString)
//       : { drinks: {}, meals: {} };
//     inProgressRecipes.drinks[urlId] = [];

//     localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
//     setBtnRecipeText('Continue Recipes');

//     navigate(`/drinks/${urlId}/in-progress`);
//   };

//   const handleDrinkFavorite = () => {
//     setFavorite((prevFavorite) => {
//       const newFavoriteStatus = !prevFavorite;
//       if (newFavoriteStatus) {
//         setFavoriteRecipes((prevFavorites: FavRecipesType[]) => [
//           ...prevFavorites,
//           {
//             id: drink.idDrink,
//             type: 'drink',
//             nationality: drink.strArea || '',
//             category: drink.strCategory,
//             alcoholicOrNot: drink.strAlcoholic || '',
//             name: drink.strDrink,
//             image: drink.strDrinkThumb,
//           },
//         ]);
//       } else {
//         setFavoriteRecipes((prevFavorites) => prevFavorites
//           .filter((recipe) => recipe.id !== drink.idDrink));
//       }
//       return newFavoriteStatus;
//     });
//   };

//   const copyClipboard = async () => {
//     const recipeType = location.pathname.split('/')[1].slice(0, -1);
//     const recipeId = location.pathname.split('/')[2];
//     const recipeLink = `${window.location.origin}/${recipeType}s/${recipeId}`;
//     console.log(recipeLink);
//     try {
//       await navigator.clipboard.writeText(recipeLink);
//       setCopyLink(true);
//     } catch (error) {
//       console.log('Failed to copy link to clipboard:', error);
//     }
//   };

//   return (
//     <div>
//       <div key={ drink.idDrink }>
//         <h2 data-testid="recipe-title">{drink.strDrink}</h2>
//         <h3>Category:</h3>
//         <p data-testid="recipe-category">{drink.strAlcoholic}</p>
//         <img
//           src={ drink.strDrinkThumb }
//           alt={ drink.strDrink }
//           style={ { width: '350px' } }
//           data-testid="recipe-photo"
//         />
//         <h3>Ingredients:</h3>
//         <ul>
//           {ingredients.map((ingredient, index) => (
//             <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
//               {ingredient}
//             </li>
//           ))}
//         </ul>
//         <h3>Instructions:</h3>
//         <p data-testid="instructions">{drink.strInstructions}</p>
//         <button type="button" data-testid="share-btn" onClick={ copyClipboard }>
//           <img src={ shareIcon } alt="share" />
//         </button>
//         {copyLink && <p>Link copied!</p>}
//         <button type="button" onClick={ handleFavorite }>
//           <img
//             src={ favorite ? blackHeartIcon : whiteHeartIcon }
//             alt={ favorite ? 'black-heart' : 'white-heart' }
//             data-testid="favorite-btn"
//           />
//         </button>
//         <h3>Recomended Meals:</h3>
//         <div style={ { display: 'flex', overflowX: 'auto' } }>
//           {meals.slice(0, 6).map((meal: any, index) => (
//             <div key={ index } data-testid={ `${index}-recommendation-card` }>
//               <h2 data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</h2>
//               <img
//                 src={ meal.strMealThumb }
//                 alt={ meal.strMeal }
//                 style={ { width: '250px' } }
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         type="button"
//         data-testid="start-recipe-btn"
//         style={ { position: 'fixed', bottom: '0', left: '0', width: '100%' } }
//         onClick={ handleButtonStart }
//         value={ btnRecipeText }
//       >
//         {`${btnRecipeText}`}
//       </button>
//     </div>
//   );
// }

// export default DrinkRecipe;
