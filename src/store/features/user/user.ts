import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

type ValidatingPath = 'businessInfo' | 'personalInfo' | 'portsAndTerminal';
export interface IUser {
  firstName: string;
  lastName: string;
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
  firstName: '',
  lastName: '',
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
    

  },

  extraReducers: (builder) => {},
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
