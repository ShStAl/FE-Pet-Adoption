import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContextInstance } from '../../context/AuthContext';
import AddPetForm from '../../components/AddPetForm/AddPetForm';

export default function AddPetPage() {
  const { authenticated, admin } = useContext(AuthContextInstance);

  return (
    <>
      {admin && authenticated
        ? (
          <>
            <AddPetForm />
          </>
        )
        : <Navigate to="/" replace />}
    </>
  );
}
