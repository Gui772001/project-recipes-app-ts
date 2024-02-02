import React, { useState, useEffect } from 'react';
import { RecipeType } from '../../services/types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [copyLink, setCopyLink] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setRecipes(doneRecipes);
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

  console.log(recipes);

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {recipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.id }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100px' } }
          />
          <h2
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </h2>
          {recipe.type === 'meal' ? (
            <div id="meal-card">
              <label htmlFor="">
                Nationality and category:
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              </label>
              <label htmlFor="">
                Done Date:
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
              </label>
              <label htmlFor="">
                Tags:
                {recipe.tags?.slice(0, 2).map((tagName, i) => (
                  <span
                    key={ i }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </span>))}
              </label>
              <button
                onClick={ () => copyToClipboard(recipe.name) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share-button"
                />
                {copyLink ? 'Link copied!' : 'Share recipe' }
              </button>
            </div>
          ) : (
            <div id="drink-card">
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <button
                onClick={ () => copyToClipboard(recipe.name) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share-button"
                />
                {copyLink ? 'Link copied!' : 'Share recipe' }
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
