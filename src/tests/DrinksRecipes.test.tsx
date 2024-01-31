import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('drinksRecipe', () => {
  it('Verifica se ao clicar em uma comida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = await screen.findByText('A1');
    await userEvent.click(drinksRecipeCard);
    expect(window.location.pathname).toBe('/drinks/17222');
  });
});
describe('drinksRecipe', () => {
  it('Verifica se ao clicar em uma bebida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = await screen.findByText('252');
    await userEvent.click(drinksRecipeCard);
    const Category = await screen.findByTestId('recipe-category');
    expect(Category).toBeInTheDocument();
  });
  it('Verifica se a Ingrediente', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = await screen.findByText('Kir');
    await userEvent.click(drinksRecipeCard);
    const Ingrediente = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(Ingrediente).toBeInTheDocument();
  });

  it('Verifica se a Recomendaçao', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = await screen.findByText('B-53');
    await userEvent.click(drinksRecipeCard);
    const Recomendacao = await screen.findByTestId('1-recommendation-card');
    expect(Recomendacao).toBeInTheDocument();
  });
});
