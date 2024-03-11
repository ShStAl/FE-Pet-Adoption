import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Layout from './components/Layout/Layout';
import SearchPage from './pages/SearchPage/SearchPage';
import MyPetsPage from './pages/MyPetsPage/MyPetsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SinglePetPage from './pages/SinglePetPage/SinglePetPage';
import Dashboard from './pages/Dashboard/Dashboard';
import AddPetPage from './pages/AddPetPage/AddPetPage';
import SearchContext from './context/SearchContext';
import ModalContext from './context/ModalContext';
import AuthContext from './context/AuthContext';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <ModalContext>
            <AuthContext>
              <Layout />
            </AuthContext>
          </ModalContext>
        )}
      >
        <Route index element={<Homepage />} />
        <Route
          path="/search"
          element={(
            <SearchContext>
              <SearchPage />
            </SearchContext>
          )}
        />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/pets/:id/:mode?" element={<SinglePetPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPetPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
