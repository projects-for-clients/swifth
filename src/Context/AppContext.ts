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
    cacCertificateUri: string;
    customLicenseUri: string;
    customLicenseExpirationDate: Date | null;
  }

  export interface PortsAndTerminal {
    port: string;
    terminal: string;
    formCUri: string;
    formCExpirationDate: Date | null;
  }

  export interface PersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    IdCardUri: string;
    IdCardExpirationDate: Date | null;
    proofOfAddressUri: string;
    IdCardType: string;
    IdCardNumber: number;
  }


  export interface OnboardingInputs {
    businessInfo: BusinessInfo;
    portsAndTerminal: PortsAndTerminal;
    personalInfo: PersonalInfo;
  }
  export interface IOnboardingContext {
    handleStep: (step: number) => void;
    step: number;
    onboardingInputs: OnboardingInputs;
    validationError: unknown;
    handleInputChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      key: string
    ) => void;
    notify?: (message: string) => void;
  }
}

export type OnboardingInputs = Onboarding.OnboardingInputs
export const OnboardingContext = createContext<Onboarding.IOnboardingContext>(
  null as any
);
