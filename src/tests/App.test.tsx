import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Verificando os elementos de login', () => {
  test('Verifica se os inputs de email, password e button estão na tela', () => {
    render(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
});
