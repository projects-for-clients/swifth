import React, { useState, useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { AuthContext } from '../Context/AppContext';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { modalSelector, close } from '../store/features/modal';

interface IModal {
  children: React.ReactNode;
}

function Modal({ children }: IModal) {
  const modalData = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>(null as any);

  const messageType = 'error';

  const { isOpen } = modalData;

  const closeModal = () => dispatch(close());

  return (
    <AuthContext.Provider
      value={{
        setStep,
        step,
        setErrorMessage,
        errorMessage,
      }}
    >
      <div>
        {isOpen && (
          <div className="authDialog relative z-10 " id="authDialog">
            {errorMessage && (
              <p
                className={`authDialog__message text-center ${
                  messageType === 'error'
                  ? 'bg-[#FDE9E9] text-[#E82830]'
                    : 'bg-[#D9EFE1] text-[#319F5A]'
                } `}
              >
                {errorMessage}
              </p>
            )}
            <div className="authDialog__container">
              <button className="authDialog__button" onClick={closeModal}>
                <GrFormClose className="text-3xl " />
              </button>

              {children}
            </div>
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default Modal;
