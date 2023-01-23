import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import { OnboardingContext, OnboardingInputs } from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';

export interface ValidationError { [key: string]: string };

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target;

    console.log({ name, value });
    setOnboardingInputs((prev) => ({
      ...prev,
      [key]: {
        ...prev.businessInfo,
        [name]: value,
      },
    }));
  };

  const formValidate = () => {
    const errors = {} as ValidationError;
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };
    const isValidPassword = (e: string, pa: (checkValid: boolean) => void) => {
      const passRegex = new RegExp(/\d/);

      const isCorrect = passRegex.test(e);

      return pa(isCorrect);
    };

    let count = 0;

    for (const key in handleInput) {
      count++;

      //Validation for the first step

      if (activeStep === 0 && count < 9) {
        switch (key) {
          case 'email':
            isValidMail(handleInput[key], (cb) => {
              if (!cb) {
                errors[key] = 'Invalid email';

                setValidationError(errors);
              }
            });
            break;

          case 'lastName' || 'firstName':
            if (handleInput[key].length < 3) {
              errors[key as keyof handleInputProps] =
                'This field must be at least 3 characters long';

              setValidationError(errors);
            }
            break;
          case 'password':
            isValidPassword(handleInput[key], (pa) => {
              if (!pa) {
                errors[key] = 'Password should have numbers';

                setValidationError(errors);
              }
            });

          case 'confirmPassword':
            if (handleInput[key] !== handleInput.password) {
              errors[key as keyof handleInputProps] = 'Passwords do not match';

              setValidationError(errors);
            }

            if (handleInput[key].length < 8) {
              errors[key as keyof handleInputProps] =
                'Password must be at least 8 characters long';

              setValidationError(errors);
            }
            if (handleInput[key].length < 8) {
              errors[key as keyof handleInputProps] =
                'Password must be at least 8 characters long';

              setValidationError(errors);
            }
            break;

          case 'phoneNumber':
            if (handleInput[key].length < 10) {
              errors[key as keyof handleInputProps] = 'Phone number not valid';

              setValidationError(errors);
            }
            break;

          case 'birthDate':
            if (!dayjs(handleInput[key]).isValid()) {
              errors[key as keyof handleInputProps] = 'Invalid Date';

              setValidationError(errors);
            }
            break;
        }

        if (
          handleInput[key as keyof handleInputProps] === '' ||
          handleInput[key as keyof handleInputProps] === null
        ) {
          errors[key as keyof handleInputProps] = 'This field is required';

          setValidationError(errors);
        }
      } else if (activeStep === 1 && count > 8 && count < 13) {
        switch (key) {
          case 'guardianEmail':
            isValidMail(handleInput[key], (cb) => {
              if (!cb) {
                errors[key] = 'Invalid email';

                setValidationError(errors);
              }
            });
            break;

          case 'guardianName':
            if (handleInput[key].length < 3) {
              errors[key as keyof handleInputProps] =
                'This field must be at least 3 characters long';

              setValidationError(errors);
            }
            break;

          case 'guardianPhoneNumber':
            if (handleInput[key].length < 10) {
              errors[key as keyof handleInputProps] = 'Phone number not valid';

              setValidationError(errors);
            }
            break;
        }

        if (
          handleInput[key as keyof handleInputProps] === '' ||
          handleInput[key as keyof handleInputProps] === null
        ) {
          errors[key as keyof handleInputProps] = 'This field is required';

          setValidationError(errors);
        }
      } else if (activeStep === 2 && count > 11) {
        if (
          handleInput[key as keyof handleInputProps] === '' ||
          handleInput[key as keyof handleInputProps] === null
        ) {
          errors[key as keyof handleInputProps] = 'This field is required';

          setValidationError(errors);
        }
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

  

  return (
    <OnboardingContext.Provider
      value={{ step, setStep, onboardingInputs, handleInputChange }}
    >

      {OnboardingSteps()}
    </OnboardingContext.Provider>
  );
}

export default Onboarding;
