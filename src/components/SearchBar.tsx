import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

function SearchBar() {
  const navigate = useNavigate();
  const { inputValue, setInputValue } = useContext(Context);
  const { setFilter } = useContext(Context);
  const { selectedRadio, setSelectedRadio } = useContext(Context);
  const selectedFirstLetter = (selectedRadio === 'first-letter');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLElement>) => {
    setSelectedRadio(event.target.title);
  };

  const handleSubmit = () => {
    if (selectedRadio === 'ingredient') {
      setFilter(`filter.php?i=${inputValue}`);
    } else if (selectedRadio === 'name') {
      setFilter(`search.php?s=${inputValue}`);
    } else if (selectedFirstLetter
      && inputValue.length < 2) {
      setFilter(`search.php?f=${inputValue}`);
    } else if (selectedFirstLetter
    && inputValue.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
    navigate('/meals', { replace: true });
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          title="search"
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          placeholder="Search"
          onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="ingredient">
        {' '}
        Ingredient
        <input
          title="ingredient"
          type="radio"
          name="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="name">
        {' '}
        Name
        <input
          title="name"
          type="radio"
          name="name"
          data-testid="name-search-radio"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="first-letter">
        {' '}
        First letter
        <input
          title="first-letter"
          type="radio"
          name="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ handleRadioChange }
        />
      </label>
      <button
        type="submit"
        title="search"
        data-testid="exec-search-btn"
        onClick={ handleSubmit }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
