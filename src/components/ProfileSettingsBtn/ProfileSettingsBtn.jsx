export default function ProfileSettingsBtn({ submit }) {
  return (
    <button className="text-white text-xl px-5 py-1 rounded-xl bg-amber-500 my-3 hover:bg-amber-800 transition-all active:scale-95 ease-in-out" onClick={submit}>
      Update
    </button>
  );
}
