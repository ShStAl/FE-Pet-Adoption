import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Resize } from '@cloudinary/url-gen/actions';
import { AuthContextInstance } from '../../context/AuthContext';
import { ModalContextInstance } from '../../context/ModalContext';
import axios from '../../axios';
import cld from '../../cloudinary';
import SinglePetSkeleton from '../LoadingSkeletons/SinglePetSkeleton';

export default function DisplayPetInfo() {
  const navigate = useNavigate();

  const { authenticated, userId } = useContext(AuthContextInstance);
  const { handleShowModal } = useContext(ModalContextInstance);

  const [isLoading, setIsLoading] = useState(false);
  const [netError, setNetError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  const [pet, setPet] = useState({});
  const [saved, setSaved] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const [fostered, setFostered] = useState(false);

  const isAdoptedByAnotherUser = (pet.status !== 'Available' && adopted === false && fostered === false);

  const { id } = useParams();

  async function fetchData() {
    try {
      const response = await axios.get(`/pets/${id}`, { signal });
      const petData = await response.data.pet;

      if (userId) {
        setSaved(petData.savedBy.indexOf(userId) >= 0);

        if (petData.owner) {
          setAdopted(petData.status === 'Adopted' && petData.owner === userId);
          setFostered(petData.status === 'Fostered' && petData.owner === userId);
        }
      }
      setPet(petData);
    } catch (error) {
      if (error.response) {
        setNetError(error.response.data);
      } else {
        setNetError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();

    return () => {
      controller.abort();
    };
  }, [authenticated]);

  const handleSave = async () => {
    try {
      await axios.put(`/pets/${id}/save`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
    fetchData();
  };

  const handleUnsave = async () => {
    try {
      await axios.delete(`/pets/${id}/unsave`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
    fetchData();
  };

  const handleGet = async (status) => {
    try {
      await axios.put(`/pets/${id}/${status}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
    fetchData();
  };

  const handleReturn = async () => {
    try {
      await axios.delete(`/pets/${id}/return`);
      setAdopted(false);
      setFostered(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
    fetchData();
  };

  return (
    <>
      {isLoading ? <SinglePetSkeleton />
        : netError ? (
          <div className="flex w-full flex-col items-center justify-center pt-10">
            <button className="text-amber-500 hover:text-amber-800 w-12" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined text-3xl">
                arrow_back
              </span>
            </button>
            <p className="text-amber-800 text-xl uppercase pt-10">Network Error</p>
          </div>
        )
          : (
            <div className="max-w-screen-md mx-auto my-10 flex flex-col space-y-5 items-center">
              <button className="text-amber-500 hover:text-amber-800 w-12" onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined text-3xl">
                  arrow_back
                </span>
              </button>
              <div className="bg-white pb-2 rounded-xl shadow-md">
                <div className="overflow-hidden text-center w-96 h-72 rounded-t-xl">
                  <AdvancedImage
                    cldImg={cld.image(pet.image)
                      .resize(Resize.thumbnail().width(800).height(800).gravity('auto'))}
                    alt="Failed to load image"
                  />
                </div>
                <div className="flex px-2 py-3 justify-between font-bold text-2xl">
                  <p className="text-amber-500">{pet.name}</p>
                  <p className={pet.status === 'Available'
                    ? 'text-lime-600'
                    : (pet.status === 'Fostered'
                      ? 'text-amber-600'
                      : 'text-red-600')}
                  >
                    {pet.status}
                  </p>
                </div>
                <div className=" flex flex-col space-y-3 text-xl px-2 w-96 text-gray-600">
                  <div className="flex justify-between">
                    <p className={pet.type ? '' : 'hidden'}>
                      <span className="text-gray-400 mr-2">Type:</span>
                      {pet.type}
                    </p>
                    <p className={pet.height ? '' : 'hidden'}>
                      <span className="text-gray-400 mr-2">Height:</span>
                      {`${pet.height} in`}
                    </p>
                  </div>
                  <div className="flex justify-between">

                    <p className={pet.breed ? '' : 'hidden'}>
                      <span className="text-gray-400 mr-2">Breed:</span>
                      {pet.breed}
                    </p>
                    <p className={pet.weight ? '' : 'hidden'}>
                      <span className="text-gray-400 mr-2">Weight:</span>
                      {`${pet.weight} lbs`}
                    </p>
                  </div>
                  <p className={pet.color ? '' : 'hidden'}>
                    <span className="text-gray-400 mr-2">Color:</span>
                    {pet.color}
                  </p>
                  <p className={pet.hypoallergenic ? '' : 'hidden'}>
                    <span className="text-gray-400 mr-2">Hypoallergenic:</span>
                    {pet.hypoallergenic ? 'Yes' : 'No'}
                  </p>
                  <p className={pet.dietaryRestrictions ? '' : 'hidden'}>
                    <span className="text-gray-400 mr-2">Dietary:</span>
                    {pet.dietaryRestrictions}
                  </p>
                  <p className={pet.bio ? 'w-auto' : 'hidden'}>
                    <span className="text-gray-400 mr-2">Bio:</span>
                    {pet.bio}
                  </p>
                </div>
                <div className="mt-5 text-xl flex justify-center">
                  {isAdoptedByAnotherUser ? (
                    <button className="bg-amber-500 text-white w-24 py-1 rounded-lg hover:bg-amber-700 transition-all active:scale-95 ease-in-out" onClick={authenticated ? (saved ? handleUnsave : handleSave) : handleShowModal}>
                      {saved && authenticated ? 'Unsave' : 'Save'}
                    </button>
                  ) : (
                    <div className="flex w-full px-2 justify-between">
                      <button className={(authenticated && adopted) ? 'hidden' : 'bg-lime-600 text-white w-24 py-1 rounded-lg hover:bg-lime-800 transition-all active:scale-95 ease-in-out'} onClick={authenticated ? () => handleGet('Adopted') : handleShowModal}>
                        Adopt
                      </button>
                      <button className={(authenticated && (fostered || adopted)) ? 'hidden' : 'bg-amber-600 text-white w-24 py-1 rounded-lg hover:bg-amber-800 transition-all active:scale-95 ease-in-out'} onClick={authenticated ? () => handleGet('Fostered') : handleShowModal}>
                        Foster
                      </button>
                      <button className={(adopted || fostered) && authenticated ? 'bg-red-600 text-white w-24 py-1 rounded-lg hover:bg-red-800 transition-all active:scale-95 ease-in-out' : 'hidden'} onClick={authenticated ? handleReturn : handleShowModal}>
                        Return
                      </button>
                      <button className="bg-amber-500 text-white w-24 py-1 rounded-lg hover:bg-amber-700 transition-all active:scale-95 ease-in-out" onClick={authenticated ? (saved ? handleUnsave : handleSave) : handleShowModal}>
                        {saved && authenticated ? 'Unsave' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {errorMessage ? <p className="text-amber-800 text-xl uppercase pt-10">{errorMessage}</p> : undefined}
            </div>
          )}
    </>

  );
}
