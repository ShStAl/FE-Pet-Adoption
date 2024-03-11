import { useState, useContext } from 'react';
import { AuthContextInstance } from '../../../context/AuthContext';
import { ModalContextInstance } from '../../../context/ModalContext';
import axios from '../../../axios';

export default function LogForm() {
  const { setAuthenticated, setUserId, setAdmin } = useContext(AuthContextInstance);
  const { handleCloseModal } = useContext(ModalContextInstance);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      setErrorMessage('');

      localStorage.setItem('auth', true);
      setAuthenticated(true);

      localStorage.setItem('userId', response.data.id);
      setUserId(response.data.id);

      localStorage.setItem('admin', response.data.role === 'Admin');
      setAdmin(response.data.role === 'Admin');

      handleCloseModal();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col text-xl space-y-3">
      <div className="mt-3">
        <label className="block text-base text-gray-500">Email Address</label>

        <div className="relative flex items-center mt-2">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </span>

          <input
            type="email"
            placeholder="john@example.com"
            className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-12 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-amber-500 focus:outline-none focus:ring focus:ring-opacity-40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-base text-gray-500">Password</label>

        <div className="relative flex items-center mt-2">
          <button onClick={() => setShowPassword((prev) => !prev)} className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
            {!showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 hover:text-gray-500">
                <path d="M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
                <path d="M12 3.5c3.432 0 6.124 1.534 8.054 3.241 1.926 1.703 3.132 3.61 3.616 4.46a1.6 1.6 0 0 1 0 1.598c-.484.85-1.69 2.757-3.616 4.461-1.929 1.706-4.622 3.24-8.054 3.24-3.432 0-6.124-1.534-8.054-3.24C2.02 15.558.814 13.65.33 12.8a1.6 1.6 0 0 1 0-1.598c.484-.85 1.69-2.757 3.616-4.462C5.875 5.034 8.568 3.5 12 3.5ZM1.633 11.945a.115.115 0 0 0-.017.055c.001.02.006.039.017.056.441.774 1.551 2.527 3.307 4.08C6.691 17.685 9.045 19 12 19c2.955 0 5.31-1.315 7.06-2.864 1.756-1.553 2.866-3.306 3.307-4.08a.111.111 0 0 0 .017-.056.111.111 0 0 0-.017-.056c-.441-.773-1.551-2.527-3.307-4.08C17.309 6.315 14.955 5 12 5 9.045 5 6.69 6.314 4.94 7.865c-1.756 1.552-2.866 3.306-3.307 4.08Z" />
              </svg>
            ) : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 hover:text-gray-500"><path d="M8.052 5.837A9.715 9.715 0 0 1 12 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.11.11 0 0 1 .016.055.122.122 0 0 1-.017.06 16.766 16.766 0 0 1-1.53 2.218.75.75 0 1 0 1.163.946 18.253 18.253 0 0 0 1.67-2.42 1.607 1.607 0 0 0 .001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 0 0 .604 1.373Zm11.114 12.15C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.606 1.606 0 0 1 .001-1.6A18.283 18.283 0 0 1 3.648 7.01L1.317 5.362a.75.75 0 1 1 .866-1.224l20.5 14.5a.75.75 0 1 1-.866 1.224ZM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.112.112 0 0 0-.017.059c0 .015.003.034.016.055.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 0 1-5.583-3.949L4.902 7.899Z" /></svg>}

          </button>
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 30" strokeWidth="0" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M 20 3 C 15.054688 3 11 7.054688 11 12 C 11 12.519531 11.085938 12.976563 11.15625 13.4375 L 3.28125 21.28125 L 3 21.59375 L 3 29 L 10 29 L 10 26 L 13 26 L 13 23 L 16 23 L 16 20.03125 C 17.179688 20.609375 18.554688 21 20 21 C 24.945313 21 29 16.945313 29 12 C 29 7.054688 24.945313 3 20 3 Z M 20 5 C 23.855469 5 27 8.144531 27 12 C 27 15.855469 23.855469 19 20 19 C 18.789063 19 17.542969 18.644531 16.59375 18.125 L 16.34375 18 L 14 18 L 14 21 L 11 21 L 11 24 L 8 24 L 8 27 L 5 27 L 5 22.4375 L 12.90625 14.5 L 13.28125 14.15625 L 13.1875 13.625 C 13.085938 13.023438 13 12.488281 13 12 C 13 8.144531 16.144531 5 20 5 Z M 22 8 C 20.894531 8 20 8.894531 20 10 C 20 11.105469 20.894531 12 22 12 C 23.105469 12 24 11.105469 24 10 C 24 8.894531 23.105469 8 22 8 Z" />
            </svg>
          </span>

          <input
            type={!showPassword ? 'password' : 'text'}
            placeholder="********"
            className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-12 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-amber-500 focus:outline-none focus:ring focus:ring-opacity-40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="rounded-xl bg-gray-500 px-3 py-1 text-white transition-all hover:bg-amber-800" onClick={handleCloseModal}>
          Close
        </button>
        {errorMessage !== '' ? <p className="py-1 px-4 text-amber-800">{errorMessage}</p> : undefined}
        <button className="rounded-xl bg-amber-500 px-3 py-1 text-white transition-all hover:bg-amber-800" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
