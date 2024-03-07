import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const botaodafavoritos = 'favorite-btn';
const botaoprofile = 'profile-top-btn';
const botaoprofilefavoritos = 'profile-favorite-btn';

describe('RecipeIn', () => {
  it('verificar se ao clicar no botao de favoritos ele redireciona para rota certa', async () => {
    renderWithRouter(<App />, { route: '/meals/53060/in-progress' });
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
  it('Testa se ao clicar em compartilhar, o link da receita é salvo no clipboard', async () => {
    renderWithRouter(<App />, { route: '/drinks/15288/in-progress' });
    const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
    await userEvent.click(RecipeFavorito);
    const Profile = await screen.findByTestId(botaoprofile);
    await userEvent.click(Profile);
    const favoritos = await screen.findByTestId(botaoprofilefavoritos);
    await userEvent.click(favoritos);
    const shareButton = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const shareMessage = await screen.findByText('Link copied!');
    expect(shareMessage).toBeInTheDocument();
  });
  it('Testa se ao clicar em compartilhar, o link da receita é salvo no clipboard', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });
    const RecipeFavorito = await screen.findByTestId(botaodafavoritos);
    await userEvent.click(RecipeFavorito);
    const Profile = await screen.findByTestId(botaoprofile);
    await userEvent.click(Profile);
    const favoritos = await screen.findByTestId(botaoprofilefavoritos);
    await userEvent.click(favoritos);
    const shareButton = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const shareMessage = await screen.findAllByText('Link copied!');
    expect(shareMessage).toBeInTheDocument();
  });
});
