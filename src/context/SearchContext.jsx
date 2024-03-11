import { createContext, useState } from 'react';
import axios from '../axios';

export const SearchContextInstance = createContext();

export default function SearchContext({ children }) {
  const [pets, setPets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  async function fetchData(criteria) {
    try {
      setIsLoading(true);
      const response = await axios.get('/pets', {
        signal,
        params: {
          ...criteria,
        },
      });
      const petsData = await response.data;
      setPets(petsData);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchContextInstance.Provider value={{
        fetchData, pets, setPets, isLoading, errorMessage, controller,
      }}
      >
        {children}
      </SearchContextInstance.Provider>
    </>
  );
}
