import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

interface IOrder {
  isBOLApproved: boolean;
}

const initialState:IOrder = {
  isBOLApproved: false,
} 


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrder: (state, { payload }: { payload: IOrder }) => {
        return { ...state, ...payload };
    },
  },
});


export const { updateOrder } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;