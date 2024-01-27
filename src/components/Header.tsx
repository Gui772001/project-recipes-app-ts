import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const location = useLocation();
  const isSearchPage = ['/meals', '/drinks'].includes(location.pathname);

  function handleToggle() {
    setSearchBar((prev) => !prev);
  }

  return (
    <header>
      <h1 data-testid="page-title">{getPageTitle(location.pathname)}</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>

      {isSearchPage && (
        <button onClick={ handleToggle }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        </button>
      // </Link>
      )}
      <div>
        {searchBar && (
          <SearchBar />
        )}
      </div>
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
    case '/search':
      return 'Search';
    default:
      return 'Título';
  }
};

export default Header;
