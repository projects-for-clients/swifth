import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';

interface IModal {
  children: React.ReactNode;
}

function Modal({ children }: IModal) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {isOpen && (
        <div className="authDialog relative z-10 " id="authDialog">
          <div className="authDialog__container">
            <button className="authDialog__button" onClick={closeModal}>
              <GrFormClose className="text-3xl " />
            </button>

            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
