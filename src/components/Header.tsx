import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { useState } from 'react';

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
        <img data-testid="profile-top-btn" src={profileIcon} alt="Profile Icon" />
      </Link>

      {isSearchPage && (
        <Link to="/search">
          <button
            data-testid="search-top-btn"
            onClick={handleToggle}
          >
            <img src={searchIcon} alt="Search Icon" />
          </button>
        </Link>
      )}
      <div>
        {searchBar && (
          <div>
            <label htmlFor="search">
              <input
                title="search"
                type="text"
                name="search"
                id="search"
                data-testid="search-input"
                placeholder="Search"
              />
            </label>
          </div>
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
    default:
      return 'Título';
  }
};

export default Header;
