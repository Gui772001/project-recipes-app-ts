import { useState } from 'react';

import Context from './Context';
import { ProviderProps, InitialFilterType } from '../../services/types';
import useFetch from '../hooks/useFetch';

function Provider({ children }: ProviderProps) {
  const initialfilter = {
    input: '',
    radio: '',
  };
  const [filter, setFilter] = useState<InitialFilterType>(initialfilter);
  const { data, loading } = useFetch(filter);
  const [btnRecipeText, setBtnRecipeText] = useState('Start Recipe');

  return (
    <Context.Provider
      value={ {
        data,
        loading,
        filter,
        setFilter,
        initialfilter,
        btnRecipeText,
        setBtnRecipeText,
      } }
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
