import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

const inputEmail = screen.getByTestId(
  'email-input',
);

const inputPassword = screen.getByTestId(
  'password-input',
);

const submitBtn = screen.getByTestId(
  'login-submit-btn',
);

describe('App', () => {
  test('renderiza corretamente', () => {
    render(<App />);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('desabilita o botão ao iniciar', () => {
    render(<App />);
    expect(submitBtn).toBeDisabled();
  });

  test.only('habilita o botão quando email e senha são válidos', () => {
    render(<App />);
    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeEnabled();
  });

  test('desabilita o botão quando o email é inválido', () => {
    render(<App />);
    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    expect(submitBtn).toBeDisabled();
  });

  test('desabilita o botão quando a senha tem menos de 6 caracteres', () => {
    render(<App />);
    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(submitBtn).toBeDisabled();
  });

  test('exibe mensagem de erro ao fornecer um email inválido', () => {
    render(<App />);
    fireEvent.change(inputEmail, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  test('exibe mensagem de erro ao fornecer uma senha curta', () => {
    render(<App />);
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    expect(screen.getByText('A senha deve ter mais de 6 caracteres')).toBeInTheDocument();
  });
});
