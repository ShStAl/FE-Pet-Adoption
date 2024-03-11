import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Resize } from '@cloudinary/url-gen/actions';
import { AuthContextInstance } from '../../context/AuthContext';
import axios from '../../axios';
import cld from '../../cloudinary';

export default function EditPetInfo() {
  const navigate = useNavigate();

  const { authenticated, admin } = useContext(AuthContextInstance);

  const [isLoading, setIsLoading] = useState(false);
  const [netError, setNetError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const controller = new AbortController();
  const { signal } = controller;

  const { id } = useParams();

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [bio, setBio] = useState('');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [breed, setBreed] = useState('');

  async function fetchData() {
    try {
      const response = await axios.get(`/pets/${id}`, { signal });
      const petData = await response.data.pet;

      setType(petData.type);
      setName(petData.name);
      setStatus(petData.status);
      setImageURL(petData.image);
      setHeight(petData.height || '');
      setWeight(petData.weight || '');
      setColor(petData.color || '');
      setBio(petData.bio || '');
      setHypoallergenic(petData.hypoallergenic || false);
      setDietaryRestrictions(petData.dietaryRestriction || '');
      setBreed(petData.breed || '');
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('image', image);
    formData.append('imageURL', imageURL);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('color', color);
    formData.append('bio', bio);
    formData.append('hypoallergenic', hypoallergenic);
    formData.append('dietaryRestrictions', dietaryRestrictions);
    formData.append('breed', breed);

    try {
      const response = await axios.put(`/pets/${id}`, formData);
      fetchData();
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(error.message);
      }
    }
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <>
      {authenticated && admin
        ? (
          <>
            <div className="flex flex-col items-center pb-20 mt-10 max-w-screen-md mx-auto">
              <button className="text-amber-500 hover:text-amber-800 w-12 mb-3" onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined text-3xl">
                  arrow_back
                </span>
              </button>
              {isLoading
                ? (
                  <div className="bg-gray-300 flex justify-center rounded-xl items-center w-96 h-72">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                )
                : netError
                  ? (
                    <div className="bg-red-100 flex justify-center rounded-xl items-center w-96 h-72">
                      <p className="text-amber-800 text-xl uppercase">Network error</p>
                    </div>
                  )
                  : (
                    <div className="overflow-hidden text-center w-96 h-72 rounded-xl">
                      <AdvancedImage
                        cldImg={cld.image(imageURL)
                          .resize(Resize.thumbnail().width(800).height(800).gravity('auto'))}
                        alt="Failed to load image"
                      />
                    </div>
                  )}
              <div className="flex space-x-8">
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Type</label>
                  <select className="form-select w-full rounded-xl border-0 px-3 py-1 shadow-sm" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Choose pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>

                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Breed</label>
                  <input
                    className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                    type="text"
                    placeholder="Enter breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-96">
                <label className="block text-base px-1 py-1 text-gray-500">Image</label>
                <input
                  className="form-input w-full bg-white rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500 file:bg-white file:border-none file:mr-3 file:text-gray-500"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="flex space-x-8">
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Name</label>
                  <input
                    className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                    type="text"
                    placeholder="Pet name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Status</label>
                  <select className="form-select w-full rounded-xl border-0 px-3 py-1 shadow-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose adoption status</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Available">Available</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-8">
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Weight</label>
                  <input
                    className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                    min={0}
                    type="number"
                    placeholder="Enter pet weight in lbs"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Height</label>
                  <input
                    className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                    min={0}
                    type="number"
                    placeholder="Enter pet height in inches"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-8">
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Color</label>
                  <input
                    className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="w-44">
                  <label className="block text-base px-1 py-1 text-gray-500">Hypoallergenic</label>
                  <select className="form-select w-full rounded-xl border-0 px-3 py-1 shadow-sm" value={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.value)}>
                    <option>Choose hypoallergenic status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="w-96">
                <label className="block text-base px-1 py-1 text-gray-500">Dietary</label>
                <input
                  className="form-input w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                  type="text"
                  placeholder="Enter dietary restrictions"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                />
              </div>

              <div className="w-96">
                <label className="block text-base px-1 py-1 text-gray-500">Bio</label>
                <textarea
                  type="textarea"
                  rows={4}
                  className="form-textarea w-full rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
                  placeholder="Enter short bio of pet"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <button className="text-white px-8 py-1 rounded-xl bg-amber-500 my-2 hover:bg-amber-800 transition-all active:scale-95 ease-in-out" onClick={handleSubmit}>
                Edit
              </button>
              {successMessage ? <p className="text-green-800 text-lg">{successMessage}</p> : undefined}
              {errorMessage ? <p className="text-amber-800 text-lg">{errorMessage}</p> : undefined}
            </div>
          </>
        )
        : <Navigate to="/" replace />}
    </>
  );
}
