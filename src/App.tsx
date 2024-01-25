import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Header from './components/Header';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/meals/:id" element={ <Meals /> } />
          <Route path="/drinks/:id" element={ <Drinks /> } />
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
