export type ProviderProps = {
  children: React.ReactNode;
};

export type ContextType = {
  data: FoodType[] | DrinkType[] | any,
  loading: boolean,
  filter: InitialFilterType,
  setFilter: React.Dispatch<React.SetStateAction<InitialFilterType>>
  initialfilter: InitialFilterType;
  btnRecipeText: string;
  setBtnRecipeText: React.Dispatch<React.SetStateAction<string>>;
  clipboard: string;
  setClipboard: React.Dispatch<React.SetStateAction<string>>;
};

export type InitialFilterType = {
  input: string,
  radio: string,
};
export type InitialUserType = {
  email: string,
  password: string,
};

export type FastButtonsPropsType = {
  location: string,
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string;
  strTags: string;
  strVideo: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string | null;
  strInstructionsIT: string;
  strInstructionsZH_HANS: string | null;
  strInstructionsZH_HANT: string | null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type FoodType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  strAlcoholic: string;
  strCategory: string;
  strYoutube: string;
};

export type Drink = {
  idDrink: string;
  strDrink: string;
  strArea: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strAlcoholic: string;
};

export type FavRecipesType =
  {
    id: string,
    type: string,
    nationality: string,
    category:string,
    alcoholicOrNot:string,
    name:string,
    image:string,
  };

export type RecipeType = {
  id: string;
  type: string;
  image: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  name: string;
  category?: string;
  nationality?: string;
  doneDate: string;
  tags?: string[];
  alcoholicOrNot?: string;
};

export type RecipeDetailsProps = {
  type: string;
  favorite: boolean;
  setCopyLink: (value: boolean) => void;
  youtubeEmbedUrl: string;
  location: any;
  recipe: Meal | Drink;
  meal: Meal;
  drink: Drink;
  ingredients: string[];
  handleButtonStart: () => void;
  copyClipboard: (location: any, setCopyLink: any) => Promise<void>;
  handleMealFavorite: () => void;
  handleDrinkFavorite: () => void;
  copyLink: boolean;
  btnRecipeText: string;
};
