import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import LogBtn from '../LogBtn/LogBtn';
import AuthModal from '../AuthModal/AuthModal';
import { AuthContextInstance } from '../../context/AuthContext';
import UserDropdown from '../UserDropdown/UserDropdown';
import MobileNavBar from '../MobileNavBar/MobileNavBar';

export default function Layout() {
  const { admin, authenticated } = useContext(AuthContextInstance);

  const activeLink = "inline-block relative after:border-amber-500 after:transition-all after:md:border-b-2 after:content-[''] after:left-1/4 after:absolute after:w-1/2 after:bottom-0";

  return (
    <div className="flex h-auto min-h-screen flex-col bg-[#faf5f0] w-full">
      <div className="flex items-center justify-between px-5 py-2 text-amber-500 z-20">
        <NavLink to="/" className="text-3xl w-44 font-bold lg:text-5xl transition-all">PETS.</NavLink>
        <ul className="hidden pt-2 space-x-5 lg:space-x-10 text-xl tablet:flex">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : 'hover:text-amber-800 h-8 pb-1 transition-all')}
          >
            HOME
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => (isActive ? activeLink : 'hover:text-amber-800 h-8 pb-1 transition-all')}>SEARCH</NavLink>
          {admin && authenticated ? <NavLink to="/add-pet" className={({ isActive }) => (isActive ? activeLink : 'hover:text-amber-800 pb-1 transition-all')}>ADD PET</NavLink> : undefined}
          {admin && authenticated ? <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : 'hover:text-amber-800 pb-1 transition-all')}>DASHBOARD</NavLink> : undefined}
        </ul>
        <div className="flex w-44 justify-end items-center space-x-5">
          {authenticated ? <UserDropdown /> : undefined}
          <div className="hidden text-xl tablet:flex hover:text-amber-800 transition-all">
            <LogBtn />
          </div>
        </div>
        <MobileNavBar />
      </div>
      <AuthModal />
      <Outlet />
    </div>
  );
}
