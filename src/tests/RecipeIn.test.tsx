import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const ingredientCard0 = '0-ingredient-step';
const ingredientCard1 = '1-ingredient-step';
const ingredientCard2 = '2-ingredient-step';

describe('RecipeIn', () => {
  it('Veficando se ao clicar em continue recipes vai para rota certa em meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const Corba = await screen.findByText('Corba');
    await userEvent.click(Corba);
    const butao = await screen.findByTestId('start-recipe-btn');
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/meals/52977/in-progress');
  });
  it('Veficando se ao clicar em continue recipes vai para rota certa drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinks = await screen.findByText('A1');
    await userEvent.click(drinks);
    const butao = await screen.findByTestId('start-recipe-btn');
    await userEvent.click(butao);
    expect(window.location.pathname).toBe('/drinks/17222/in-progress');
  });

  it('Verificar se a categoria e os ingredientes', async () => {
    renderWithRouter(<App />, { route: '/meals/53065/in-progress' });
    const MealsSushi = await screen.findByText('Sushi');
    expect(MealsSushi).toBeInTheDocument();
    const RecipeCategory = await screen.findByTestId('recipe-category');
    expect(RecipeCategory).toBeInTheDocument();
    const ingredientes = await screen.findByTestId(ingredientCard0);
    expect(ingredientes).toBeInTheDocument();
  });

  it('Veficando se ao clicar o checkbox de comida e marcado', async () => {
    renderWithRouter(<App />, { route: '/meals/53069/in-progress' });
    const ingredientCheckbox1 = await screen.findByTestId(ingredientCard0);
    const ingredientCheckbox2 = await screen.findByTestId(ingredientCard1);
    const ingredientCheckbox3 = await screen.findByTestId(ingredientCard2);
    const ingredientCheckbox4 = await screen.findByTestId('3-ingredient-step');
    const ingredientCheckbox5 = await screen.findByTestId('4-ingredient-step');
    const ingredientCheckbox6 = await screen.findByTestId('5-ingredient-step');
    const ingredientCheckbox7 = await screen.findByTestId('6-ingredient-step');
    const ingredientCheckbox8 = await screen.findByTestId('7-ingredient-step');

    await userEvent.click(ingredientCheckbox1);
    await userEvent.click(ingredientCheckbox2);
    await userEvent.click(ingredientCheckbox3);
    await userEvent.click(ingredientCheckbox4);
    await userEvent.click(ingredientCheckbox5);
    await userEvent.click(ingredientCheckbox6);
    await userEvent.click(ingredientCheckbox7);
    await userEvent.click(ingredientCheckbox8);
    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);
    expect(window.location.pathname).toBe('/done-recipes');
    expect(ingredientCheckbox5).not.toBeInTheDocument();
  });
  it('Veficando se ao clicar o checkbox de bebida e marcado', async () => {
    renderWithRouter(<App />, { route: '/drinks/15853/in-progress' });
    const ingredientCheckbox1 = await screen.findByTestId(ingredientCard0);
    const ingredientCheckbox2 = await screen.findByTestId(ingredientCard1);
    const ingredientCheckbox3 = await screen.findByTestId(ingredientCard2);

    await userEvent.click(ingredientCheckbox1);
    await userEvent.click(ingredientCheckbox2);
    await userEvent.click(ingredientCheckbox3);
    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    expect(submitBtn).not.toBeDisabled();
    await userEvent.click(submitBtn);
    expect(window.location.pathname).toBe('/done-recipes');
    expect(ingredientCheckbox1).not.toBeInTheDocument();
  });

  it('Testa se ao clicar em compartilhar, o link da receita é salvo no clipboard', async () => {
    renderWithRouter(<App />, { route: '/meals/53013/in-progress' });
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const shareMessage = await screen.findByText('Link copied!');
    expect(shareMessage).toBeInTheDocument();
  });
  it('Veficando se ao clicar em numa receita de comida o css do checkbox muda ', async () => {
    renderWithRouter(<App />, { route: '/meals/53069/in-progress' });
    const ingredientCheckbox1 = await screen.findByTestId(ingredientCard2);
    await userEvent.click(ingredientCheckbox1);
    expect(ingredientCheckbox1).toHaveStyle('text-decoration: none');
    await userEvent.click(ingredientCheckbox1);
    expect(ingredientCheckbox1).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
  });
  it('Veficando se ao clicar em numa receita de bebida o css do checkbox muda', async () => {
    renderWithRouter(<App />, { route: '/drinks/17222/in-progress' });
    const ingredientCheckbox1 = await screen.findByTestId(ingredientCard1);
    await userEvent.click(ingredientCheckbox1);
    expect(ingredientCheckbox1).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    await userEvent.click(ingredientCheckbox1);
    expect(ingredientCheckbox1).toHaveStyle('text-decoration: none');
  });
  it('Verificando se ao clicar em favoritos da comida a imagem muda', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
    const ButtunFavorite = await screen.findByTestId('favorite-btn');
    expect(ButtunFavorite).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(ButtunFavorite);
    expect(ButtunFavorite).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
  it('Verificando se ao clicar em favoritos da bebida a imagem muda', async () => {
    renderWithRouter(<App />, { route: '/drinks/17837/in-progress' });
    const ButtunFavorite = await screen.findByTestId('favorite-btn');
    expect(ButtunFavorite).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(ButtunFavorite);
    expect(ButtunFavorite).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
});
