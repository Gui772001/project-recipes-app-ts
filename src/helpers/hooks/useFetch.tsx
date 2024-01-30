import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InitialFilterType } from '../../services/types';
import buildURL from '../../services/buildURL';

function useFetch(filter: InitialFilterType) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath !== '/meals' && currentPath !== '/drinks') {
      return;
    }
    const fetchData = async () => {
      const apiURL = buildURL(filter, currentPath);
      const response = await fetch(apiURL);
      const result = await response.json();
      if (result.meals === null || result.drinks === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters');
      }
      console.log(result);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [filter, currentPath]);

  return { data, loading };
}

export default useFetch;
