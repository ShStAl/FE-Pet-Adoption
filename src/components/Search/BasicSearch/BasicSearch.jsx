import { useState, useContext, useEffect } from 'react';
import { SearchContextInstance } from '../../../context/SearchContext';
import { AuthContextInstance } from '../../../context/AuthContext';
import PetsList from '../../PetsList/PetsList';

export default function BasicSearch() {
  const { fetchData, controller, pets } = useContext(SearchContextInstance);
  const { authenticated } = useContext(AuthContextInstance);

  const [animalType, setAnimalType] = useState(localStorage.getItem('animalType') ?? '');
  const [offset, setOffset] = useState(0);
  const limit = 4;

  useEffect(() => {
    const criteria = {
      type: animalType,
      offset,
      limit,
    };
    fetchData(criteria);

    return () => {
      controller.abort();
    };
  }, [authenticated, offset]);

  const handleSearch = () => {
    const criteria = {
      type: animalType,
      offset,
      limit,
    };
    fetchData(criteria);
    localStorage.setItem('animalType', animalType);
  };

  const handleClear = () => {
    setAnimalType('');
    setOffset(0);
    localStorage.removeItem('animalType');
    fetchData();
  };

  const handleNext = () => {
    setOffset((prev) => prev + 4);
  };

  const handlePrev = () => {
    setOffset((prev) => prev - 4);
  };

  return (
    <div className="w-full flex flex-col pb-10 items-center">
      <div className="flex flex-col w-52 text-xl md:text-lg space-y-3">
        <select className="form-select rounded-xl border-0 px-3 py-1 shadow-sm" value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
          <option value="">Pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <div className="flex justify-between">
          <button className="text-white px-3 py-1 rounded-xl bg-gray-500" onClick={handleClear}>Clear</button>
          <button className="text-white px-3 py-1 rounded-xl bg-amber-500" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <PetsList />
      <div className="flex w-52 justify-between">
        <button disabled={offset == 0} onClick={handlePrev} className="bg-amber-500 text-white px-4 py-1 text-lg rounded-xl active:scale-95 ease-in-out transition-all disabled:bg-gray-300">Prev</button>
        <button disabled={pets.length < limit} onClick={handleNext} className="bg-amber-500 text-white px-4 py-1 text-lg rounded-xl active:scale-95 ease-in-out transition-all disabled:bg-gray-300">Next</button>
      </div>
    </div>
  );
}
