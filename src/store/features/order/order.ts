import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'approved' | 'declined' | null;
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
    status: null,
    submitted: true,
  },
  {
    name: 'Releases',
    status: null,
    submitted: false,
  },
  {
    name: 'CAC',
    status: null,
    submitted: false,
  },
  {
    name: 'Signed POA',
    status: null,
    submitted: false,
  },


] satisfies RCDocs[]

const initialState: IOrder = {
  isBOLApproved: false,
  RCDocs: RCDocsArr
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
