import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const INPUT_PASSWORD = 'password-input';
const INPUT_EMAIL = 'email-input';
const LOGIN_SUBMIT_BUTTON = 'login-submit-btn';

describe('App', () => {
  test('renderiza corretamente', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('desabilita o botão ao iniciar', () => {
    renderWithRouter(<App />, { route: '/' });
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    expect(submitBtn).toBeDisabled();
  });

  test('habilita o botão quando email e senha são válidos', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeEnabled();
  });

  test('desabilita o botão quando o email é inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeDisabled();
  });

  test('desabilita o botão quando a senha tem menos de 6 caracteres', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BUTTON);

    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(submitBtn).toBeDisabled();
  });

  test('exibe mensagem de erro ao fornecer um email inválido', () => {
    renderWithRouter(<App />, { route: '/' });
    const inputEmail = screen.getByTestId(INPUT_EMAIL);

    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Senha mínima 6 caracteres.')).toBeInTheDocument();
  });

  test('exibe mensagem de erro ao fornecer uma senha curta', () => {
    renderWithRouter(<App />, { route: '/' });

    const inputPassword = screen.getByTestId(INPUT_PASSWORD);

    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
  });
});

describe('Header', () => {
  it('Verifica rota do botão de profile do componente App para o Header', () => {
    renderWithRouter(<App />, { route: '/' });
    const profileButton = screen.getByTestId('profile-top-btn');
    const profileTittle = screen.getByText('Título');

    expect(profileButton).toBeInTheDocument();
    expect(profileTittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para drinks', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(window.location.pathname).toBe('/meals');
    const tittle = screen.getByRole('heading', { name: 'Meals', level: 1 });
    expect(tittle).toBeInTheDocument();
  });
});
