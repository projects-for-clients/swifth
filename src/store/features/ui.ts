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
    closeSidebar: (state, _) => {
      state.is_sidebar_open = false;
    },

    openSidebar: (state, _) => {
      state.is_sidebar_open = true;
    },
  },
});

export const {closeSidebar, openSidebar} = UI_slice.actions

export default UI_slice
