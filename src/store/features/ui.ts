import { AppState } from './../app/store';
import { createSlice } from '@reduxjs/toolkit';

interface UI {
  is_sidebar_open: boolean;
}

const initialState: UI = {
  is_sidebar_open: false,
};

const UI_slice = createSlice({
  name: 'UI_slice',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      
      state.is_sidebar_open = action.payload.state;
    },

   
  },
});

export const {toggleSidebar} = UI_slice.actions

export const selectUI = (state:AppState) => state.ui

export default UI_slice.reducer
