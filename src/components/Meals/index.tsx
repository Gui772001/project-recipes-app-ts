import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../helpers/context/Context';
import Footer from '../Footer';
import './index.css';
import FastButtons from '../FastButtons';

function Meals() {
  const navigate = useNavigate();
  const { data, loading } = useContext(Context);

  useEffect(() => {
    if (data && data.meals && data.meals.length === 1) {
      const { idMeal } = data.meals[0];
      navigate(`/meals/${idMeal}`);
    }
  }, [data, loading, navigate]);

  return (
    <>
      <div>
        <FastButtons location="/meals" />
      </div>
      <div>
        { data.meals && data.meals.length > 1
        && data.meals.slice(0, 12).map((meal: any, index: number) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}
            </h2>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              style={ { width: '350px' } }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      <div
        data-testid="footer"
        className="footer-css"
      >
        <Footer />
      </div>
    </>
  );
}
export default Meals;
