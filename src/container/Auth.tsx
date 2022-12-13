import React, { useState, createContext } from 'react';
import { GrFormClose } from 'react-icons/gr';
import FirstStep from '../components/AuthSteps/FirstStep';
import SecondStep from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';

function Auth() {
  const [step, setStep] = useState(0);

  const AuthContext = createContext({});

  const authSteps = () => {
    switch (step) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;

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
