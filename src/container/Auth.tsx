import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import {FirstSignUpStep, FirstLoginStep} from '../components/AuthSteps/FirstStep';
import FourthStep from '../components/AuthSteps/FourthStep';
import SecondStep from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';



function Auth() {
  const [step, setStep] = useState(0);


  const authSteps = () => {
    switch (step) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;
      case 3:
        return <FourthStep />;

      default:
        return 'hello';
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
