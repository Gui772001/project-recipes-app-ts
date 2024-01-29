import { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { InitialFilterType } from '../../services/types';

function SearchBar() {
  const { setFilter, initialfilter } = useContext(Context);
  const [selectedFilter, setSelectedFilter] = useState<InitialFilterType>(initialfilter);

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSelectedFilter((prevFilter: InitialFilterType) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  useEffect(() => {
  }, []);

  const handleSubmit = () => {
    if (selectedFilter.input.length > 1
      && selectedFilter.radio === 'first-letter') {
      return window.alert('Your search must have only 1 (one) character');
    }
    setFilter(selectedFilter);
    setSelectedFilter(initialfilter);
  };

  return (
    <div>
      <label htmlFor="input">
        <input
          title="search"
          type="text"
          name="input"
          data-testid="search-input"
          placeholder="Search"
          value={ selectedFilter.input }
          onChange={ radioChange }
        />
      </label>
      <label htmlFor="radio">
        {' '}
        Ingredient
        <input
          title="ingredient"
          type="radio"
          name="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ selectedFilter.radio === 'ingredient' }
          onChange={ radioChange }
        />
      </label>
      <label htmlFor="radio">
        {' '}
        Name
        <input
          title="name"
          type="radio"
          name="radio"
          value="name"
          data-testid="name-search-radio"
          checked={ selectedFilter.radio === 'name' }
          onChange={ radioChange }
        />
      </label>
      <label htmlFor="radio">
        {' '}
        First letter
        <input
          title="first-letter"
          type="radio"
          name="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ selectedFilter.radio === 'first-letter' }
          onChange={ radioChange }
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
