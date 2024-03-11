import { useState, createContext } from "react";

export const ModalContextInstance = createContext();

export default function ModalContext({ children }) {

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <ModalContextInstance.Provider value={{ showModal, handleCloseModal, handleShowModal }}>
        {children}
      </ModalContextInstance.Provider>
    </>
  )
}