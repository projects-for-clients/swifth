import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../app/store';

type ModalState = {
  isOpen: boolean;
  path: 'signup' | 'login';
};

const initialState: ModalState = {
  isOpen: false,
  path: 'signup',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      console.log('how are you doing', state);
      state.isOpen = true;
    },

    close: (state) => {
      state.isOpen = false
    }
  },
});

export const { open, close } = modalSlice.actions;

export const modalSelector = (state: AppState) => state.modal;

export default modalSlice.reducer;
