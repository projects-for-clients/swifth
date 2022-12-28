import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { modalSelector, open, close } from '../store/features/modal';

interface IModal {
  children: React.ReactNode;
}

function Modal({ children }: IModal) {

  const modalData = useAppSelector(modalSelector)
  const dispatch = useAppDispatch()


  const {isOpen} = modalData

  const closeModal = () => {
    dispatch(open());
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
