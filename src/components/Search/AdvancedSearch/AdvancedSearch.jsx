import { useState, useContext, useEffect } from 'react';
import { SearchContextInstance } from '../../../context/SearchContext';
import { AuthContextInstance } from '../../../context/AuthContext';
import PetsList from '../../PetsList/PetsList';

export default function AdvancedSearch() {
  const { fetchData, controller, pets } = useContext(SearchContextInstance);
  const { authenticated } = useContext(AuthContextInstance);

  const [adoptionStatus, setAdoptionStatus] = useState(localStorage.getItem('adoptionStatus') ?? '');
  const [height, setHeight] = useState(localStorage.getItem('height') ?? '');
  const [weight, setWeight] = useState(localStorage.getItem('weight') ?? '');
  const [animalType, setAnimalType] = useState(localStorage.getItem('animalType') ?? '');
  const [name, setName] = useState(localStorage.getItem('name') ?? '');

  const [offset, setOffset] = useState(0);
  const limit = 4;

  useEffect(() => {
    const criteria = {
      type: animalType,
      height: height || null,
      weight: weight || null,
      status: adoptionStatus,
      name,
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
      height: height || null,
      weight: weight || null,
      status: adoptionStatus,
      name,
      offset,
      limit,
    };
    localStorage.setItem('adoptionStatus', adoptionStatus);
    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);
    localStorage.setItem('animalType', animalType);
    localStorage.setItem('name', name);
    fetchData(criteria);
  };

  const handleClear = () => {
    setOffset(0);
    setAdoptionStatus('');
    localStorage.removeItem('adoptionStatus');
    setHeight('');
    localStorage.removeItem('height');
    setWeight('');
    localStorage.removeItem('weight');
    setAnimalType('');
    localStorage.removeItem('animalType');
    setName('');
    localStorage.removeItem('name');
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
        <input
          className="form-input rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select className="form-select rounded-xl border-0 px-3 py-1 shadow-sm" value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)}>
          <option value="">Adoption status</option>
          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fostered</option>
          <option value="Available">Available</option>
        </select>
        <input
          className="form-input rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="number"
          min={0}
          placeholder="Height (in.)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          className="form-input rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="number"
          min={0}
          placeholder="Weight (lbs.)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
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
