import React, { useContext, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Context from '../../helpers/context/Context';
import Footer from '../Footer';
import './index.css';
import FastButtons from '../FastButtons';
import RecipeDetails from '../RecipeDetails';

function Recipes() {
  const location = useLocation();
  const { idMeal, idDrink } = useParams<{ idMeal: string, idDrink: string }>();
  const navigate = useNavigate();
  const { data, loading, filter } = useContext(Context);

  useEffect(() => {
    if (location.pathname === '/meals' && data && data.meals && data.meals.length === 1
      && filter.radio !== 'categories') {
      const mealsId = data.meals[0].idMeal;
      navigate(`/meals/${mealsId}`);
    } else if (location.pathname === '/drinks'
    && data && data.drinks && data.drinks.length === 1) {
      const drinksId = data.drinks[0].idDrink;
      navigate(`/drinks/${drinksId}`);
    }
  }, [data, loading, filter.radio, location.pathname, navigate]);

  function handleCard(id: number, type: string) {
    navigate(`/${type}/${id}`);
  }

  return (
    <>
      <div>
        <FastButtons location={ location.pathname } />
      </div>
      <div>
        {location.pathname === '/meals' && data.meals
          && data.meals.slice(0, 12).map((meal: any, index: number) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleCard(meal.idMeal, 'meals') }
              onKeyDown={ (e) => e.key === 'Enter' && handleCard(meal.idMeal, 'meals') }
              role="button"
              tabIndex={ 0 }
            >
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                style={ { width: '350px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))}
        {location.pathname === '/drinks' && data.drinks && data.drinks.length > 1
          && data.drinks.slice(0, 12).map((drink: any, index: number) => (
            <div
              key={ drink.strDrink }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleCard(drink.idDrink, 'drinks') }
              onKeyDown={ (e) => e.key === 'Enter'
              && handleCard(drink.idDrink, 'drinks') }
              role="button"
              tabIndex={ 0 }
            >
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                style={ { width: '350px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))}
      </div>
      <div data-testid="footer" className="footer-css">
        <Footer />
      </div>
      {location.pathname === `/meals/${idMeal}` && <RecipeDetails />}
      {location.pathname === `/drinks/${idDrink}` && <RecipeDetails />}
    </>
  );
}

export default Recipes;
