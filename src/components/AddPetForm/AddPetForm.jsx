import { useState } from 'react';
import AddPetBtn from '../AddPetBtn/AddPetBtn';
import axios from '../../axios';

export default function AddPetForm() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [bio, setBio] = useState('');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [breed, setBreed] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('image', image);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('color', color);
    formData.append('bio', bio);
    formData.append('hypoallergenic', hypoallergenic);
    formData.append('dietaryRestrictions', dietaryRestrictions);
    formData.append('breed', breed);

    try {
      const response = await axios.post('/add_pet', formData);
      setErrorMessage('');
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
      <div className="flex flex-col items-center mt-10 pb-20 space-y-3 max-w-screen-md mx-auto">
        <div className="flex space-x-8">
          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Type</label>
            <select className="form-select text-lg w-full rounded-xl border-0 px-3 py-1 shadow-sm" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Choose pet type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </div>

          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Breed</label>
            <input
              className="form-input w-full text-lg rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
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
            className="form-input w-full bg-white text-lg rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500 file:bg-white file:border-none file:mr-3 file:text-gray-500"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex space-x-8">
          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Name</label>
            <input
              className="form-input w-full text-lg rounded-xl border-0 px-3 py-1 shadow-sm outline-amber-500"
              type="text"
              placeholder="Pet name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Status</label>
            <select className="form-select w-full text-lg rounded-xl border-0 px-3 py-1 shadow-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Adoption status</option>
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
              className="form-input w-full rounded-xl text-lg border-0 px-3 py-1 shadow-sm outline-amber-500"
              min={0}
              type="number"
              placeholder="Lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Height</label>
            <input
              className="form-input w-full rounded-xl text-lg border-0 px-3 py-1 shadow-sm outline-amber-500"
              min={0}
              type="number"
              placeholder="Inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Color</label>
            <input
              className="form-input w-full rounded-xl text-lg border-0 px-3 py-1 shadow-sm outline-amber-500"
              type="text"
              placeholder="Enter color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="w-44">
            <label className="block text-base px-1 py-1 text-gray-500">Hypoallergenic</label>
            <select className="form-select text-lg w-full rounded-xl border-0 px-3 py-1 shadow-sm" value={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.value)}>
              <option>Choose hypoallergenic status</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div className="w-96">
          <label className="block text-base px-1 py-1 text-gray-500">Dietary</label>
          <input
            className="form-input w-full rounded-xl text-lg border-0 px-3 py-1 shadow-sm outline-amber-500"
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
            className="form-textarea w-full rounded-xl text-lg border-0 px-3 py-1 shadow-sm outline-amber-500"
            placeholder="Enter short bio of pet"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <AddPetBtn submit={handleSubmit} />
        {successMessage ? <p className="text-green-800 text-lg">{successMessage}</p> : undefined}
        {errorMessage ? <p className="text-amber-800 text-lg">{errorMessage}</p> : undefined}
      </div>
    </>
  );
}
