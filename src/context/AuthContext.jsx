import { useState, createContext } from 'react';

export const AuthContextInstance = createContext();

export default function AuthContext({ children }) {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('auth') === 'true');
  const [userId, setUserId] = useState(localStorage.getItem('userId') ?? null);
  const [admin, setAdmin] = useState(localStorage.getItem('admin') === 'true');

  return (
    <>
      <AuthContextInstance.Provider value={{
        authenticated, setAuthenticated, userId, setUserId, admin, setAdmin,
      }}
      >
        {children}
      </AuthContextInstance.Provider>
    </>
  );
}
