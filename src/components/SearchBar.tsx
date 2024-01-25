function SearchBar() {
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
                />
            </label>
            <label htmlFor="ingredient"> Ingredient
                <input
                    title="ingredient"
                    type="radio"
                    name="ingredient"
                    data-testid="ingredient-search-radio"
                />
            </label>
            <label htmlFor="name"> Name
                <input
                    title="name"
                    type="radio"
                    name="name"
                    data-testid="name-search-radio"
                />
            </label>
            <label htmlFor="first-letter"> First letter
                <input
                    title="first-letter"
                    type="radio"
                    name="first-letter"
                    data-testid="first-letter-search-radio"
                />
            </label>
            <button
                type="submit"
                title="search"
                data-testid="exec-search-btn"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
