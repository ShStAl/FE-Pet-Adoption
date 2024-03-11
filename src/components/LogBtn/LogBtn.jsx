import { useContext } from 'react';
import { AuthContextInstance } from '../../context/AuthContext';
import { ModalContextInstance } from '../../context/ModalContext';
import axios from '../../axios';

export default function LogBtn() {
  const {
    authenticated, setAuthenticated, setUserId, setAdmin,
  } = useContext(AuthContextInstance);

  const { handleShowModal } = useContext(ModalContextInstance);

  const handleLogOut = async () => {
    try {
      await axios.get('/logout');

      localStorage.removeItem('auth');
      setAuthenticated(false);

      localStorage.removeItem('userId');
      setUserId(null);

      localStorage.removeItem('admin');
      setAdmin(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {authenticated
        ? (
          <>
            <span className="material-symbols-outlined">
              logout
            </span>
            <button onClick={handleLogOut}>
              LOG OUT
            </button>
          </>
        )
        : (
          <>
            <span className="material-symbols-outlined">
              login
            </span>
            <button onClick={handleShowModal}>
              LOG IN
            </button>
          </>
        )}
    </div>
  );
}
