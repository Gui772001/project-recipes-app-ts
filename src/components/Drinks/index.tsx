import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../helpers/context/Context';
import Footer from '../Footer';
import './index.css';
import FastButtons from '../FastButtons';

function Drinks() {
  const navigate = useNavigate();
  const { data, loading } = useContext(Context);

  useEffect(() => {
    if (data && data.drinks && data.drinks.length === 1) {
      const { idDrink } = data.drinks[0];
      navigate(`/drinks/${idDrink}`);
    }
  }, [data, loading, navigate]);

  function handleCard(idDrink: number) {
    navigate(`/drinks/${idDrink}`);
  }

  return (
    <>
      <div />
      <FastButtons location="/drinks" />
      <div>
        { data.drinks && data.drinks.length > 1
        && data.drinks.slice(0, 12).map((drink: any, index: number) => (
          <div
            key={ drink.strDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleCard(drink.idDrink) }
            onKeyDown={ (e) => e.key === 'Enter' && handleCard(drink.idDrink) }
            role="button"
            tabIndex={ 0 }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}
            </h2>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              style={ { width: '350px' } }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
        <div
          data-testid="footer"
          className="footer-css"
        >
          <Footer />
        </div>

      </div>
    </>
  );
}
export default Drinks;
