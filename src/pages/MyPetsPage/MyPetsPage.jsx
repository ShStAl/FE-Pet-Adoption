import { NavLink, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { AuthContextInstance } from '../../context/AuthContext';
import UserPetsList from '../../components/UserPetsList/UserPetsList';
import axios from '../../axios';
import CardSkeleton from '../../components/LoadingSkeletons/CardSkeleton';

export default function MyPetsPage() {
  const { authenticated } = useContext(AuthContextInstance);
  const [activeTab, setActiveTab] = useState('myPets');
  const [pets, setPets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  async function fetchMyPetsData() {
    try {
      setIsLoading(true);
      const response = await axios.get('/pets/user', {
        signal,
        params: {
          show: activeTab,
        },
      });
      const petsData = await response.data;

      if (activeTab === 'myPets') {
        setPets(petsData.adoptedPets.concat(petsData.fosteredPets));
      } else {
        setPets(petsData.savedPets);
      }
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

  useEffect(() => {
    fetchMyPetsData();

    return () => {
      controller.abort();
    };
  }, [activeTab]);

  const handleChange = () => {
    if (activeTab === 'myPets') {
      setActiveTab('savedPets');
    } else {
      setActiveTab('myPets');
    }
  };

  return (
    <>
      {authenticated
        ? (
          <div className="flex flex-col items-center mt-10 space-y-3">
            <NavLink className="text-amber-500 hover:text-amber-800 w-12 mb-3" to="/">
              <span className="material-symbols-outlined text-3xl">
                arrow_back
              </span>
            </NavLink>
            <div className="flex space-x-3 justify-center items-center">
              <p className={`${activeTab === 'myPets' ? 'text-amber-500' : 'text-gray-500'} text-xl transition-all`}>My pets</p>
              <Switch
                checked={activeTab !== 'myPets'}
                onChange={handleChange}
                className="bg-amber-500 relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75"
              >
                <span className="sr-only">Search type</span>
                <span
                  aria-hidden="true"
                  className={`${activeTab !== 'myPets' ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className={`${activeTab !== 'myPets' ? 'text-amber-500' : 'text-gray-500'} text-xl transition-all`}>Saved pets</p>
            </div>
            {isLoading
              ? (
                <>
                  <div className="flex max-w-screen-xl mx-auto pt-3 my-30 gap-10 justify-center h-full flex-wrap">
                    <CardSkeleton />
                  </div>
                </>
              )
              : (errorMessage
                ? <p className="text-amber-800 text-xl uppercase pt-10">Network error</p>
                : <UserPetsList pets={pets} fetchFunc={fetchMyPetsData} />
              )}
          </div>
        )
        : <Navigate to="/" replace />}
    </>
  );
}
