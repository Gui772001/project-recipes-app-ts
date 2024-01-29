import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../searchBar/SearchBar';
import { getPageTitle } from '../../services/functions';
import './index.css';

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
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
          className="img-search-button"
        />
      </Link>

      {isSearchPage && (
        <button
          onClick={ handleToggle }
          className="search-button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        </button>
      )}
      <div>
        {searchBar && (
          <SearchBar />
        )}
      </div>
    </header>
  );
}

export default Header;
