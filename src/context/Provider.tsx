import { useEffect, useState } from 'react';
import Context from './Context';
import { ProviderProps } from '../services/types';

function Provider({ children }: ProviderProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [foodData, setFoodData] = useState<[]>([]);
  const [filterDriks, setFilterDriks] = useState('');
  const [foodDataDrinks, setFoodDataDrinks] = useState<[]>([]);
  

  //   const [loginAlertMessage, setLoginAlertMessage] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}`);
      const data = await response.json();
      setFoodData(data.meals);
    };
    fetchFood();
  }, [filter]);
  useEffect(() => {
    const fetchDrinks = async () => {
      const resposta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filterDriks}`);
      const resp = await resposta.json();
      setFoodDataDrinks(resp.drinks)
    };
    fetchDrinks();
  }, [filterDriks]);

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
        setFilterDriks,
        filterDriks,
        foodDataDrinks,
        setFoodDataDrinks
        
      } }
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
