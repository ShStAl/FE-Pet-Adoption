import { NavLink } from 'react-router-dom';

export default function DashPetsList({ pets }) {
  const petList = [...pets];

  return (
    <>
      <table className="max-w-screen-md mx-auto divide-y mb-10 divide-gray-200 bg-white rounded-lg shadow-sm w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2">Type</th>
            <th className="py-2">Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {petList.map((pet) => (
            <tr key={pet._id} className="text-center">
              <td className="py-2">{pet.type}</td>
              <td className="py-2">{pet.name}</td>
              <td className="py-2">{pet.status}</td>
              <td className="py-3 flex justify-center">
                <NavLink to={`/pets/${pet._id}/edit`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
