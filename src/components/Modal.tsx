import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useAppSelector } from '../store/app/hooks';
import { modalSelector, setIsOpen } from '../store/features/modal';

interface IModal {
  children: React.ReactNode;
}

function Modal({ children }: IModal) {

  const modalData = useAppSelector(modalSelector)


  const {isOpen} = modalData

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
