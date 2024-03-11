import { useNavigate } from 'react-router-dom';

export default function SinglePetSkeleton() {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-md mx-auto my-10 flex flex-col space-y-5 items-center">
      <button className="text-amber-500 hover:text-amber-800 w-12" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined text-3xl">
          arrow_back
        </span>
      </button>
      <div className="bg-white pb-2 rounded-xl shadow-md animate-pulse">
        <div className="bg-gray-300 flex justify-center rounded-t-xl items-center w-96 h-72">
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
        <div className="flex mb-2 px-2 py-3 justify-between font-bold text-xl">
          <div className="w-16 bg-gray-200 h-6 rounded-3xl" />
          <div className="w-20 bg-gray-200 h-6 rounded-3xl" />
        </div>
        <div className="flex flex-col space-y-5 text-lg px-2 w-96 text-gray-600">
          <div className="flex justify-between">
            <div className="w-20 bg-gray-200 h-6 rounded-3xl" />
            <div className="w-16 bg-gray-200 h-6 rounded-3xl" />
          </div>
          <div className="flex justify-between">

            <div className="w-32 bg-gray-200 h-6 rounded-3xl" />
            <div className="w-28 bg-gray-200 h-6 rounded-3xl" />
          </div>
          <div className="w-24 bg-gray-200 h-6 rounded-3xl" />
          <div className="bg-gray-200 h-16 rounded-3xl" />
        </div>

        <div className="text-xl flex w-full px-2 justify-center">
          <div className="bg-amber-500 mt-5 w-20 h-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
