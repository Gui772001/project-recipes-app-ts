import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import Footer from '../footer/Footer';
import './index.css';

function Drinks() {
  const navigate = useNavigate();
  const { data, loading } = useContext(Context);
  console.log(data);

  useEffect(() => {
    if (data && data.drinks && data.drinks.length === 1) {
      const { idDrink } = data.drinks[0];
      navigate(`/drinks/${idDrink}`);
    }
  }, [data, loading, navigate]);

  return (
    <div>
      { data.drinks && data.drinks.length > 1
        && data.drinks.map((drink: any) => (
          <div key={ drink.strDrink }>
            <h2>{drink.strDrink}</h2>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              style={ { width: '350px' } }
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
  );
}
export default Drinks;
