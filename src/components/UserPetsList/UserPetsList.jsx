import PetCard from '../PetCard/PetCard';

export default function UserPetsList({ pets, fetchFunc }) {
  return (
    <>
      {pets.length === 0 ? (
        <p className="pt-20 text-xl uppercase text-amber-800">You currently don't have any pets</p>
      ) : (
        <div className="flex max-w-screen-xl mx-auto pt-3 my-30 gap-10 justify-center h-full flex-wrap">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} fetchFunc={fetchFunc} />
          ))}
        </div>
      )}
    </>
  );
}
