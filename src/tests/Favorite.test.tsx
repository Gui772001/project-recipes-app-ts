import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const botaodafavoritos = 'favorite-btn';
const botaoprofile = 'profile-top-btn';
const botaoprofilefavoritos = 'profile-favorite-btn';

describe('RecipeIn', () => {
  it('verificar se ao clicar no botao de favoritos ele redireciona para rota certa', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
    const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
    await userEvent.click(RecipeFavorito);
    const Profile = await screen.findByTestId(botaoprofile);
    await userEvent.click(Profile);
    const favoritos = await screen.findByTestId(botaoprofilefavoritos);
    await userEvent.click(favoritos);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });
  it('verificar se ao clicar no botao de favoritos ele e removido', async () => {
    renderWithRouter(<App />, { route: '/meals/53060/in-progress' });
    const Meals = await screen.findByText('Burek');
    const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
    await userEvent.click(RecipeFavorito);
    const Profile = await screen.findByTestId(botaoprofile);
    await userEvent.click(Profile);
    const favoritos = await screen.findByTestId(botaoprofilefavoritos);
    await userEvent.click(favoritos);
    const botao = await screen.findByTestId('0-horizontal-favorite-btn');
    await userEvent.click(botao);
    expect(Meals).not.toBeInTheDocument();
  });

  // it('verificar se ao clicar no compartilhar o link e copiado', async () => {
  //   renderWithRouter(<App />, { route: '/meals/53069/in-progress' });
  //   const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
  //   await userEvent.click(RecipeFavorito);
  //   const Profile = await screen.findByTestId(botaoprofile);
  //   await userEvent.click(Profile);
  //   const favoritos = await screen.findByTestId(botaoprofilefavoritos);
  //   await userEvent.click(favoritos);
  //   const Recipecompartilhar = await screen.findByTestId('0-horizontal-share-btn');
  //   await userEvent.click(Recipecompartilhar);
  //   const pastedText = await navigator.clipboard.readText();
  //   const expectedLink = 'http://localhost:3000/meals/undefined';
  //   expect(pastedText).toBe(expectedLink);
  // });
  // it('Verificando os filtro do meals nos favoritos', async () => {
  //   renderWithRouter(<App />, { route: '/meals/52978' });
  //   const name = await screen.findByText('Kumpir');
  //   const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
  //   await userEvent.click(RecipeFavorito);
  //   const Profile = await screen.findByTestId(botaoprofile);
  //   await userEvent.click(Profile);
  //   const favoritos = await screen.findByTestId(botaoprofilefavoritos);
  //   await userEvent.click(favoritos);
  //   const Meals = await screen.findByTestId('filter-by-meal-btn');
  //   await userEvent.click(Meals);
  //   expect(name).toBeInTheDocument();
  // });
  // it.only('Verificando os filtro do drinks nos favoritos', async () => {
  //   localStorage.clear();
  //   renderWithRouter(<App />, { route: '/drinks/17222/in-progress' });
  //   const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
  //   await userEvent.click(RecipeFavorito);
  //   expect(RecipeFavorito).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  //   const Profile = await screen.findByTestId(botaoprofile);
  //   await userEvent.click(Profile);
  //   const favoritos = await screen.findByTestId(botaoprofilefavoritos);
  //   await userEvent.click(favoritos);
  //   expect(await screen.findByRole('heading', {
  //     name: 'A1',
  //   })).toBeInTheDocument();
  // });
});
