import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const startRecipeBtn = 'start-recipe-btn';

describe('DoneRecipes', () => {
  it('Verifica se ao clicar nos botões de filtro o estado é atualizado de acordo', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { route: '/meals' });
    const kumpir = await screen.findByText('Kumpir');
    await userEvent.click(kumpir);
    const butao = await screen.findByTestId(startRecipeBtn);
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/meals/52978/in-progress');

    const ingredientCheckbox1 = await screen.findByTestId('0-ingredient-step');
    const ingredientCheckbox2 = await screen.findByTestId('1-ingredient-step');
    const ingredientCheckbox3 = await screen.findByTestId('2-ingredient-step');
    const ingredientCheckbox4 = await screen.findByTestId('3-ingredient-step');
    const ingredientCheckbox5 = await screen.findByTestId('4-ingredient-step');
    const ingredientCheckbox6 = await screen.findByTestId('5-ingredient-step');

    await userEvent.click(ingredientCheckbox1);
    await userEvent.click(ingredientCheckbox2);
    await userEvent.click(ingredientCheckbox3);
    await userEvent.click(ingredientCheckbox4);
    await userEvent.click(ingredientCheckbox5);
    await userEvent.click(ingredientCheckbox6);

    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);
    expect(window.location.pathname).toBe('/done-recipes');

    const mealsBtn = await screen.findAllByTestId('filter-by-meal-btn');
    const drinksBtn = await screen.findAllByTestId('filter-by-drink-btn');

    expect(mealsBtn[0]).toBeInTheDocument();
    expect(drinksBtn[0]).toBeInTheDocument();

    const mealItem = screen.getAllByRole('heading', { name: 'Kumpir' });
    await userEvent.click(drinksBtn[0]);
    expect(mealItem[0]).not.toBeInTheDocument();
  });

  it('Verificando se ao clicar no botão de compartilhar, copia a URL correta', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { route: '/meals' });
    const kumpir = await screen.findByText('Kumpir');
    await userEvent.click(kumpir);
    const butao = await screen.findByTestId(startRecipeBtn);
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/meals/52978/in-progress');

    const ingredientCheckbox1 = await screen.findByTestId('0-ingredient-step');
    const ingredientCheckbox2 = await screen.findByTestId('1-ingredient-step');
    const ingredientCheckbox3 = await screen.findByTestId('2-ingredient-step');
    const ingredientCheckbox4 = await screen.findByTestId('3-ingredient-step');
    const ingredientCheckbox5 = await screen.findByTestId('4-ingredient-step');
    const ingredientCheckbox6 = await screen.findByTestId('5-ingredient-step');

    await userEvent.click(ingredientCheckbox1);
    await userEvent.click(ingredientCheckbox2);
    await userEvent.click(ingredientCheckbox3);
    await userEvent.click(ingredientCheckbox4);
    await userEvent.click(ingredientCheckbox5);
    await userEvent.click(ingredientCheckbox6);

    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);
    expect(window.location.pathname).toBe('/done-recipes');

    const shareBtnDoneRecipe = await screen.findByTestId('0-horizontal-share-btn');
    await userEvent.click(shareBtnDoneRecipe);
    const clipBoardMessage = await navigator.clipboard.readText();
    expect(clipBoardMessage).toBe('http://localhost:3000/meals/52978');
  });
});
