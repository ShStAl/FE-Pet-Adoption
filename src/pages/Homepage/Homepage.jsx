import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import { AuthContextInstance } from '../../context/AuthContext';
import axios from '../../axios';

export default function HomePage() {
  const { authenticated } = useContext(AuthContextInstance);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get('/user', { signal });
        const userData = await response.data;
        setUser(userData);
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
    if (authenticated) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [authenticated]);

  return (
    <>
      <img
        src="https://res.cloudinary.com/dnhjfjdj0/image/upload/v1708260897/p0aldsonbxdjuqkvtnrq.png"
        alt="Animal"
        className="absolute left-[50px] top-0 hidden portrait:hidden h-5/6 lg:block"
      />

      <img
        src="https://res.cloudinary.com/dnhjfjdj0/image/upload/v1708277295/ju1flmxewbtedjzetzug.png"
        alt="Animal"
        className="absolute inset-x-0 bottom-0 lg:hidden"
      />

      {authenticated ? (
        <div className="z-10 portrait:w-full my-auto pb-72 lg:pb-20 flex items-center justify-center portrait:justify-center lg:w-1/2 lg:justify-normal lg:self-end">
          <div className="flex flex-col items-center space-y-5 px-4 text-5xl font-bold text-gray-500 md:text-7xl lg:items-start">
            <div className="border-amber-500 px-4 lg:border-l-4">
              {isLoading ? (
                <>
                  <p className="text-xl tracking-wide text-amber-500">
                    Welcome,
                  </p>
                  <div className="mt-3 space-y-3 animate-pulse">
                    <div className="w-56 h-14 bg-gray-300 rounded-3xl" />
                    <div className="w-72 h-14 bg-gray-300 rounded-3xl" />
                  </div>
                </>
              ) : errorMessage ? (
                <p className="text-amber-800 text-2xl">Network Error</p>
              ) : (
                <>
                  <p className="text-xl tracking-wide text-amber-500">
                    Welcome,
                  </p>
                  <div>
                    <p className="uppercase">
                      {user.firstName}
                    </p>
                    <p className="uppercase">
                      {user.lastName}
                    </p>
                  </div>
                </>
              )}
            </div>
            {!isLoading && !errorMessage ? (
              <div className="flex w-full flex-col space-y-3 px-6 lg:px-8 text-2xl lg:flex-row lg:space-x-5 lg:space-y-0 lg:text-xl">
                <NavLink className="lg:w-min text-center text-nowrap rounded-full bg-amber-500 px-6 py-2 text-white transition-all hover:bg-amber-800 active:scale-95" to="/my-pets">
                  My pets
                </NavLink>
                <NavLink className="lg:w-min text-center text-nowrap rounded-full bg-amber-500 px-6 py-2 text-white transition-all hover:bg-amber-800 active:scale-95" to="/profile">
                  Profile settings
                </NavLink>
              </div>
            ) : undefined}
          </div>
        </div>
      )
        : (
          <div className="z-10 my-auto flex items-center justify-center pb-72 lg:w-1/2 lg:justify-normal lg:self-end lg:pb-20 portrait:w-full portrait:justify-center">
            <div className="flex flex-col space-y-7 lg:space-y-5 px-4 text-5xl font-bold text-gray-500 lg:text-7xl">
              <div className="border-amber-500 lg:px-6 lg:border-l-4">
                <p className="tracking-wide text-amber-500 text-lg lg:text-xl">Welcome to the pet adoption agency!</p>
                <div className="flex space-x-4">
                  <p>MAKE</p>
                  <ReactTyped strings={['THEIR', 'YOUR']} typeSpeed={150} backSpeed={80} backDelay={1500} loop showCursor={false} className="text-amber-500" />
                </div>
                <p className="tracking-wide">LIFE BETTER</p>
              </div>
              <NavLink to="/search" className="w-full lg:w-min text-center lg:ml-8 text-nowrap rounded-full bg-amber-500 px-6 py-2 text-2xl lg:text-xl text-white transition-all hover:bg-amber-800 active:scale-95">
                Find your perfect match
              </NavLink>
            </div>
          </div>
        )}
    </>
  );
}
