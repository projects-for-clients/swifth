import React, { useState, useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { AuthContext, MessageType } from '../Context/AppContext';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { modalSelector, close } from '../store/features/modal';

interface IModal {
  children: React.ReactNode;
}

function Modal({ children }: IModal) {
  const modalData = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [isMessage, setIsMessage] = useState(false)
  const [messageType, setMessageType] = useState<MessageType>(null as any)
  const [message, setMessage] = useState<string>(null as any)

  const { isOpen } = modalData;

  const closeModal = () => dispatch(close());

  useEffect(() => {
    console.log({isMessage})
  }, [isMessage])

  return (
    <AuthContext.Provider
      value={{
        setStep,
        step,
        isMessage,
        setIsMessage,
        message,
        setMessage,
        messageType,
        setMessageType,
      }}
    >
      <div>
        {isOpen && (
          <div className="authDialog relative z-10 " id="authDialog">
            {isMessage && (
              <p
                className={`authDialog__message text-center ${
                  messageType === 'success'
                    ? 'bg-[#D9EFE1] text-[#319F5A]'
                    : 'bg-[#FDE9E9] text-[#E82830]'
                } `}
              >
                {message}
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
