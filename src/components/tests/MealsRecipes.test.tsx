import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';
import { MockMeas } from '../Mockes/MealsMock';
import { DrinkMock } from '../Mockes/Drinks.mock';

const fet = (data: any) => ({ json: async () => data }) as Response;

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
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(DrinkMock))
      .mockResolvedValueOnce(fet(DrinkMock.drinks[3]));
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = await screen.findByText('252');
    await userEvent.click(drinksRecipeCard);
    const Recomendacao = await screen.findByTestId('0-recommendation-card');
    expect(Recomendacao).toBeInTheDocument();
  });
  it.only('Verifica se a o botão de favorito', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas))
      .mockResolvedValueOnce(fet(MockMeas.meals[3]));
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Bistek');
    await userEvent.click(drinksRecipeCard);
    const Recomendacao = await screen.findByTestId('favorite-btn');
    expect(Recomendacao).toBeInTheDocument();
  });
  it('verifica se comidas ou bebidas tem cards e 5 botões de filtro e um botão All', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas));
    renderWithRouter(<App />, { route: '/meals' });
    await waitFor(() => expect(screen.getAllByTestId(/recipe-card/i)).toHaveLength(12));
    await waitFor(() => expect(screen.getAllByTestId(/category-filter/i)).toHaveLength(6));
    await waitFor(() => expect(screen.getByTestId(/All-category-filter/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument());
  });

  it('deve alterar o filtro ao chamar handleFilterBtn', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(DrinkMock))
      .mockResolvedValueOnce(fet(MockMeas));
    renderWithRouter(<App />, { route: '/meals' });

    const mealFilterButton = await screen.findByTestId('meals-bottom-btn');
    const drinkFilterButton = await screen.findByTestId('drinks-bottom-btn');
    await userEvent.click(drinkFilterButton);
    expect(window.location.pathname).toBe('/drinks');
    await userEvent.click(mealFilterButton);
    expect(window.location.pathname).toBe('/meals');
  });
});
