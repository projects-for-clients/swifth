import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import {
  OnboardingContext,
  OnboardingInputs,
  ValidationErrors,
} from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';
import dayjs from 'dayjs';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
  const [onboardingInputs, setOnboardingInputs] = useState<OnboardingInputs>({
    businessInfo: {
      businessName: '',
      officeAddress: '',
      cacCertificateUri: '',
      customLicenseExpirationDate: '',
      customLicenseUri: '',
      logoUri: '',
    },
    portsAndTerminal: {
      port: '',
      terminal: '',
      formCExpirationDate: '',
      formCUri: '',
    },
    personalInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      IdCardExpirationDate: '',
      IdCardUri: '',
      IdCardNumber: 0,
      IdCardType: '',
      proofOfAddressUri: '',
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target;

    setValidationErrors(null)
    setOnboardingInputs((prev) => ({
      ...prev,
      [key]: {
        ...prev.businessInfo,
        [name]: value,
      },
    }));
  };

  const formValidate = ():boolean => {
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };

    const { businessInfo } = onboardingInputs;

    const errors = {} as ValidationErrors;
    for (const key in businessInfo) {
      console.log({key})
      //Validation for the first step

      switch (key) {
        case 'businessName':
          if (businessInfo[key].length < 3) {
            errors[key] = 'This field must be at least 3 characters long';

            setValidationErrors(errors);
          }
          break;

        case 'customLicenseExpirationDate':
          if (!dayjs(businessInfo[key]).isValid()) {
            errors[key] = 'Invalid Date';

            setValidationErrors(errors);
          }
          break;

        case 'officeAddress':
          if (businessInfo[key].length < 3) {
            errors[key] =
              'This field must be at least 3 characters long';

            setValidationErrors(errors);
          }
          break;
      }

      if (
        businessInfo[key as keyof typeof businessInfo] === '' ||
        businessInfo[key as keyof typeof businessInfo] === null
      ) {
        errors[key as keyof typeof businessInfo] = 'This field is required';

        setValidationErrors(errors);
      }
     
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

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


  const handleStep = (e: number) => {
    const isValid = formValidate();
    
    console.log({ isValid, validationErrors});
    if (!isValid) {
      return;
    }

    setStep(e);
  }

  return (
    <OnboardingContext.Provider
      value={{
        step,
        handleStep,
        onboardingInputs,
        handleInputChange,
        validationErrors,
      }}
    >
      {OnboardingSteps()}
    </OnboardingContext.Provider>
  );
};

export default Onboarding;
