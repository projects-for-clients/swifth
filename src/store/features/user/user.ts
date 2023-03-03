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

type TerminalKeys = 'terminal' | 'formCUri' | 'formCExpirationDate';

export interface PortsAndTerminal {
  port: string | null;
  terminalList: Map<TerminalKeys, string>[];
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
      port: null,
      terminalList: [
        new Map([
          ['terminal', ''],
          ['formCUri', ''],
          ['formCExpirationDate', ''],
        ] as [TerminalKeys, string][]),
      ],
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
  validated: true,
  fullName: '',
  email: '',
  onboarding: {
    validating: 'succeeded',
    validatingArr: [],
  },

  // validated: false,
  // fullName: '',
  // email: '',
  // onboarding: {
  //   validating: 'idle',

  //   validatingArr: [
  //     {
  //       path: 'businessInfo',
  //       message: 'Business info is not valid',
  //       error: false,
  //     },
  //     {
  //       path: 'personalInfo',
  //       message: 'Details Validated',
  //       error: false,
  //     },
  //     {
  //       path: 'portsAndTerminal',
  //       message: 'Details Validated',
  //       error: true,
  //     },
  //   ],
  // },
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

    updateBusinessInfo: (
      state,
      {
        payload,
      }: {
        payload: BusinessInfo;
      }
    ) => {
      console.log({ payload });
      return {
        ...state,
        onboardingInputs: {
          ...state.onboardingInputs,
          businessInfo: {
            ...state.onboardingInputs.businessInfo,
            ...payload,
          },
        },
      };
    },
    updatePersonalInfo: (
      state,
      {
        payload,
      }: {
        payload: PersonalInfo;
      }
    ) => {
      state.onboardingInputs.personalInfo = payload;
    },
    updatePortsAndTerminalInfo: (
      state,
      {
        payload,
      }: {
        payload: PortsAndTerminal;
      }
    ) => {
      console.log('payload', payload);
      state.onboardingInputs.portsAndTerminal = payload;
    },

    fetchedPortsAndTerminal: (state) => {
      const updatedMap = new Map([
        ['terminal', ''],
        ['formCUri', ''],
        ['formCExpirationDate', ''],
      ] as [TerminalKeys, string][]);

      console.log({ updatedMap });

      return {
        ...state,
        onboardingInputs: {
          ...state.onboardingInputs,
          portsAndTerminal: {
            port: 'Lagos',
            terminalList: [
              ...state.onboardingInputs.portsAndTerminal.terminalList,
              updatedMap,
            ],
          },
        },
      };
    },
  },
});

export const {
  updateUserOnboarding,
  updateUser,
  updateBusinessInfo,
  updatePersonalInfo,
  updatePortsAndTerminalInfo,
  fetchedPortsAndTerminal,
} = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
