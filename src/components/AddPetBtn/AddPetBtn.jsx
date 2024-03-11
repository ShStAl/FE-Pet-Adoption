export default function AddPetBtn({ submit }) {
  return (
    <button className="text-white px-8 py-1 text-lg rounded-xl bg-amber-500 my-3 hover:bg-amber-800 transition-all active:scale-95 ease-in-out" onClick={submit}>
      Add
    </button>
  );
}
