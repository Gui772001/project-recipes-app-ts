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
  console.log(filter);

  return (
    <Context.Provider
      value={ {
        data,
        loading,
        filter,
        setFilter,
        initialfilter,
      } }
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
