import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../app/store';

type Path = 'signup' | 'login';

type ModalState = {
  isOpen: boolean;
  path: Path;
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
      state.isOpen = true;
    },

    close: (state, action) => {
      const path: Path = action.payload;

      state.isOpen = false;
      state.path = path;
    },
  },
});

export const { open, close } = modalSlice.actions;

export const modalSelector = (state: AppState) => state.modal;

export default modalSlice.reducer;
