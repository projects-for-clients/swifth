import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

type ValidatingPath = 'businessInfo' | 'personalInfo' | 'portsAndTerminal';

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

export interface OnboardingInputs {
  businessInfo: BusinessInfo;
  portsAndTerminal: PortsAndTerminal;
  personalInfo: PersonalInfo;
}


export interface IUser {
  onboardingInputs: OnboardingInputs;
  validated: boolean;
  fullName: string;
  email: string;
  onboarding: {
    validating: 'idle' | 'pending' | 'succeeded';
    validatingArr:
      | {
          path: ValidatingPath;
          message: string;
          error: boolean;
        }[]
      | [];
  };
}

const initialState: IUser = {
  onboardingInputs: {
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
      idCardExpirationDate: '',
      idCardUri: '',
      idCardNumber: 0,
      idCardType: '',
      POAUri: '',
    },
  },
  // validated: true,
  // fullName: '',
  // email: '',
  // onboarding: {
  //   validating: 'succeeded',
  //   validatingArr: [],
  // },

  validated: false,
  fullName: '',
  email: '',
  onboarding: {
    validating: 'idle',

    validatingArr: [
      {
        path: 'businessInfo',
        message: 'Business info is not valid',
        error: false,
      },
      {
        path: 'personalInfo',
        message: 'Details Validated',
        error: false,
      },
      {
        path: 'portsAndTerminal',
        message: 'Details Validated',
        error: true,
      },
    ],
  },
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    updateUserOnboarding: (
      state,
      {
        payload,
      }: {
        payload: Pick<IUser, 'onboarding'>;
      }
    ) => {
      console.log('payload onboarding', payload);
      state.onboarding = payload.onboarding;
    },

    updateUser: (state, { payload }) => {
      const data = payload as OnboardingInputs;

      state.fullName = data.personalInfo.fullName;
      state.email = data.personalInfo.email;
    },


    updateBusinessInfo: (state, { payload }) => {
      const data = payload as BusinessInfo;

      state.onboardingInputs.businessInfo = data;
    },
    updatePersonalInfo: (state, { payload }) => {
      const data = payload as PersonalInfo;

      state.onboardingInputs.personalInfo = data;
    },
    updatePortsAndTerminalInfo: (state, { payload }) => {
      const data = payload as PortsAndTerminal;

      state.onboardingInputs.portsAndTerminal = data;
    },

  },

  extraReducers: (builder) => {},
});

export const { updateUserOnboarding, updateUser, updateBusinessInfo, updatePersonalInfo, updatePortsAndTerminalInfo } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
