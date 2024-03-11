import { Switch } from '@headlessui/react';

export default function ModalToogle({ isLogin, onToggle }) {
  return (
    <div className="flex space-x-3 justify-center items-center">
      <p className={`${isLogin ? 'text-amber-500' : 'text-gray-500'} text-xl transition-all`}>Login</p>
      <Switch
        checked={!isLogin}
        onChange={onToggle}
        className="bg-amber-500 relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75"
      >
        <span className="sr-only">Auth type</span>
        <span
          aria-hidden="true"
          className={`${!isLogin ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <p className={`${!isLogin ? 'text-amber-500' : 'text-gray-500'} text-xl transition-all`}>Sign Up</p>
    </div>
  );
}
