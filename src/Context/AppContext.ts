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
  interface BusinessInfo {
    businessName: string;
    businessAddress: string;
    logoUri: string;
    cacCertificateUri: string;
    customLicenseUri: string;
    customLicenseExpirationDate: Date;
  }

  interface PortsAndTerminal {
    port: string;
    termainal: string;
    formCUri: string;
    formCExpirationDate: Date;
  }

  interface PersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    IdCardUri: string;
    IdCardExpirationDate: Date;
    proofOfAddressUri: string;
    IdCardType: string;
    IdCardNumber: number;
  }
  export interface IOnboardingContext {
    setStep: Dispatch<SetStateAction<number>>;
    step: number;
    onboardingInputs: {
      businessInfo: BusinessInfo;
      portsAndTerminal: PortsAndTerminal;
      personalInfo: PersonalInfo;
    };

    notify?: (message: string) => void;
  }
}
export const OnboardingContext = createContext<Onboarding.IOnboardingContext>(
  null as any
);
