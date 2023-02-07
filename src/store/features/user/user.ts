import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

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

    updateUserOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },

    updateUser: (state, action) => {
      const data = action.payload

   
      state.fullName = data.PersonalInfo.fullName;
      state.email = data.PersonalInfo.email;

    }

  },

  extraReducers: (builder) => {},
});

export const { updateUserOnboarding, updateUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
