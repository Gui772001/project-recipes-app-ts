import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const SEARCH_TEST_ID = 'search-top-btn';
const SEARCH_BTN = 'exec-search-btn';

describe('Header', () => {
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
});
