import {
  signUp,
  signIn,
  createNewUser,
  currentUser,
  fetchUserDB,
  createUserWallet,
  fetchUserWallet,
  updateUserWallet,
  createAddToWallet,
  createPlayer,
  signOut,
} from './api';
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

  extraReducers: (builder) => {
    [signUp.fulfilled, signIn.fulfilled].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log('fulfilled signIn/signUp', action.payload);
        state.cognitoDetails = action.payload;
        state.loading = false;
      });
    });

    [signUp.pending, signIn.pending].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log('pending', action.payload);
        state.loading = true;
      });
    });

    [signUp.rejected, signIn.rejected].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log(action.payload);

        console.log('rejected');

        state.loading = false;
        state.error = action.payload;
      });
    });

    builder.addCase(signOut.fulfilled, (state, action) => {
      console.log('signOut fulfilled', action.payload);
      state.cognitoDetails = null;
      state.loading = false;
      localStorage.removeItem('persist:root');
    });

    builder.addCase(currentUser.fulfilled, (state, action) => {
      console.log('Reducer:Current User Fulfilled', action.payload);

      state.cognitoDetails = action.payload.attributes;
    });

    builder.addCase(fetchUserDB.fulfilled, (state, action) => {
      const { payload } = action;

      console.log('Reducer:fetchUserDB Fulfilled', payload);
      Object.entries(payload!).forEach((field) => {
        const key = field[0] as 'username';
        state.userDB[key] = field[1] as string;
      });
    });

    builder.addCase(createAddToWallet.fulfilled, (state, action) => {
      console.log('Reducer:Create Add To Wallet Fulfilled', action.payload);
      state.walletLoadingStatus = 'succeeded';
    });
    builder.addCase(createAddToWallet.pending, (state, action) => {
      console.log('Reducer:Create Add To Wallet pending', action.payload);

      state.walletLoadingStatus = 'loading';
    });
    builder.addCase(createAddToWallet.rejected, (state, action) => {
      console.log('Reducer:Create Add To Wallet rejected', action.payload);

      state.walletLoadingStatus = 'failed';
    });

    builder.addCase(createPlayer.fulfilled, (state, action) => {
      console.log('Reducer:Create Player Fulfilled', action.payload);

      state.playerCreated = true;
    });
    builder.addCase(createPlayer.pending, (state, action) => {
      console.log('Reducer:Create Player pending', action.payload);
    });
    builder.addCase(createPlayer.rejected, (state, action) => {
      console.log('Reducer:Create Player rejected', action.payload);
    });

    builder.addCase(fetchUserWallet.fulfilled, (state, action) => {
      const { inputAmount } = action.payload;

      state.userWallet = inputAmount;
    });

    [createUserWallet.fulfilled, updateUserWallet.fulfilled].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log('Reducer:Create User Wallet Fulfilled', action.payload);

        state.walletLoadingStatus = 'succeeded';

        const { inputAmount } = action.payload;

        state.userWallet = inputAmount;
      });
    });

    [createUserWallet.pending, updateUserWallet.pending].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log('Reducer:Create User Wallet pending', action.payload);

        state.walletLoadingStatus = 'loading';
      });
    });
    [createUserWallet.rejected, updateUserWallet.rejected].forEach((type) => {
      builder.addCase(type, (state, action) => {
        console.log('Reducer:Create User Wallet rejected', action.payload);

        state.walletLoadingStatus = 'failed';
      });
    });
  },
});

export const { registerBtnStatus, clearUser, updateUser, playerChange } =
  userSlice.actions;
export const selectUser = (state: AppState) => state.user;
export const currentAuthUser = (state: AppState) => state.user.cognitoDetails;
export default userSlice.reducer;
