import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import Footer from '../footer/Footer';
import './index.css';

function Meals() {
  const navigate = useNavigate();
  const { data, loading } = useContext(Context);
  console.log(data);

  useEffect(() => {
    if (data && data.meals && data.meals.length === 1) {
      const { idMeal } = data.meals[0];
      navigate(`/meals/${idMeal}`);
    }
  }, [data, loading, navigate]);

  return (

    <div>
      <div>
        { data.meals && data.meals.length > 1
        && data.meals.slice(0, 12).map((meal: any, index: number) => (
          <div
            key={ meal.idMeal }
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
    </div>
  );
}
export default Meals;
