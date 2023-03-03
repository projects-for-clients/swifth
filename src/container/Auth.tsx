import React, { useContext } from 'react';
import {
  FirstSignUpStep,
  FirstLoginStep,
} from '../components/AuthSteps/FirstStep';
import FourthStep from '../components/AuthSteps/FourthStep';
import {
  SecondLoginStep,
  SecondSignUpStep,
} from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';
import { AuthContext } from '../Context/AppContext';
import { modalSelector } from '../store/features/modal';
import { useAppSelector } from '../store/app/hooks';

function Auth() {
  const modalData = useAppSelector(modalSelector);
  const AuthContextData = useContext(AuthContext);
  const { step } = AuthContextData;

  const { path } = modalData;

  const AuthSteps = () => {
    switch (step) {
      case 0:
        return path === 'signup' ? <FirstSignUpStep /> : <FirstLoginStep />;
      case 1:
        return path === 'signup' ? <SecondSignUpStep /> : <SecondLoginStep />;
      case 2:
        return path === 'signup' ? <ThirdStep /> : <FirstLoginStep />;
      case 3:
        return path === 'signup' ? <FourthStep /> : <FirstLoginStep />;

      default:
        return path === 'signup' ? <FirstSignUpStep /> : <FirstLoginStep />;
    }
  };

  return <AuthSteps />;
}

export default Auth;
