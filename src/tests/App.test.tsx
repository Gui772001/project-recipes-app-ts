import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const emailTest = 'test@example.com';
const passwordTest = 'passwordTest';
const INPUT_PASSWORD = 'password-input';
const INPUT_EMAIL = 'email-input';
const LOGIN_SUBMIT_BUTTON = 'login-submit-btn';
const SEARCH_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const SEARCH_BTN = 'exec-search-btn';

describe('App', () => {
  it('Renderiza corretamente', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('Desabilita o botão ao iniciar', () => {
    renderWithRouter(<App />, { route: '/' });
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(submitBtn).toBeDisabled();
  });

  it('Habilita o botão quando email e senha são válidos', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: emailTest } });
    fireEvent.change(inputPassword, { target: { value: passwordTest } });
    expect(submitBtn).toBeEnabled();
  });

  it('Desabilita o botão quando o email é inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    fireEvent.change(inputPassword, { target: { value: passwordTest } });
    expect(submitBtn).toBeDisabled();
  });

  it('Desabilita o botão quando a senha tem menos de 6 caracteres', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: emailTest } });
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(submitBtn).toBeDisabled();
  });

  it('Exibe mensagem de erro ao fornecer um email inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Senha mínima 7 caracteres.')).toBeInTheDocument();
  });

  it('Exibe mensagem de erro ao fornecer uma senha curta', () => {
    renderWithRouter(<App />, { route: '/' });

    const inputPassword = screen.getByTestId(INPUT_PASSWORD);

    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
  });

  it('Salva informações no localStorage de acordo com o login e senha', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: emailTest } });
    fireEvent.change(inputPassword, { target: { value: passwordTest } });
    fireEvent.click(submitBtn);

    const lsUser = localStorage.getItem('user');

    expect(lsUser).toBe('{"email":"test@example.com"}');
  });
});

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
  it('Verifica se os radios sao clicaveis', async () => {
    const mockValue = {
      meals: null,
    };
    const fetchResovedValue = {
      json: async () => mockValue,
    } as Response;
    vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResovedValue);
    renderWithRouter(<App />, { route: '/meals' });

    const searchBbtn = screen.getByTestId(SEARCH_TEST_ID);
    await userEvent.click(searchBbtn);
    const SearchExecBTN = screen.getByTestId(SEARCH_BTN);
    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[0]);
    await userEvent.click(SearchExecBTN);
    await userEvent.click(radios[1]);
    await userEvent.click(SearchExecBTN);
    await userEvent.click(radios[2]);
    await userEvent.click(SearchExecBTN);
  });
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
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(inputSearch).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
  });

  it('verifica se exibe um alert quando o input tem mais de 1 caractere no filtro first Letter', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const buttonSearch = screen.getByTestId(SEARCH_TEST_ID);
    fireEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(inputSearch, { target: { value: 'aa' } });

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetter);

    const searchButton = screen.getByTestId(SEARCH_BTN);
    fireEvent.click(searchButton);
    expect(alert).toBeTruthy();
  });
});

describe('footer', () => {
  it('verifica se ao clicar nos botoes do footer, troca de rota', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const drinkFooter = screen.getByTestId('drinks-bottom-btn');

    fireEvent.click(drinkFooter);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('verifica se ao clicar nos botoes do footer, troca de rota', () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const mealsFooter = screen.getByTestId('meals-bottom-btn');

    fireEvent.click(mealsFooter);
    expect(window.location.pathname).toBe('/meals');
  });
});
