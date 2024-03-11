import { useContext } from 'react';
import PetCard from '../PetCard/PetCard';
import { SearchContextInstance } from '../../context/SearchContext';
import CardSkeleton from '../LoadingSkeletons/CardSkeleton';

export default function PetsList() {
  const { pets, isLoading, errorMessage } = useContext(SearchContextInstance);

  return (
    <div className="flex max-w-screen-xl mx-auto my-10 gap-10 justify-center h-full flex-wrap">
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )
        : errorMessage
          ? (<p className="text-amber-800 text-xl uppercase pt-10">{errorMessage}</p>)
          : (pets.length === 0
            ? (
              <p className="pt-20 text-xl uppercase text-amber-800">No pets have been found</p>
            ) : (
              <>
                {pets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} />
                ))}
              </>
            ))}
    </div>
  );
}
