import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';
import { MockMeas } from '../Mockes/MealsMock';
import { DrinkMock } from '../Mockes/Drinks.mock';

const fet = (data: any) => ({ json: async () => data }) as Response;
describe('RecipeIn', () => {
  it('Veficando se ao clicar em continue recipes vai para rota certa em meals', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas))
      .mockResolvedValueOnce(fet(MockMeas.meals[4]));
    renderWithRouter(<App />, { route: '/meals' });
    const Corba = await screen.findByText('Tamiya');
    await userEvent.click(Corba);
    const butao = await screen.findByTestId('start-recipe-btn');
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/meals/53026/in-progress');
  });
  it('Veficando se ao clicar em continue recipes vai para rota certa drinks', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(DrinkMock))
      .mockResolvedValueOnce(fet(DrinkMock.drinks[2]));
    renderWithRouter(<App />, { route: '/drinks' });
    const drinks = await screen.findByText('ABC');
    await userEvent.click(drinks);
    const butao = await screen.findByTestId('start-recipe-btn');
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/drinks/13501/in-progress');
  });
  it.only('Verificar se a categoria e os ingredientes', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas.meals[1]));
    renderWithRouter(<App />, { route: '/meals/53065/in-progress' });
    const MealsSushi = await screen.findByText('Sushi');
    expect(MealsSushi).toBeInTheDocument();
    const RecipeCategory = await screen.findByTestId('recipe-category');
    expect(RecipeCategory).toBeInTheDocument();
    const ingredientes = await screen.findByTestId('0-ingredient-step');
    expect(ingredientes).toBeInTheDocument();
  });
  // it('Veficando se ao clicar o checkbox e marcado', async () => {
  //   renderWithRouter(<App />, { route: '/meals/53065/in-progress' });
  //   const ingredientCheckbox = await screen.findByTestId('0-ingredient-step');
  //   await userEvent.click(ingredientCheckbox);
  //   await waitFor(() => {
  //     expect(ingredientCheckbox).toBeChecked();
  //   });
  // });
  it('verificar que se ao recarregar a pagina continua nos favoritos', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas.meals[0]));
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
    const RecipeFavorito = await screen.findByTestId('favorite-btn');
    await userEvent.click(RecipeFavorito);
    expect(RecipeFavorito).toBeInTheDocument();
    expect(RecipeFavorito).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    await act(async () => {
      window.location.reload();
      await new Promise((resolve) => { setTimeout(resolve, 500); }); // Aguardar um pouco para garantir que a página seja recarregada
    });
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
  // it.only('verificar se ao clicar no compartilhar o link e copiado', async () => {
  //   vi.spyOn(global, 'fetch')
  //     .mockResolvedValueOnce(fet(MockMeas.meals[0]));
  //   renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
  //   const Recipecompartilhar = await screen.findByTestId('share-btn');
  //   await userEvent.click(Recipecompartilhar);
  //   const pastedText = await navigator.clipboard.readText();
  //   const expectedLink = 'http://localhost:3000/meals/52977';
  //   expect(pastedText).toBe(expectedLink);
  // });
  it('Veficando se ao clicar o checkbox e marcado', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(fet(MockMeas.meals[2]));
    renderWithRouter(<App />, { route: '/meals/53069/in-progress' });
    const ingredientCheckbox = await screen.findByTestId('0-ingredient-step');
    const ingredientCheckbox1 = await screen.findByTestId('1-ingredient-step');
    const ingredientCheckbox2 = await screen.findByTestId('2-ingredient-step');
    const ingredientCheckbox3 = await screen.findByTestId('3-ingredient-step');
    await userEvent.click(ingredientCheckbox);
    await userEvent.click(ingredientCheckbox1);
    await userEvent.click(ingredientCheckbox2);
    await userEvent.click(ingredientCheckbox3);
    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    expect(submitBtn).not.toBeDisabled();
  });
});
