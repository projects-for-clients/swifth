import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { OnboardingInputs } from '../../../Context/AppContext';

type ValidatingPath = 'businessInfo' | 'personalInfo' | 'portsAndTerminal';

export interface IUser {
  fullName: string;
  email: string;
  onboarding: {
    validating: 'idle' | 'pending' | 'succeeded';
    validatingArr: {
      path: ValidatingPath;
      message: string;
      error: boolean;
    }[];
  };
}

const initialState: IUser = {
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
  },

  extraReducers: (builder) => {},
});

export const { updateUserOnboarding, updateUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
