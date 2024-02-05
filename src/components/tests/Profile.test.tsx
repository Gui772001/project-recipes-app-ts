// Profile.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../Profile';
import renderWithRouter from '../../renderWithRouter';

describe('Testa a tela de Profile', () => {
  test(('Verifica se a tela contém os elementos'), () => {
    renderWithRouter(<Profile />);
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    const buttonDone = screen.getByTestId('profile-done-btn');

    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
  });

  test('Verifica se a página possui Footer', () => {
    renderWithRouter(<Profile />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('Verifica se a página possui o email logado', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });
  test('Verifica se a página possui o email logado', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });
  test('Verifica se a página possui ', async () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-logout-btn');
    await userEvent.click(email);
    expect(window.location.pathname).toBe('/');
  });
});
