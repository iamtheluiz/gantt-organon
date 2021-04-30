import React from 'react';

import '../styles/components/Modal.css';

interface ProjectProps {
  modalIsOpen: boolean;
}

const Project: React.FC<ProjectProps> = ({ children, modalIsOpen }) => (
  <>
    {modalIsOpen && (
    <div id="Modal" className="absolute -inset-0 flex items-center justify-center w-full min-h-screen overflow-y-auto dark:bg-black z-30">
      <div className="max-w-lg w-full px-4">
        {children}
      </div>
    </div>
    )}
  </>
);

export default Project;
