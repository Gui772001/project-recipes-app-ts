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
it('Verificar se clicar no botão de compartilhar pega o link', async () => {
  renderWithRouter(<App />, { route: '/drinks' });
  const drinksRecipeCard = await screen.findByText('ABC');
  await userEvent.click(drinksRecipeCard);
  const shareBtn = await screen.findByTestId('share-btn');
  expect(shareBtn).toBeInTheDocument();
  await userEvent.click(shareBtn);
  const fakeLink = 'http://localhost:3000/drinks/13501';
  setTimeout(() => {
    expect(navigator.clipboard.readText()).resolves.toEqual(fakeLink);
  }, 5);
  it('verifica se comidas ou bebidas tem cards e 5 botões de filtro e um botão All', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(() => expect(screen.getAllByTestId(/recipe-card/i)).toHaveLength(12));
    await waitFor(() => expect(screen.getAllByTestId(/category-filter/i)).toHaveLength(6));
    await waitFor(() => expect(screen.getByTestId(/All-category-filter/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument());
  });
});
