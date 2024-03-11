import { useState } from 'react';
import { Switch } from '@headlessui/react';
import BasicSearch from '../Search/BasicSearch/BasicSearch';
import AdvancedSearch from '../Search/AdvancedSearch/AdvancedSearch';

export default function SearchBar() {
  const [advancedSearch, setAdvancedSearch] = useState(false);

  return (
    <div className="flex flex-col space-y-3 mx-auto mt-10">
      <div className="flex space-x-3 justify-center items-center">
        <Switch
          checked={advancedSearch}
          onChange={setAdvancedSearch}
          className={`${advancedSearch ? 'bg-amber-500' : 'bg-gray-300'}
          relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Search type</span>
          <span
            aria-hidden="true"
            className={`${advancedSearch ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <p className={`${advancedSearch ? 'text-amber-500' : 'text-gray-500'} text-lg transition-all`}>Advanced search</p>
      </div>
      {!advancedSearch ? <BasicSearch /> : <AdvancedSearch />}
    </div>
  );
}
