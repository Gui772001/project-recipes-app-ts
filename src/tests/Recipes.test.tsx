import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
    renderWithRouter(<App />, { route: '/drinks' });

    const buttonSearch = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(inputSearch, { target: { value: 'aa' } });

    const firstLetter = screen.getByTestId(first);
    fireEvent.click(firstLetter);

    const searchButton = screen.getByTestId(SEARCH_BTN);
    fireEvent.click(searchButton);
    expect(alert).toBeTruthy();
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

  it('verifica se exibe um alert quando o input tem mais de 1 caractere no filtro first Letter', () => {
    renderWithRouter(<App />, { route: '/meals' });
  });
});
