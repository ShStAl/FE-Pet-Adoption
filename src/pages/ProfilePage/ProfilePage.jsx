import { NavLink, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import ProfileSettingsForm from '../../components/ProfileSettingsForm/ProfileSettingsForm';
import { AuthContextInstance } from '../../context/AuthContext';

export default function ProfilePage() {
  const { authenticated } = useContext(AuthContextInstance);

  return (
    <>
      {authenticated
        ? (
          <div className="flex flex-col items-center mt-10 space-y-3 max-w-screen-md mx-auto">
            <NavLink className="text-amber-500 hover:text-amber-800 w-12 mb-3" to="/">
              <span className="material-symbols-outlined text-3xl">
                arrow_back
              </span>
            </NavLink>
            <ProfileSettingsForm />
          </div>
        )
        : <Navigate to="/" replace />}
    </>
  );
}
