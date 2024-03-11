import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContextInstance } from '../../context/AuthContext';
import LogBtn from '../LogBtn/LogBtn';

export default function MobileNavBar() {
  const [nav, setNav] = useState(false);

  const { admin, authenticated } = useContext(AuthContextInstance);

  const handleNav = () => {
    setNav((prev) => setNav(!prev));
  };

  return (
    <div className="tablet:hidden">
      <button onClick={handleNav}>
        <span className="material-symbols-outlined text-3xl transition-all">
          {nav ? 'close' : 'menu'}
        </span>
      </button>
      <div className={`${nav ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 h-full w-full z-10 duration-300 transition-all flex`}>
        <button className="h-full w-full" onClick={handleNav} />
        <div className="bg-amber-800 w-96">
          <div className="flex items-center px-5 py-2 justify-end">
            <button className="pt-1" onClick={handleNav}>
              <span className="material-symbols-outlined text-3xl transition-all">
                {nav ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          <ul className="py-5 px-5 text-2xl flex flex-col space-y-3">
            <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/">HOME</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/search">SEARCH</NavLink>
            {authenticated ? <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/my-pets">MY PETS</NavLink> : undefined}
            {authenticated ? <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/profile">SETTINGS</NavLink> : undefined}
            {admin && authenticated ? <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/add-pet">ADD PET</NavLink> : undefined}
            {admin && authenticated ? <NavLink className={({ isActive }) => (isActive ? 'text-[#faf5f0]' : '')} onClick={handleNav} to="/dashboard">DASHBOARD</NavLink> : undefined}
          </ul>
          <div className="text-2xl pt-5 px-5 border-t border-amber-500" onClick={handleNav}>
            <LogBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
