import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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
