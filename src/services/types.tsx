export type Usuario = {
  senha: string;
  email: string;
  target: string;
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
  // loginAlertMessage: string,
  // setLoginAlertMessage: React.Dispatch<React.SetStateAction<string>>,
};
