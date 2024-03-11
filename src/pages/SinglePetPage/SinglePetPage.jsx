import { useParams } from 'react-router-dom';
import DisplayPetInfo from '../../components/DisplayPetInfo/DisplayPetInfo';
import EditPetInfo from '../../components/EditPetInfo/EditPetInfo';

export default function SinglePetPage() {
  const { mode } = useParams();

  const isInEditMode = mode === 'edit';

  return (
    <>
      {isInEditMode ? (
        <EditPetInfo />
      ) : (
        <DisplayPetInfo />
      )}
    </>
  );
}
