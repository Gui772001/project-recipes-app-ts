import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from './Context';
import { FoodDataType, DrinkDataType, ProviderProps } from '../services/types';

function Provider({ children }: ProviderProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [foodData, setFoodData] = useState<FoodDataType>({ meals: [] as any });
  const [filterDrinks, setFilterDrinks] = useState('');
  const [drinkData, setDrinkData] = useState<DrinkDataType>([{ Cocktails: [] }] as any);
  const [category, setCategory] = useState('');

  return (
    <Context.Provider
      value={ {
        email,
        setEmail,
        password,
        setPassword,
        isFormValid,
        setFormValid,
        filter,
        setFilter,
        inputValue,
        setInputValue,
        selectedRadio,
        setSelectedRadio,
        foodData,
        setFoodData,
        setFilterDrinks,
        filterDrinks,
        drinkData,
        setDrinkData,
        category,
        setCategory,

      } }
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
