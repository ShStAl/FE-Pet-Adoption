import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';

export default function UserModal({ show, userId, closeModal }) {
  const [user, setUser] = useState({});
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/users/${userId}`, { signal });
        const userData = await response.data;
        setUser(userData);
        setRole(userData.role);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data);
          console.log(error.response);
        } else {
          setErrorMessage(error.message);
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const handleRoleChange = async () => {
    try {
      await axios.put('/update_role', {
        role,
        id: user._id,
      });
    } catch (error) {
      setErrorMessage(error.response.data);
      // setSuccessMessage('');
    }
    // setTimeout(() => {
    //   setErrorMessage('');
    //   setSuccessMessage('');
    // }, 4000);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md text-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isLoading
                      ? (
                        <div className="w-full h-36 pt-10 flex justify-center">
                          <p className="text-2xl">Loading...</p>
                        </div>
                      ) : errorMessage ? <p className="text-amber-800 text-xl uppercase pt-10">Network error</p>
                        : (
                          <div className="text-xl justify-center uppercase text-amber-500 flex space-x-2">
                            <p>
                              {user.firstName}
                            </p>
                            <p>{user.lastName}</p>
                          </div>
                        )}
                  </Dialog.Title>
                  {isLoading
                    ? (
                      <div className="w-full h-36 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="animate-spin"><path d="M3.38 8A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 9.215 7.182.75.75 0 1 0 1.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 0 0-9.5 5.452V4.75a.75.75 0 0 0-1.5 0V8.5a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H3.38Zm-.595 6.318a.75.75 0 0 0-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 0 0 1.5 0V15.5a1 1 0 0 0-1-1h-3.75a.75.75 0 0 0 0 1.5h2.37A9.502 9.502 0 0 1 12 21.5c-4.446 0-8.181-3.055-9.215-7.182Z" /></svg>
                      </div>
                    ) : errorMessage ? undefined
                      : (
                        <>
                          <div className="flex justify-center space-x-2 mt-5">
                            <p>
                              Phone:
                            </p>
                            <p>
                              {user.phone ? user.phone : ''}
                            </p>
                          </div>
                          <div className="flex justify-center space-x-2">
                            <p>
                              Email:
                            </p>
                            <p>
                              {user.email ? user.email : ''}
                            </p>
                          </div>
                          <div className="flex justify-center space-x-2">
                            <p>
                              Role:
                            </p>
                            <select className="form-select border-0" value={role} onChange={(e) => setRole(e.target.value)}>
                              <option value="Admin">Admin</option>
                              <option value="Basic">Basic</option>
                            </select>
                          </div>
                          <div className="flex justify-between mt-5 px-12">
                            {user.adoptedPets && user.adoptedPets.length > 0 ? (
                              <div className="flex flex-col items-center">
                                <p>Adopted pets: </p>
                                <ul>
                                  {user.adoptedPets.map((pet) => (
                                    <li key={pet._id} className="hover:text-amber-500 transition-colors">
                                      <NavLink to={`/pets/${pet._id}`}>{`${pet.type} ${pet.name}`}</NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p>No adopted pets</p>
                            )}
                            {user.fosteredPets && user.fosteredPets.length > 0 ? (
                              <div className="flex flex-col items-center">
                                <p>Fostered pets: </p>
                                <ul>
                                  {user.fosteredPets.map((pet) => (
                                    <li key={pet._id} className="hover:text-amber-500 transition-colors">
                                      <NavLink to={`/pets/${pet._id}`}>{`${pet.type} ${pet.name}`}</NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p>No fostered pets</p>
                            )}
                          </div>
                          <div className="flex justify-center space-x-10 mt-10">
                            <button className="rounded-xl bg-gray-500 px-5 py-1 text-white transition-all hover:bg-amber-800" onClick={closeModal}>
                              Close
                            </button>
                            <button className="rounded-xl bg-amber-500 px-5 py-1 text-white transition-all hover:bg-amber-800" onClick={handleRoleChange}>
                              Update
                            </button>
                          </div>
                        </>
                      )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
