import { useState } from 'react';
import UserModal from '../UserModal/UserModal';

export default function DashUsersList({ users }) {
  const userList = [...users];

  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleClick = (userId) => {
    setCurrentUser(userId);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentUser('');
  };

  return (
    <>
      <table className="max-w-screen-md mx-auto divide-y divide-gray-200 bg-white rounded-lg shadow-sm w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {userList.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="py-2">{user.firstName}</td>
              <td className="py-2">{user.lastName}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2 text-center">
                <button className="px-1 py-1 text-gray-500" onClick={() => handleClick(user._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal show={show} userId={currentUser} closeModal={handleCloseModal} />
    </>
  );
}
