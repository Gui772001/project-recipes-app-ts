import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('FastButtons', () => {
  it('Verifica se ao entrar em uma página desconhecida exibe uma mensagem informando', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { route: '/notFound' });
  });

  it('', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { route: '/meals' });
    const beefBtn = await screen.findByText('Beef');
    await userEvent.click(beefBtn);
    const filteredInfo = await screen.findByTestId('0-card-img');
    expect(filteredInfo).toBeInTheDocument();
  });
});
