import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Profile from '../components/Profile';
import { localStorageMock } from '../helpers/Mockes/localStorageMock';

const emailTest = 'test@example.com';

describe('Testa a tela de Profile', () => {
  test(('1 - Verifica se a tela contém os elementos'), () => {
    renderWithRouter(<Profile />);
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    const buttonDone = screen.getByTestId('profile-done-btn');

    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
  });

  test('2 - Verifica se a página possui Footer', () => {
    renderWithRouter(<Profile />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('3 - Verifica se a página possui o email logado', () => {
    const user = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(user));

    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  test('4 - Verifica se a página não possui o email logado', () => {
    renderWithRouter(<Profile />);
    const email = screen.queryByText(emailTest);
    expect(email).not.toBeInTheDocument();
  });

  test('5 - Verifica se a página redireciona para a rota "/" ao clicar em logout', async () => {
    const user = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(user));

    renderWithRouter(<Profile />);
    const logoutButton = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logoutButton);

    expect(window.location.pathname).toBe('/');
  });
});

describe('Profile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    window.localStorage = localStorageMock as unknown as Storage;
  });

  afterEach(() => {
    window.localStorage.clear();
  });
  it('6 - should render user email when user is logged in', () => {
    const user = { email: emailTest };
    window.localStorage.setItem('user', JSON.stringify(user));

    renderWithRouter(<Profile />);

    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    window.localStorage.clear();
  });

  it('7 - should not render user email when user is not logged in', () => {
    window.localStorage.removeItem('user');

    renderWithRouter(<Profile />);

    const userEmail = screen.queryByText(emailTest);
    expect(userEmail).not.toBeInTheDocument();
    window.localStorage.clear();
  });

  it('8 - should navigate to "/done-recipes" when the button is clicked', async () => {
    renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/done-recipes');
  });
});
