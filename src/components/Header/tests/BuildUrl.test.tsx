import { fireEvent, screen } from '@testing-library/react';
import buildURL from '../services/buildURL';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('BuildUrl', () => {
  it('Retorna alguma comida com os filtros', () => {
    let filter = { input: '', radio: '' };
    const pathname = '/meals';
    filter = { input: 'all', radio: 'categories' };
    const expectedUrlAll = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=all';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlAll);
    filter = { input: 'beef', radio: 'categories' };
    const expectedUrlBeef = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlBeef);
    filter = { input: 'breakfast', radio: 'categories' };
    const expectedUrlBreakfast = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlBreakfast);
    filter = { input: 'chicken', radio: 'categories' };
    const expectedUrlChicken = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlChicken);
    filter = { input: 'Desert', radio: 'categories' };
    const expectedUrlDesert = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Desert';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlDesert);
    filter = { input: 'Goat', radio: 'categories' };
    const expectedUrlGoat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlGoat);
  });
  it('Retorna alguma comida com a busca por nome', () => {
    const filter = { input: 'chicken', radio: 'name' };
    const pathname = '/meals';
    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna alguma comida com a busca por ingredient', () => {
    const filter = { input: 'dessert', radio: 'ingredient' };
    const pathname = '/meals';
    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=dessert';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna alguma comida com a busca por first-letter', () => {
    const filter = { input: 'a', radio: 'first-letter' };
    const pathname = '/meals';
    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna url padrao', () => {
    const filter = { input: '', radio: '' };
    const pathname = '/meals';
    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
});
describe('BuildUrl', () => {
  it('Retorna alguma bebida com os filtros', () => {
    let filter = { input: '', radio: '' };
    const pathname = '/drinks';
    filter = { input: 'all', radio: 'categories' };
    const expectedUrlAll = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=all';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlAll);
    filter = { input: 'Ordinary_Drink', radio: 'categories' };
    const expectedUrlOrdinaryDrink = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlOrdinaryDrink);
    filter = { input: 'Cocktail', radio: 'categories' };
    const expectedUrlCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlCocktail);
    filter = { input: 'Shake', radio: 'categories' };
    const expectedUrlShake = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlShake);
    filter = { input: 'Other', radio: 'categories' };
    const expectedUrlOther = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlOther);
    filter = { input: 'Cocoa', radio: 'categories' };
    const expectedUrlCocoa = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa';
    expect(buildURL(filter, pathname)).toEqual(expectedUrlCocoa);
  });
  it('Retorna alguma bebida com a busca por nome', () => {
    const filter = { input: 'chicken', radio: 'name' };
    const pathname = '/drinks';
    const expectedUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chicken';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna alguma bebida com a busca por ingredient', () => {
    const filter = { input: 'dessert', radio: 'ingredient' };
    const pathname = '/drinks';
    const expectedUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=dessert';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna alguma bebida com a busca por first-letter', () => {
    const filter = { input: 'a', radio: 'first-letter' };
    const pathname = '/drinks';
    const expectedUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
  it('Retorna url padrao', () => {
    const filter = { input: '', radio: '' };
    const pathname = '/drinks';
    const expectedUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    expect(buildURL(filter, pathname)).toEqual(expectedUrl);
  });
});
