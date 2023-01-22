import { useState } from "react";
import BusinessInfo from "../components/OnboardingSteps/BusinessInfo";


function Onboarding() {
  const [step, setStep] = useState(0);
  


  const OnboardingSteps = () => {
    switch (step) {
      case 0:
        return <BusinessInfo/>
      case 1:
        return <BusinessInfo />;
      case 2:
        return <BusinessInfo />;
     

      default:
        return <BusinessInfo />;
    }
  };

  return <OnboardingSteps />;
}

export default Onboarding;
