import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'approved' | 'declined';
interface RCDocs {
  name: RCDocsKeys;
  status: RCDocsStatus;
  submitted: boolean;
}
interface IOrder {
  isBOLApproved: boolean;
  RCDocs: RCDocs[];
}


const RCDocsArr = [
  {
    name: 'Bills of Lading',
    status: 'approved',
    submitted: true,
  },
  {
    name: 'Releases',
    status: 'approved',
    submitted: true,
  },
  {
    name: 'CAC',
    status: 'approved',
    submitted: true,
  },
  {
    name: 'Signed POA',
    status: 'approved',
    submitted: true,
  },


] satisfies RCDocs[]

const initialState: IOrder = {
  isBOLApproved: false,
  RCDocs: [
    {
      name: 'BOL',
      status: 'approved',
    },
  ],
};

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
