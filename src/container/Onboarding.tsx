import { useState } from 'react';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';
import { OnboardingContext } from '../Context/AppContext';

function Onboarding() {
  const [step, setStep] = useState(0);

  const OnboardingSteps = () => {
    switch (step) {
      case 0:
        return <BusinessInfo />;
      case 1:
        return <BusinessInfo />;
      case 2:
        return <BusinessInfo />;

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
