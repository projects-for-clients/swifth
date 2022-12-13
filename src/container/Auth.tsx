import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import FirstStep from '../components/AuthSteps/FirstStep';
import FourthStep from '../components/AuthSteps/FourthStep';
import SecondStep from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';


interface IAuthContext {
    setStep: Dispatch<SetStateAction<number>>
}
export const AuthContext = createContext<IAuthContext>(null as any);

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
