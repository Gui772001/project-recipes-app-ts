function FastButtons(props: { location: string }) {
  const { location } = props;

  switch (location) {
    case '/meals': {
      return (
        <>
          <button data-testid="Beef-category-filter"> Beef </button>
          <button data-testid="Breakfast-category-filter"> Breakfast </button>
          <button data-testid="Chicken-category-filter"> Chicken </button>
          <button data-testid="Dessert-category-filter"> Dessert </button>
          <button data-testid="Goat-category-filter"> Goat </button>
        </>
      );
      break;
    }
    case '/drinks':
      return (
        <>
          <button data-testid="Ordinary Drink-category-filter"> Ordinary Drink </button>
          <button data-testid="Cocktail-category-filter"> Cocktail </button>
          <button data-testid="Shake-category-filter"> Shake </button>
          <button data-testid="Other/Unknown-category-filter"> Other/Unknown </button>
          <button data-testid="Cocoa-category-filter"> Cocoa </button>
        </>
      );
    default: {
      return <h1>Nothing to see here.</h1>;
    }
  }
}
export default FastButtons;
