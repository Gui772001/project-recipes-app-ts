import { useContext } from 'react';
import Context from '../../helpers/context/Context';

function FastButtons(props: { location: string }) {
  const { location } = props;
  const { setFilter } = useContext(Context);

  const handleClick = (name:string) => {
    if (name === 'all') {
      setFilter({
        input: '',
        radio: '',
      });
    } else {
      setFilter({
        input: name,
        radio: 'categories',
      });
    }
  };

  switch (location) {
    case '/meals': {
      return (
        <>
          <button
            data-testid="all-category-filter"
            onClick={ () => handleClick('all') }
            name="all"
            value="all"
          >
            All
          </button>
          <button
            data-testid="Beef-category-filter"
            onClick={ () => handleClick('Beef') }
            name="Beef"
            value="Beef"
          >
            Beef
          </button>
          <button
            data-testid="Breakfast-category-filter"
            onClick={ () => handleClick('Breakfast') }
            name="Breakfast"
            value="Breakfast"
          >
            Breakfast
          </button>
          <button
            data-testid="Chicken-category-filter"
            onClick={ () => handleClick('Chicken') }
            name="Chicken"
            value="Chicken"
          >
            Chicken
          </button>
          <button
            data-testid="Dessert-category-filter"
            onClick={ () => handleClick('Dessert') }
            name="Dessert"
            value="Dessert"
          >
            Dessert
          </button>
          <button
            data-testid="Goat-category-filter"
            onClick={ () => handleClick('Goat') }
            name="Goat"
            value="Goat"
          >
            Goat
          </button>
        </>
      );
      break;
    }
    case '/drinks':
      return (
        <>
          <button
            data-testid="all-category-filter"
            onClick={ () => handleClick('all') }
            name="all"
            value="all"
          >
            All
          </button>
          <button
            data-testid="Ordinary Drink-category-filter"
            onClick={ () => handleClick('Ordinary Drink') }
            name="Ordinary Drink"
            value="Ordinary Drink"
          >
            Ordinary Drink
          </button>
          <button
            data-testid="Cocktail-category-filter"
            onClick={ () => handleClick('Cocktail') }
            name="Cocktail"
            value="Cocktail"
          >
            Cocktail
          </button>
          <button
            data-testid="Shake-category-filter"
            onClick={ () => handleClick('Shake') }
            name="Shake"
            value="Shake"
          >
            Shake
          </button>
          <button
            data-testid="Other/Unknown-category-filter"
            onClick={ () => handleClick('Other/Unknown') }
            name="Other/Unknown"
            value="Other/Unknown"
          >
            Other/Unknown
          </button>
          <button
            data-testid="Cocoa-category-filter"
            onClick={ () => handleClick('Cocoa') }
            name="Cocoa"
            value="Cocoa"
          >
            Cocoa
          </button>
        </>
      );
    default: {
      return <h1>Nothing to see here.</h1>;
    }
  }
}
export default FastButtons;
