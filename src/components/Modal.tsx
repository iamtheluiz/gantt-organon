import React from 'react';

import '../styles/components/Modal.css';
import OpenIn from './OpenIn';

interface ModalProps {
  modalIsOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, modalIsOpen }) => (
  <OpenIn isActive={modalIsOpen}>
    <div id="Modal" className="absolute flex items-center justify-center overflow-y-auto dark:bg-black z-30 p-4 pt-0">
      <div className="max-w-lg w-full">
        {children}
      </div>
    </div>
  </OpenIn>
);

export default Modal;
