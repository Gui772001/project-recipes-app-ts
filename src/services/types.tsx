export type Usuario = {
  senha: string;
  email: string;
  target: string;
};
export type FoodDataType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
  strInstructions: string,
};

export type DrinkDataType = {
  Cocktails: [
    {
      idcocktail: string,
      strcocktail: string,
      strcocktailThumb: string,
      strInstructions: string,
    },
  ]
};

export type ProviderProps = {
  children: React.ReactNode;
};

export type ContextType = {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isFormValid: boolean,
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedRadio: string,
  setSelectedRadio: React.Dispatch<React.SetStateAction<string>>;
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  foodData: FoodDataType[],
  setFoodData: React.Dispatch<React.SetStateAction<FoodDataType[]>>;
  drinkData: DrinkDataType,
  setDrinkData: React.Dispatch<React.SetStateAction<DrinkDataType>>;
};
