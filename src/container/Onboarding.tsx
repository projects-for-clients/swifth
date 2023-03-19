import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import PersonalInfo from '../components/OnboardingSteps/PersonalInfo';
import {
  OnboardingContext,
  Step,
  ValidationErrors,
} from '../Context/AppContext';
import PortsAndTerminal from '../components/OnboardingSteps/Port_and_Terminals';
import dayjs from 'dayjs';

import DashboardHome from './Home';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import {
  
  updateUser,
  updateUserOnboarding,
} from '../store/features/user/user';
import BusinessInfo from '../components/OnboardingSteps/BusinessInfo';

const Onboarding = () => {
  const dispatch = useAppDispatch();


  const {onboardingInputs} = useAppSelector((state) => state.user);


  const [step, setStep] = useState<Step>('personalInfo');

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors | null>(null);

  // const [onboardingInputs, setOnboardingInputs] = useReducer(
  //   (state: OnboardingInputs, action: Action) => {
  //     switch (action.type) {
  //       case 'UPDATE_BUSINESS_INFO':
  //         return { ...state, businessInfo: action.payload.businessInfo };
  //       case 'UPDATE_PORTS_AND_TERMINAL':
  //         return {
  //           ...state,
  //           portsAndTerminal: action.payload.portsAndTerminal,
  //         };
  //       case 'UPDATE_PERSONAL_INFO':
  //         return { ...state, personalInfo: action.payload.personalInfo };
  //       default:
  //         return state;
  //     }
  //   },
  //   initialState
  // );

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   key: 'businessInfo' | 'port' | 'personalInfo' | 'terminal'
  // ) => {
  //   let { name, value } = e.target;

  //   console.log({ name, value, key })

  //   setValidationErrors(null);
  //   if (key === 'businessInfo') {

  //     // setOnboardingInputs({
  //     //   type: 'UPDATE_BUSINESS_INFO',
  //     //   payload: {
  //     //     ...onboardingInputs,
  //     //     businessInfo: {
  //     //       ...onboardingInputs.businessInfo,
  //     //       [name]: value,
  //     //     },
  //     //   },
  //     // });
  //   }
  //   if (key === 'port') {
  //     setOnboardingInputs({
  //       type: 'UPDATE_PORTS_AND_TERMINAL',
  //       payload: {
  //         ...onboardingInputs,
  //         portsAndTerminal: {
  //           ...onboardingInputs.portsAndTerminal,
  //           [name]: value,
  //         },
  //       },
  //     });
  //   }
  //   if (key === 'terminal') {
  //     setOnboardingInputs({
  //       type: 'UPDATE_PORTS_AND_TERMINAL',
  //       payload: {
  //         ...onboardingInputs,
  //         portsAndTerminal: {
  //           ...onboardingInputs.portsAndTerminal,
  //           terminalList: {
  //             ...onboardingInputs.portsAndTerminal.terminalList,
  //             [name]: value,
  //           },
  //         },
  //       },
  //     });
  //   }

  //   if (key === 'personalInfo') {
  //     setOnboardingInputs({
  //       type: 'UPDATE_PERSONAL_INFO',
  //       payload: {
  //         ...onboardingInputs,
  //         personalInfo: {
  //           ...onboardingInputs.personalInfo,
  //           [name]: value,
  //         },
  //       },
  //     });
  //   }
  // };

  const formValidate = (): boolean => {
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };

    const { businessInfo, portsAndTerminal, personalInfo } = onboardingInputs;

    let errors = {} as any;

    if (step === 'businessInfo') {
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
    }

    if (step === 'portsAndTerminal') {
      if (!portsAndTerminal.port) {
        errors['port'] = 'This field is required';

        setValidationErrors(errors);
      }

      for (const key in portsAndTerminal.terminalList) {
        Object.entries(portsAndTerminal.terminalList[key]).forEach(
          (terminal: [left: string, right: string]) => {
            const [left, right] = terminal;

            if (right === 'too large') {
              errors[key] = {
                ...errors[key],
                [left]: 'File must not exceed 2MB',
              };
            }

            if (right === '') {
              errors[key] = {
                ...errors[key],
                [left]: 'This field is required',
              };

              setValidationErrors(errors);
            }
          }
        );
      }
    }

    if (step === 'personalInfo') {
      for (const key in personalInfo) {
        switch (key) {
          case 'fullName':
            if (personalInfo[key].length < 3) {
              errors[key] = 'This field must be at least 3 characters long';

              setValidationErrors(errors);
            }
            break;

          case 'idCardExpirationDate':
            if (!dayjs(personalInfo[key]).isValid()) {
              errors[key] = 'Invalid Date';

              setValidationErrors(errors);
            }
            break;

          case 'email':
            if (key === 'email') {
              isValidMail(personalInfo[key], (cb) => {
                if (!cb) {
                  errors[key] = 'Invalid email';

                  setValidationErrors(errors);
                }
              });
            }
            break;
        }

        if (
          personalInfo[key as keyof typeof personalInfo] === '' ||
          personalInfo[key as keyof typeof personalInfo] === null
        ) {
          errors[key as keyof typeof personalInfo] = 'This field is required';

          setValidationErrors(errors);
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

  const handleStep = (step: Step) => {
    const isValid = formValidate();

    if (!isValid) {
      return;
    }

    if (step === 'next') {
      dispatch(updateUser(onboardingInputs));
      dispatch(
        updateUserOnboarding({
          onboarding: {
            validating: 'pending',
            validatingArr: [],
          },
        })
      );
    }
    setStep(step);
  };

  const onboardingSteps: Record<Step, JSX.Element> = {
    businessInfo: <BusinessInfo />,
    personalInfo: <PersonalInfo />,
    portsAndTerminal: <PortsAndTerminal />,
    next: <DashboardHome />,
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        handleStep,
        validationErrors,
      }}
    >
      {onboardingSteps[step]}
    </OnboardingContext.Provider>
  );
};

export default Onboarding;
