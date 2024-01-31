import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Header', () => {
  it('Verifica rota do botão de profile do componente App para o Header', () => {
    renderWithRouter(<App />, { route: '/' });
    const profileButton = screen.getByTestId('profile-top-btn');
    const profileTittle = screen.getByText('Título');

    expect(profileButton).toBeInTheDocument();
    expect(profileTittle).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(screen.getByText('Olá')).toBeInTheDocument();
  });
  it('verificando os botões de pesquisa se estão na meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    fireEvent.click(profileButton);
    expect(window.location.pathname).toBe('/profile');
    expect(searchButton).not.toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
  });
  it('Verifica rota e exibição do header para drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    expect(window.location.pathname).toBe('/drinks');
    const tittle = screen.getByRole('heading', { name: 'Drinks', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para DoneRecipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(window.location.pathname).toBe('/done-recipes');
    const tittle = screen.getByRole('heading', { name: 'Done Recipes', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para meals', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(window.location.pathname).toBe('/meals');
    const tittle = screen.getByRole('heading', { name: 'Meals', level: 1 });
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
});
