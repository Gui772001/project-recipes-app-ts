import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const emailTest = 'test@example.com';
const passwordTest = 'passwordTest';
const INPUT_PASSWORD = 'password-input';
const INPUT_EMAIL = 'email-input';
const LOGIN_SUBMIT_BUTTON = 'login-submit-btn';

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
