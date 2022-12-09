import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

interface CognitoDetails {
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface IUser {
  id: string;
  createdAt?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: object;
  profileUri: string;
  coverPhoto: object;
  coverUri: string;
  password: string;
  phoneNumber: string;
  grade: number;
  birthDate: string | null;
  gender: string;
  guardianName: string;
  guardianPhoneNumber: string;
  guardianEmail: string;
  guardianRelationship: string;
  institutionType: string;
  institutionName: string;
}
export interface UserDetails {
  loading: boolean;
  walletLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
  data: any;
  userDB: IUser;
  cognitoDetails: CognitoDetails | null;
  userWallet: number;
  closeUserWalletModal: boolean;
  playerCreated: boolean;
  registerBtnStatus: 'register' | 'registered' | 'live';
}

const initialState: UserDetails = {
  userDB: {
    id: '',
    createdAt: '',
    firstName: '',
    lastName: '',
    email: '',
    profilePhoto: {},
    coverPhoto: {},
    password: '',
    phoneNumber: '',
    birthDate: null,
    gender: '',
    grade: 1,
    guardianName: '',
    guardianPhoneNumber: '',
    guardianEmail: '',
    guardianRelationship: '',
    institutionType: '',
    institutionName: '',
    profileUri: '',
    coverUri: '',
  },
  loading: false,
  error: null,
  data: null,
  cognitoDetails: null,
  userWallet: 0,
  closeUserWalletModal: false,
  walletLoadingStatus: 'idle',
  playerCreated: false,
  registerBtnStatus: 'register',
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      console.log(action);
      //  state.price += 1;
    },
    updateUser(state, action) {
      state.cognitoDetails = action.payload;
    },
    clearUser(state, action) {
      console.log('++++++++++++++clearing user');
      state = initialState;
    },
    registerBtnStatus: (state, action) => {
      state.registerBtnStatus = action.payload;
    },
    playerChange: (state, action) => {
      console.log('---------------ENTERED dispatch of player created');
      state.playerCreated = false;
    },
  },

  extraReducers: (builder) => {},
});

export const { registerBtnStatus, clearUser, updateUser, playerChange } =
  userSlice.actions;
export const selectUser = (state: AppState) => state.user;
export const currentAuthUser = (state: AppState) => state.user.cognitoDetails;
export default userSlice.reducer;
