export type Usuario = {
  senha: string;
  email: string;
  target: string;
};
export type FoodDataType = {
  meals: [
    {
      idMeal: string,
      strMeal: string,
      strMealThumb: string,
    },
  ];
};
export type DrinkDataType = {
  Cocktails: [
    {
      idcocktail: string,
      strcocktail: string,
      strcocktailThumb: string,
    },
  ];
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
  foodData: FoodDataType[],
  setFoodData: React.Dispatch<React.SetStateAction<[]>>;
  setFilterDriks: React.Dispatch<React.SetStateAction<string>>;
  filterDriks:string
  foodDataDrinks :DrinkDataType[]
  setFoodDataDrinks : React.Dispatch<React.SetStateAction<[]>>
};
