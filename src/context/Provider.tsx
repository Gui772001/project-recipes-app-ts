import { useState } from 'react';
import Context from './Context';
import { ProviderProps } from '../services/types';

function Provider({ children }: ProviderProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  //   const [loginAlertMessage, setLoginAlertMessage] = useState('');

  return (
    <Context.Provider
      value={ {
        email,
        setEmail,
        password,
        setPassword,
        isFormValid,
        setFormValid,
      } }
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
