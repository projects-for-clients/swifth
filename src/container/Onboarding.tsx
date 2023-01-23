import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import { OnboardingContext, OnboardingInputs } from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';
import InputChange from '../components/OnboardingSteps/inputChange';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [onboardingInputs, setOnboardingInputs] = useState<OnboardingInputs>({
    businessInfo: {
      businessName: '',
      officeAddress: '',
      cacCertificateUri: '',
      customLicenseExpirationDate: null,
      customLicenseUri: '',
      logoUri: '/icons/admin/bag.svg',
    },
    portsAndTerminal: {
      port: '',
      terminal: '',
      formCExpirationDate: null,
      formCUri: '',
    },
    personalInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      IdCardExpirationDate: null,
      IdCardUri: '',
      IdCardNumber: 0,
      IdCardType: '',
      proofOfAddressUri: '',
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log({ name, value });
    setOnboardingInputs((prev) => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        [name]: value,
      },
    }));
  };




 

  useEffect(() => {
    console.log('onboardingInputs', onboardingInputs);
  }, [handleInputChange])

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
    <OnboardingContext.Provider
      value={{ step, setStep, onboardingInputs, handleInputChange }}
    >

      {OnboardingSteps()}
    </OnboardingContext.Provider>
  );
}

export default Onboarding;
