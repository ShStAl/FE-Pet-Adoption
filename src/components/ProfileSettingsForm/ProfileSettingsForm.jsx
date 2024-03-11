import { useEffect, useState, useContext } from 'react';
import axios from '../../axios';
import { AuthContextInstance } from '../../context/AuthContext';
import ProfileSettingsBtn from '../ProfileSettingsBtn/ProfileSettingsBtn';

export default function ProfileSettingsForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  const { authenticated } = useContext(AuthContextInstance);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/user', { signal });
        const userData = await response.data;
        setEmail(userData.email);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setPhone(userData.phone);
        setBio(userData.bio);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage(error.message);
        }
      }
    }
    if (authenticated) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password) {
        const response = await axios.put('/update_user', {
          email,
          password,
          firstName,
          lastName,
          phone,
          bio,
        });
        setSuccessMessage(response.data.message);
      } else {
        const response = await axios.put('/update_user', {
          email,
          firstName,
          lastName,
          phone,
          bio,
        });
        setSuccessMessage(response.data.message);
      }
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response.data);
      setSuccessMessage('');
    }

    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center space-y-3 pb-10">
      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">First Name</label>
        <input
          className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">Last Name</label>
        <input
          className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">Email address</label>
        <input
          className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">Password</label>
        <input
          className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
      </div>

      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">Phone Number</label>
        <input
          className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="w-96 text-xl">
        <label className="block text-base px-1 py-1 text-gray-500">Bio</label>
        <textarea
          type="textarea"
          rows={4}
          className="form-textarea w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
          placeholder="Add some info about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <ProfileSettingsBtn submit={handleSubmit} />

      {successMessage !== '' ? <p className="text-green-800 text-xl">{successMessage}</p> : undefined}
      {errorMessage !== '' ? <p className="text-amber-800 text-xl">{errorMessage}</p> : undefined}

    </div>
  );
}
