import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const INPUT_PASSWORD = 'password-input';
const INPUT_EMAIL = 'email-input';
const LOGIN_SUBMIT_BUTTON = 'login-submit-btn';

describe('App', () => {
  test('Renderiza corretamente', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('Desabilita o botão ao iniciar', () => {
    renderWithRouter(<App />, { route: '/' });
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(submitBtn).toBeDisabled();
  });

  test('Habilita o botão quando email e senha são válidos', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeEnabled();
  });

  test('Desabilita o botão quando o email é inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeDisabled();
  });

  test('Desabilita o botão quando a senha tem menos de 6 caracteres', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(submitBtn).toBeDisabled();
  });

  test('Exibe mensagem de erro ao fornecer um email inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Senha mínima 6 caracteres.')).toBeInTheDocument();
  });

  test('Exibe mensagem de erro ao fornecer uma senha curta', () => {
    renderWithRouter(<App />, { route: '/' });

    const inputPassword = screen.getByTestId(INPUT_PASSWORD);

    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
  });

  test('Salva informações no localStorage de acordo com o login e senha', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'teste@teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(submitBtn);

    const lsUser = localStorage.getItem('user');

    expect(lsUser).toBe('{"email":"teste@teste.com","password":"123456"}');
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
});
