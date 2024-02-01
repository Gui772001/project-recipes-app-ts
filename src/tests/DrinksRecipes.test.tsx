import { screen, waitFor } from '@testing-library/react';
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
it('Verifica se a o botão de favorito', async () => {
  renderWithRouter(<App />, { route: '/drinks' });
  const drinksRecipeCard = await screen.findByText('B-53');
  await userEvent.click(drinksRecipeCard);
  const Recomendacao = await screen.findByTestId('favorite-btn');
  expect(Recomendacao).toBeInTheDocument();
});
it('Verificar se clicar no botão de compartilhar pega o link', async () => {
  renderWithRouter(<App />, { route: '/drinks' });
  const drinksRecipeCard = await screen.findByText('B-53');
  await userEvent.click(drinksRecipeCard);
  const Recomendacao = await screen.findByTestId('share-btn');
  expect(Recomendacao).toBeInTheDocument();
});
it.only('Verificar se clicar no botão de compartilhar pega o link', async () => {
  renderWithRouter(<App />, { route: '/drinks' });
  const drinksRecipeCard = await screen.findByText('Ace');
  await userEvent.click(drinksRecipeCard);
  const Recomendacao = await screen.findByTestId('share-btn');
  expect(Recomendacao).toBeInTheDocument();
  let clip = '';
  const fakeLink = 'http://localhost:3000/drinks/17225';
  await navigator.clipboard.readText().then((text) => {
    clip = text;
    expect(clip).toEqual(fakeLink);
  });
});
