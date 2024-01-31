import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('mealsRecipe', () => {
  it('Verifica se ao clicar em uma comida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const mealsRecipeCard = await screen.findByText('Bistek');
    await userEvent.click(mealsRecipeCard);
    expect(window.location.pathname).toBe('/meals/53069');
  });
});
describe('drinksRecipe', () => {
  it('Verifica se ao clicar em uma bebida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Bistek');
    await userEvent.click(drinksRecipeCard);
    const Category = await screen.findByTestId('recipe-category');
    expect(Category).toBeInTheDocument();
  });
  it('Verifica se a Ingrediente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Tamiya');
    await userEvent.click(drinksRecipeCard);
    const Ingrediente = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(Ingrediente).toBeInTheDocument();
  });
  it('Verifica se a video', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Wontons');
    await userEvent.click(drinksRecipeCard);
    const vide = await screen.findByTestId('video');
    expect(vide).toBeInTheDocument();
  });
  it('Verifica se a Recomendaçao', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Kumpir');
    await userEvent.click(drinksRecipeCard);
    const Recomendacao = await screen.findByTestId('0-recommendation-card');
    expect(Recomendacao).toBeInTheDocument();
  });
});
