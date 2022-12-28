import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import {
  FirstSignUpStep,
  FirstLoginStep,
} from '../components/AuthSteps/FirstStep';
import FourthStep from '../components/AuthSteps/FourthStep';
import SecondStep from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';
import { AuthContext } from '../Context/AppContext';
import { modalSelector } from '../store/features/modal';
import { useAppSelector } from '../store/app/hooks';

function Auth() {
  const [step, setStep] = useState(0);

  const modalData = useAppSelector(modalSelector);

  const { path } = modalData;

  const authSteps = () => {
    switch (step) {
      case 0:
        return path === 'signup' ? <FirstSignUpStep /> : <FirstLoginStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;
      case 3:
        return <FourthStep />;

      default:
        return path === 'signup' ? <FirstSignUpStep /> : <FirstLoginStep />;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setStep,
      }}
    >
      {authSteps()}
    </AuthContext.Provider>
  );
}

export default Auth;
