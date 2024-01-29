import { useState } from 'react';

import Context from './Context';
import { ProviderProps, InitialFilterType } from '../services/types';
import useFetch from '../components/hook/useFetch';

function Provider({ children }: ProviderProps) {
  const initialfilter = {
    input: '',
    radio: '',
  };
  const [filter, setFilter] = useState<InitialFilterType>(initialfilter);
  const { data, loading } = useFetch(filter); // useEffect é chamado toda vez que altera o filter

  // console.log(loading);
  // console.log(data);
  // console.log(filter);

  // useEffect(() => {
  // }, [filter, data]); -> não está fazendo nada

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
