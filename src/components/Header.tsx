import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const isSearchPage = ['/meals', '/drinks'].includes(location.pathname);

  return (
    <header>
      <h1 data-testid="page-title">{getPageTitle(location.pathname)}</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>

      {isSearchPage && (
        <Link to="/pagina-com-pesquisa">
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />
        </Link>
      )}
    </header>
  );
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Título';
  }
};

export default Header;
