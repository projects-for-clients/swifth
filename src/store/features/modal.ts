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
    updateModal: (state, action) => {
      console.log('how are you doing', state, action);
      state.isOpen = true;
    },
  },
});

export const { updateModal } = modalSlice.actions;

export const modalSelector = (state: AppState) => state.modal;

export default modalSlice.reducer;
