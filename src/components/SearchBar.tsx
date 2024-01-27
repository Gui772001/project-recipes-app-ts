import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { fetchDrinks, fetchFood } from '../services/FetchData';

function SearchBar() {
  const navigate = useNavigate();
  const { inputValue,
    setInputValue,
    filter,
    setFilter,
    setFoodData,
    setDrinkData,
    selectedRadio,
    setSelectedRadio,
  } = useContext(Context);

  const selectedFirstLetter = (selectedRadio === 'first-letter');

  const location = useLocation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLElement>) => {
    setSelectedRadio(event.target.title);
  };

  const defineFilters = () => {
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
  };

  const handleMealsNavigation = useCallback(async () => {
    const fetchFoodResult = await fetchFood(filter);
    setFoodData(fetchFoodResult);
    if (fetchFoodResult.length > 1) {
      navigate('/meals');
    } else if (fetchFoodResult.length === 1) {
      const { idMeal } = fetchFoodResult[0];
      navigate(`/meals/${idMeal}`);
    } else if (fetchFoodResult.length === 0) {
      return window.alert(
        "Sorry, we haven't found any recipes for these filters",
      );
    }
  }, [filter, setFoodData, navigate]);

  const handleDrinksNavigation = useCallback(async () => {
    const fetchDrinksResult = await fetchDrinks(filter);
    setDrinkData(fetchDrinksResult);
    if (fetchDrinksResult.length > 1) {
      navigate('/drinks');
    } else if (fetchDrinksResult.length === 1) {
      const { idcocktail } = fetchDrinksResult[0];
      navigate(`/drinks/${idcocktail}`);
    } else if (fetchDrinksResult.length === 0) {
      return window.alert(
        "Sorry, we haven't found any recipes for these filters",
      );
    }
  }, [filter, setDrinkData, navigate]);

  useEffect(() => {
    handleDrinksNavigation();
  }, [handleDrinksNavigation]);

  useEffect(() => {
    handleMealsNavigation();
  }, [handleMealsNavigation]);

  // const handleDrinksNavigation = async () => {
  //   const fetchDrinksResult = await fetchDrinks(filter);
  //   if (fetchDrinksResult.length > 1) {
  //     navigate('/drinks');
  //   } else if (fetchDrinksResult.length === 1) {
  //     const { idcocktail } = fetchDrinksResult[0];
  //     navigate(`/drinks/${idcocktail}`);
  //   } else if (fetchDrinksResult.length === 0) {
  //     return window.alert(
  //       "Sorry, we haven't found any recipes for these filters",
  //     );
  //   }
  // };

  const handleSubmit = () => {
    defineFilters();
    if (location.pathname === '/meals') {
      handleMealsNavigation();
    } else if (location.pathname === '/drinks') {
      handleDrinksNavigation();
    }
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
          name="select-radio"
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
          name="select-radio"
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
          name="select-radio"
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
