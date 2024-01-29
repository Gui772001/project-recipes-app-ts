import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Footer() {
  const navigate = useNavigate();

  const handleMealsClick = () => {
    navigate('/meals');
  };

  const handleDrinksClick = () => {
    navigate('/drinks');
  };

  return (
    <div className="container-footer">
      <h1>Footer</h1>
      <button
        onClick={ handleMealsClick }
      >
        <img
          src="./src/images/mealIcon.svg"
          alt="mealIcon"
          data-testid="meals-bottom-btn"
        />
      </button>
      <button
        onClick={ handleDrinksClick }
      >
        <img
          src="./src/images/drinkIcon.svg"
          alt="drinksIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </div>
  );
}

export default Footer;
