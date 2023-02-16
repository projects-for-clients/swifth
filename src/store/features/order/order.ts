import { createSlice } from '@reduxjs/toolkit';

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
