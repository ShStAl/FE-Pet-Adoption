export default function CardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-md overflow-hidden w-64 animate-pulse">
      <div className="bg-gray-300 flex justify-center items-center h-64">
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
      <div className="flex px-3 py-2 justify-between font-bold text-xl">
        <div className="w-16 bg-gray-200 h-6 rounded-3xl" />
        <div className="w-20 bg-gray-200 h-6 rounded-3xl" />
      </div>
      <div className="flex mt-3 px-4 py-3 justify-between items-center">
        <div className="flex flex-col">
          <div className="w-16 bg-gray-200 h-10 rounded-2xl" />
        </div>
        <div className="bg-amber-500 w-20 h-10 rounded-3xl" />
      </div>
    </div>
  );
}
