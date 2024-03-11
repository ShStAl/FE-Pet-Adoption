import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default function Example() {
  return (
    <Menu as="div" className="relative text-left hidden tablet:inline-block">
      <div>
        <Menu.Button className="inline-flex w-full justify-center text-amber-500 pt-[2px]">
          <span className="material-symbols-outlined text-3xl hover:text-amber-800 transition-colors">
            person
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 w-auto -right-16 origin-top-right divide-y divide-gray-200 rounded-md bg-[#faf5f0] shadow-lg ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            <div className="flex items-center px-3 py-1 text-nowrap space-x-1 hover:text-amber-800 transition-colors">
              <span className="material-symbols-outlined">
                pets
              </span>
              <NavLink className="text-lg" to="/my-pets">
                My pets
              </NavLink>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="flex items-center px-3 py-1 text-nowrap space-x-1 hover:text-amber-800 transition-colors">
              <span className="material-symbols-outlined">
                settings
              </span>
              <NavLink className="text-lg" to="/profile">
                Profile settings
              </NavLink>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
