import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Meals from './components/Meals/Meals';
import Drinks from './components/drinks/Drinks';
import Profile from './components/profile/Profile';
import DoneRecipes from './components/doneRecipes/DoneRecipes';
import FavoriteRecipes from './components/favoriteRecipes/FavoriteRecipes';
import Header from './components/header/Header';
import Provider from './context/Provider';
import MealRecipe from './components/mealRecipe/MealRecipe';
import Recipes from './components/recipes/Recipes';
import DrinkRecipe from './components/drinkRecipe/DrinkRecipe';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/meals/:id" element={ <MealRecipe /> } />
          <Route path="/drinks/:id" element={ <DrinkRecipe /> } />
          <Route path="/meals/:id/in-progress" element={ <Meals /> } />
          <Route path="/drinks/:id/in-progress" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Routes>
      </Provider>
    </div>
  );
}
export default App;
