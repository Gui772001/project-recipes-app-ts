import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { MockMeas } from '../helpers/Mockes/MealsMock';
import { DrinkMock } from '../helpers/Mockes/Drinks.mock';

const searchTopBtn = 'search-top-btn';

describe('Header', () => {
  it('Verifica rota do botão de profile do componente App para o Header', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const profileButton = screen.getByTestId('profile-top-btn');

    expect(profileButton).toBeInTheDocument();

    await userEvent.click(profileButton);
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
  });
  it('verificando os botões de pesquisa se estão na meals', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(MockMeas),
    } as Response));
    renderWithRouter(<App />, { route: '/meals' });

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId(searchTopBtn);
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    fireEvent.click(profileButton);
    expect(window.location.pathname).toBe('/profile');
    expect(searchButton).not.toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para DoneRecipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(window.location.pathname).toBe('/done-recipes');
    const tittle = screen.getByRole('heading', { name: 'Done Recipes', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para favorite-recipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    expect(window.location.pathname).toBe('/favorite-recipes');
    const tittle = screen.getByRole('heading', { name: 'Favorite Recipes', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para search', () => {
    renderWithRouter(<App />, { route: '/search' });
    expect(window.location.pathname).toBe('/search');
    const tittle = screen.getByRole('heading', { name: 'Search', level: 1 });
    expect(tittle).toBeInTheDocument();
  });
  it('Verifica se o botao do header e exibido em meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchBtn);
    const searchExecBtn = screen.getByTestId('exec-search-btn');
    expect(searchExecBtn).toBeInTheDocument();
    await userEvent.click(searchBtn);
    expect(searchExecBtn).not.toBeInTheDocument();
  });
  it('Verifica se o botao do header e exibido em drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const searchBtn = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchBtn);
    const searchExecBtn = screen.getByTestId('exec-search-btn');
    expect(searchExecBtn).toBeInTheDocument();
    await userEvent.click(searchBtn);
    expect(searchExecBtn).not.toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para drinks', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(DrinkMock),
    } as Response));
    renderWithRouter(<App />, { route: '/drinks' });
    expect(window.location.pathname).toBe('/drinks');
    const tittle = screen.getByRole('heading', { name: 'Drinks', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para meals', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(MockMeas),
    } as Response));
    renderWithRouter(<App />, { route: '/meals' });
    expect(window.location.pathname).toBe('/meals');
    const tittle = screen.getByRole('heading', { name: 'Meals', level: 1 });
    expect(tittle).toBeInTheDocument();
  });
});
