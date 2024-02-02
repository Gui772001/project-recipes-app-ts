import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Header from './components/Header';
import Provider from './helpers/context/Provider';
// import MealRecipe from './components/MealRecipe';
import Recipes from './components/Recipes';
// import DrinkRecipe from './components/DrinkRecipe';
import RecipeInProgress from './components/RecipeInProgress';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
          <Route path="/drinks/:id" element={ <RecipeDetails /> } />
          <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Routes>
      </Provider>
    </div>
  );
}
export default App;
