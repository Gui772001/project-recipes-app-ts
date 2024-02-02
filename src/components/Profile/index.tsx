import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

function Profile() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    const userJSON = localStorage.getItem('user');
    const newUser = userJSON ? JSON.parse(userJSON) : null;
    const email = newUser ? newUser.email : null;
    setUser(email);
  };

  const handleClick = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1 data-testid="profile-email">
        {' '}
        {`Olá ${user}`}
      </h1>
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout
      </button>
      <div
        className="footer-css"
        data-testid="footer"
      >

        <Footer
          data-testid="footer"
        />
      </div>
    </>
  );
}

export default Profile;
