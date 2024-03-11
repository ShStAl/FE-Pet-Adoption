import { NavLink } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <>
      <div className="container flex items-center justify-center my-auto px-6 py-12 mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-md font-medium text-amber-700">404 error</p>
          <h1 className="mt-3 text-2xl uppercase font-semibold text-amber-500 md:text-3xl">We can’t find that page</h1>
          <p className="mt-4 text-gray-500">Sorry, the page you are looking for doesn't exist or has been moved.</p>

          <div className="flex items-center mt-6 gap-x-3">
            <button className="w-1/2 px-5 py-2 text-lg tracking-wide text-white transition-all bg-amber-500 rounded-xl shrink-0 sm:w-auto hover:bg-amber-700 active:scale-95 ease-in-out">
              <NavLink to="/">Take me home</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
