import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { OnboardingInputs } from '../../../Context/AppContext';

type ValidatingPath = 'businessInfo' | 'personalInfo' | 'portsAndTerminal';
export interface IUser {
  fullName: string;
  email: string;
  onboarding: {
    validating: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: {
      path: ValidatingPath;
      message: string;
    }[];
  };
}

const initialState: IUser = {
  fullName: '',
  email: '',
  onboarding: {
    validating: 'idle',
    error: [],
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
