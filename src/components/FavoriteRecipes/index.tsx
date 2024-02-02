import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipeType } from '../../services/types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [copyLink, setCopyLink] = useState(false);
  const [filterFavoriteRecipe, setFilterFavoriteRecipe] = useState('all');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setRecipes(favoriteRecipes);
  }, []);

  const copyToClipboard = async (recipeName: string) => {
    const recipe = recipes.find((rec) => rec.name === recipeName);
    if (recipe) {
      const recipeType = recipe.type ? 'meal' : 'drink';
      const recipeLink = `${window.location.origin}/${recipeType}s/${recipe.id}`;

      try {
        await navigator.clipboard.writeText(recipeLink);
        setCopyLink(true);
      } catch (error) {
        console.log('Failed to copy link to clipboard:', error);
      }
    } else {
      console.log(`Recipe with name ${recipeName} not found`);
    }
  };

  const handleFilterBtn = (type: string) => {
    setFilterFavoriteRecipe(type);
  };

  const handleClick = (recipe: string) => {
    const RecFromLStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const update = RecFromLStorage.filter((rec: any) => rec.name !== recipe);
    console.log(update);
    localStorage.setItem('favoriteRecipes', JSON.stringify(update));
    setRecipes(update);
  };

  console.log(recipes);

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterBtn('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterBtn('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterBtn('drink') }
        >
          Drinks
        </button>
      </div>

      {recipes
        .filter(
          (recipe) => filterFavoriteRecipe === 'all'
          || recipe.type === filterFavoriteRecipe,
        )
        .map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <div id={ recipe.type === 'meal' ? 'meal-card' : 'drink-card' }>
                <img
                  src={ recipe.image }
                  alt={ recipe.id }
                  data-testid={ `${index}-horizontal-image` }
                  style={ { width: '100px' } }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
              </div>
            </Link>

            <div id={ recipe.type === 'meal' ? 'meal-card' : 'drink-card' }>
              <label htmlFor="">
                Nationality and category:
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              </label>
              <label htmlFor="">
                Done Date:
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
              </label>
              <label htmlFor="">
                { recipe.type === 'drink' && (
                  <>
                    Alcoholic or Not:
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {recipe.alcoholicOrNot}
                    </p>
                  </>
                ) }
              </label>
              <label htmlFor="">
                Tags:
                {recipe.tags?.slice(0, 2).map((tagName, i) => (
                  <span
                    key={ i }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </span>
                ))}
              </label>
              <button onClick={ () => copyToClipboard(recipe.name) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share-button"
                />
                {copyLink ? 'Link copied!' : 'Share recipe'}
              </button>
              <button onClick={ () => handleClick(recipe.name) }>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="black-heart"
                />
              </button>

            </div>
          </div>
        ))}
    </div>
  );
}
export default FavoriteRecipes;
