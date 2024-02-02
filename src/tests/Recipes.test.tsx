import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const SEARCH_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const SEARCH_BTN = 'exec-search-btn';
const first = 'first-letter-search-radio';

describe('Drinks', () => {
  it('Verifica o cabeçalho renderiza os botões de perfil e pesquisa corretamente', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    const searchButton = screen.getByTestId(SEARCH_TEST_ID);
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica a entrada de pesquisa é exibida quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const searchInput = screen.queryByTestId(SEARCH_INPUT_TEST_ID);
    expect(searchInput).not.toBeInTheDocument();
    const searchButton = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(searchButton);
    const updatedSearchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(updatedSearchInput).toBeInTheDocument();
  });
  it('Verirfica os itens da searchBar quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const buttonSearch = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(inputSearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
  });

  it('verifica se exibe um alert quando o input tem mais de 1 caractere no filtro first Letter', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, { route: '/drinks' });

    const buttonSearch = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(inputSearch, { target: { value: 'aa' } });

    const firstLetter = screen.getByTestId(first);
    fireEvent.click(firstLetter);

    const searchButton = screen.getByTestId(SEARCH_BTN);
    fireEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });
});
describe('Meals', () => {
  it('Verifica o cabeçalho renderiza os botões de perfil e pesquisa corretamente', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    const searchButton = screen.getByTestId(SEARCH_TEST_ID);
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica a entrada de pesquisa é exibida quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const searchInput = screen.queryByTestId(SEARCH_INPUT_TEST_ID);
    expect(searchInput).not.toBeInTheDocument();
    const searchButton = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(searchButton);
    const updatedSearchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(updatedSearchInput).toBeInTheDocument();
  });
  it('Verirfica os itens da searchBar quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const buttonSearch = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId(first);
    expect(inputSearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
  });

  it('Verifica se a Recomendaçao', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = await screen.findByText('Kumpir');
    await userEvent.click(drinksRecipeCard);
    const Recomendacao = await screen.findByTestId('0-recommendation-card');
    expect(Recomendacao).toBeInTheDocument();
  });
  it('Verifica se a Ingrediente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const drinksRecipeCard = screen.findByTestId(SEARCH_TEST_ID);
    fireEvent.click(await drinksRecipeCard);
    const seatchinput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(seatchinput, { target: { value: 'Brown Stew Chicken' } });
    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[1]);
    const Seacrh = screen.findByTestId(SEARCH_BTN);
    fireEvent.click(await Seacrh);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52940');
      expect(screen.getAllByTestId('recipe-title')).toHaveLength(1);
    });
  });
  it('Verifica se a drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinksRecipeCard = screen.findByTestId(SEARCH_TEST_ID);
    fireEvent.click(await drinksRecipeCard);
    const seatchinput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(seatchinput, { target: { value: 'A1' } });
    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[1]);
    const Seacrh = screen.findByTestId(SEARCH_BTN);
    fireEvent.click(await Seacrh);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/17222');
      expect(screen.getAllByTestId('recipe-title')).toHaveLength(1);
    });
  });
  it('verifica se comidas ou bebidas tem cards e 5 botões de filtro e um botão All', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(() => expect(screen.getAllByTestId(/recipe-card/i)).toHaveLength(12));
    await waitFor(() => expect(screen.getAllByTestId(/card-name/i)).toHaveLength(12));
  });
  it('Verifica se ao clicar em uma comida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const mealsRecipeCard = await screen.findByText('252');
    await userEvent.click(mealsRecipeCard);
    expect(window.location.pathname).toBe('/drinks/15288');
    await waitFor(() => {
      expect(screen.getAllByTestId('recipe-category')).toHaveLength(1);
    });
  });
  it('Verifica se ao clicar em uma comida redireciona para endereco correto', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await userEvent.tab();
    await userEvent.keyboard('{enter}');
    expect(window.location.pathname).toBe('/profile');
  });
  it('Verificar se aperta o enter em Drinks entra na seleção', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await screen.findByText('A1');
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{enter}');
    expect(window.location.pathname).toBe('/drinks/17222');
  });
  it('Verificar se aperta o enter em meals entra na seleção', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    await screen.findByText('Corba');
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{enter}');
    expect(window.location.pathname).toBe('/meals/52977');
  });
});
