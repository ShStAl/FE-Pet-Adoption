import { NavLink } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Resize } from '@cloudinary/url-gen/actions';
import { useContext, useEffect, useState } from 'react';
import { AuthContextInstance } from '../../context/AuthContext';
import { ModalContextInstance } from '../../context/ModalContext';
import axios from '../../axios';
import cld from '../../cloudinary';

export default function PetCard({ pet, fetchFunc }) {
  const {
    _id, name, status, image, height, weight, savedBy,
  } = pet;

  const { userId, authenticated } = useContext(AuthContextInstance);
  const { handleShowModal } = useContext(ModalContextInstance);

  const [save, setSave] = useState(authenticated && savedBy.indexOf(userId) >= 0);

  useEffect(() => {
    setSave(authenticated && savedBy.indexOf(userId) >= 0);
  }, [authenticated]);

  const handleSave = async () => {
    try {
      if (save) {
        await axios.delete(`/pets/${_id}/unsave`);
      } else {
        await axios.put(`/pets/${_id}/save`);
      }
      setSave((prev) => !prev);
      if (fetchFunc) {
        fetchFunc();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else console.log(error.message);
    }
  };

  return (

    <div className="flex flex-col bg-white rounded-3xl shadow-md overflow-hidden w-64">
      <div className="overflow-hidden text-center">
        <AdvancedImage
          cldImg={cld.image(image)
            .resize(Resize.thumbnail().width(800).height(800).gravity('auto'))}
          className="hover:scale-110 ease-in-out duration-500"
          alt="Failed to load image"
        />
      </div>
      <div className="flex px-3 py-2 justify-between font-bold text-xl">
        <p className="text-amber-500">{name}</p>
        <p className={status === 'Available'
          ? 'text-lime-600'
          : (status === 'Fostered'
            ? 'text-amber-600'
            : 'text-red-600')}
        >
          {status}
        </p>
      </div>
      <div className="flex px-3 py-2 justify-between text-lg items-center">
        <div className="flex flex-col">
          <p className={height ? 'text-gray-500' : 'hidden'}>
            {`${height} in`}
          </p>
          <p className={weight ? 'text-gray-500' : 'hidden'}>
            {`${weight} lbs`}
          </p>
        </div>
        <div className="flex items-center border-2 border-amber-500 rounded-3xl">
          <button className="mx-2 active:scale-125 ease-in-out duration-100" onClick={authenticated ? handleSave : handleShowModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={save ? 'rgb(245 158 11)' : 'none'} viewBox="0 0 24 24" stroke="rgb(245 158 11)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <NavLink className="rounded-3xl text-base bg-amber-500 px-4 py-2 font-medium text-white transition-all hover:bg-amber-800" to={`/pets/${_id}`}>
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
}
