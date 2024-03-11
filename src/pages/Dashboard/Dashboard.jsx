import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashUsersList from '../../components/DashUsersList/DashUsersList';
import DashPetsList from '../../components/DashPetsList/DashPetsList';
import { AuthContextInstance } from '../../context/AuthContext';
import axios from '../../axios';
import DashboardSkeleton from '../../components/LoadingSkeletons/DashboardSkeleton';

export default function Dashboard() {
  const { authenticated, admin } = useContext(AuthContextInstance);
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);

  const [isLoadingU, setIsLoadingU] = useState(false);
  const [isLoadingP, setIsLoadingP] = useState(false);
  const [errorMessageU, setErrorMessageU] = useState('');
  const [errorMessageP, setErrorMessageP] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoadingU(true);
        const response = await axios.get('/users', { signal });
        const usersData = await response.data;
        setUsers(usersData);
      } catch (error) {
        if (error.response) {
          setErrorMessageU(error.response.data);
        } else {
          setErrorMessageU(error.message);
        }
      } finally {
        setIsLoadingU(false);
      }
    }
    async function fetchPets() {
      try {
        setIsLoadingP(true);
        const response = await axios.get('/pets', { signal });
        const petsData = await response.data;
        setPets(petsData);
      } catch (error) {
        if (error.response) {
          setErrorMessageP(error.response.data);
        } else {
          setErrorMessageP(error.message);
        }
      } finally {
        setIsLoadingP(false);
      }
    }
    fetchUsers();
    fetchPets();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {admin && authenticated
        ? (
          <div className="mt-10 flex flex-col items-center">
            <p className="uppercase text-gray-500 text-xl mb-3">Users</p>
            {isLoadingU ? <DashboardSkeleton /> : errorMessageU ? <p className="text-amber-800 text-xl uppercase pt-10">Network error</p> : <DashUsersList users={users} />}
            <p className="uppercase text-gray-500 text-xl mt-10 mb-3">Pets</p>
            {isLoadingP ? <DashboardSkeleton /> : errorMessageP ? <p className="text-amber-800 text-xl uppercase pt-10">Network error</p> : <DashPetsList pets={pets} />}
          </div>
        )
        : <Navigate to="/" replace />}
    </>
  );
}
