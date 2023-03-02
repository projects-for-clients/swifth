import { createContext, Dispatch, SetStateAction } from 'react';

namespace Auth {
  export type MessageType = 'error' | 'success';
  export interface IAuthContext {
    setStep: Dispatch<SetStateAction<number>>;
    step: number;
    notify: (message: string) => void;
  }
}
export const AuthContext = createContext<Auth.IAuthContext>(null as any);

namespace Onboarding {
  export interface BusinessInfo {
    businessName: string;
    officeAddress: string;
    logoUri: string;
    cacUri: string;
    licenseUri: string;
    licenseExpirationDate: string;
  }

  export interface PortsAndTerminal {
    port: string;
    terminalList: {
      terminal: string;
      formCUri: string;
      formCExpirationDate: string;
    }[];
  }

  export interface PersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    idCardUri: string;
    idCardExpirationDate: string;
    POAUri: string;
    idCardType: string;
    idCardNumber: number;
  }

  export interface ValidationErrors {
    // businessName: string;
    // officeAddress: string;
    // logoUri: string;
    // cacUri: string;
    // licenseUri: string;
    // licenseExpirationDate: string;
    // port: string;
    // terminal: string;
    // formCUri: string;
    // formCExpirationDate: string;
    // fullName: string;
    // email: string;
    // phoneNumber: string;
    // IdCardUri: string;
    // IdCardExpirationDate: string;
    // proofOfAddressUri: string;
    // IdCardType: string;
    // IdCardNumber: number;
    [key: string]: string | any
  }
  export interface OnboardingInputs {
    businessInfo: BusinessInfo;
    portsAndTerminal: PortsAndTerminal;
    personalInfo: PersonalInfo;
  }

  export type Step =  'businessInfo' | 'portsAndTerminal' | 'personalInfo' | 'next'
  export interface IOnboardingContext {
    handleStep: (step: Step ) => void;
    step: Step;
    validationErrors: ValidationErrors | null;
    // handleInputChange: (
    //   e: React.ChangeEvent<HTMLInputElement>,
    //   key: 'businessInfo' | 'port' | 'personalInfo' | 'terminal'
    // ) => void;
    notify?: (message: string) => void;
  }
}
export type Step = Onboarding.Step;
export type ValidationErrors = Onboarding.ValidationErrors;
export type OnboardingInputs = Onboarding.OnboardingInputs
export const OnboardingContext = createContext<Onboarding.IOnboardingContext>(
  null as any
);
