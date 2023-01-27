import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import {
  OnboardingContext,
  OnboardingInputs,
  Step,
  ValidationErrors,
} from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';
import dayjs from 'dayjs';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';

const Onboarding = () => {
  interface Action {
    type:
      | 'UPDATE_BUSINESS_INFO'
      | 'UPDATE_PORTS_AND_TERMINAL'
      | 'UPDATE_PERSONAL_INFO';
    payload: OnboardingInputs;
  }

  const initialState: OnboardingInputs = {
    businessInfo: {
      businessName: '',
      officeAddress: '',
      cacUri: '',
      licenseExpirationDate: '',
      licenseUri: '',
      logoUri: '',
    },
    portsAndTerminal: {
      port: '',
      terminalList: [],
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
  };
  const [step, setStep] = useState<Step>('portsAndTerminal');
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors | null>(null);

  const [onboardingInputs, setOnboardingInputs] = useReducer(
    (state: OnboardingInputs, action: Action) => {
      switch (action.type) {
        case 'UPDATE_BUSINESS_INFO':
          return { ...state, businessInfo: action.payload.businessInfo };
        case 'UPDATE_PORTS_AND_TERMINAL':
          return {
            ...state,
            portsAndTerminal: action.payload.portsAndTerminal,
          };
        case 'UPDATE_PERSONAL_INFO':
          return { ...state, personalInfo: action.payload.personalInfo };
        default:
          return state;
      }
    },
    initialState
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: 'businessInfo' | 'port' | 'personalInfo' | 'terminal' | any
  ) => {
    const { name, value } = e.target;

    setValidationErrors(null);

    if (key === 'businessInfo') {
      setOnboardingInputs({
        type: 'UPDATE_BUSINESS_INFO',
        payload: {
          ...onboardingInputs,
          businessInfo: {
            ...onboardingInputs.businessInfo,
            [name]: value,
          },
        },
      });
    }
    if (key === 'port') {
      setOnboardingInputs({
        type: 'UPDATE_PORTS_AND_TERMINAL',
        payload: {
          ...onboardingInputs,
          portsAndTerminal: {
            ...onboardingInputs.portsAndTerminal,
            [name]: value,
          },
        },
      });
    }
    if (key === 'terminal') {
      setOnboardingInputs({
        type: 'UPDATE_PORTS_AND_TERMINAL',
        payload: {
          ...onboardingInputs,
          portsAndTerminal: {
            ...onboardingInputs.portsAndTerminal,
            terminalList: {
              ...onboardingInputs.portsAndTerminal.terminalList,
              [name]: value,
            },
          },
        },
      });
    }
  };

  const formValidate = (): boolean => {
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };

    const { businessInfo, portsAndTerminal, personalInfo } = onboardingInputs;

    let errors = {} as any ;
    for (const key in businessInfo) {
      switch (key) {
        case 'businessName':
          if (businessInfo[key].length < 3) {
            errors[key] = 'This field must be at least 3 characters long';

            setValidationErrors(errors);
          }
          break;

        case 'licenseExpirationDate':
          if (!dayjs(businessInfo[key]).isValid()) {
            errors[key] = 'Invalid Date';

            setValidationErrors(errors);
          }
          break;

        case 'officeAddress':
          if (businessInfo[key].length < 3) {
            errors[key] = 'This field must be at least 3 characters long';

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

    if (!portsAndTerminal.port) {
      errors['port'] = 'This field is required';

      setValidationErrors(errors);
    }

    for (const key in portsAndTerminal.terminalList) {
      Object.entries(portsAndTerminal.terminalList[key]).forEach(
        (terminal: [left: string, right: string]) => {
          const [left,right] = terminal

          
          if (right === '') {

            errors[key] = {
              ...errors[key],
              [left]: 'This field is required'
            }

            console.log(errors)

            setValidationErrors(errors);
          }

         

            setValidationErrors(errors);
          }
          
        
      );
    }

    console.log(errors)

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    console.log(onboardingInputs);
  }, [onboardingInputs]);

  const handleStep = (step: Step) => {
    const isValid = formValidate();

    if (!isValid) {
      return;
    }

    setStep(step);
  };

  const onboardingSteps: Record<Step, JSX.Element> = {
    businessInfo: <BusinessInfo />,
    personalInfo: <PersonalInfo />,
    portsAndTerminal: <PortsAndTerminal />,
  };

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
      {onboardingSteps[step]}
    </OnboardingContext.Provider>
  );
};

export default Onboarding;
