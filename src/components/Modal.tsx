import React from 'react';
import { FiX } from 'react-icons/fi';

import '../styles/components/Modal.css';

interface ProjectProps {
  modalIsOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalIsOpen: (arg0: boolean) => void;
}

const Project: React.FC<ProjectProps> = ({ children, modalIsOpen, setModalIsOpen }) => {
  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      {modalIsOpen && (
        <div id="Modal" className="absolute -inset-0 flex items-center justify-center w-full min-h-screen overflow-y-auto dark:bg-black z-30">
          <div className="max-w-lg w-full px-4">
            <header className="w-full py-4 rounded-lg">
              <button onClick={toggleModal} className="linkHover w-7 flex justify-center items-center">
                <FiX className="w-full h-full text-gray-700 dark:text-gray-300" />
              </button>
            </header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
