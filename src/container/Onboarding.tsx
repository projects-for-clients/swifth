import { useState } from 'react';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import { OnboardingContext } from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';

function Onboarding() {
  const [step, setStep] = useState(0);
  const [onboardingInputs, setOnboardingInputs] = useState({})
  

  const OnboardingSteps = () => {
    switch (step) {
      case 0:
        return <BusinessInfo />;
      case 1:
        return <PortsAndTerminal />;
      case 2:
        return <PersonalInfo />;

      default:
        return <BusinessInfo />;
    }
  };

  return (
    <OnboardingContext.Provider value={{ step, setStep }}>
      <OnboardingSteps />
    </OnboardingContext.Provider>
  );
}

export default Onboarding;
